/**
*@Name: ScenicSpotTicketTriggerHandler
*@Author: Chengzhi Niu
*@Date: 2022.05.26
*@Description：景点门票管理触发器执行类
*/
public with sharing class ScenicSpotTicketTriggerHandler {
    public ScenicSpotTicketTriggerHandler() {}
    // 全价
    Id Full_Price_Ticket_RecordTypeId = SObjectType.Scenic_Spot_Ticket_Sales_Management__c.getRecordTypeInfosByDeveloperName().get('full_price_ticket').getRecordTypeId();
    // 折价
    Id Discounted_Ticket_RecordTypeId = SObjectType.Scenic_Spot_Ticket_Sales_Management__c.getRecordTypeInfosByDeveloperName().get('discounted_ticket').getRecordTypeId();

    // 创建前更新营业员销售业绩
    public void scenicSpotTicketAfterInsert(List<Scenic_Spot_Ticket_Sales_Management__c> aftInsertList) {
        disSumSalesAmountAndCount(aftInsertList, false);
    }

    // 更新前更新营业员销售业绩
    public void scenicSpotTicketAfterUpdate(List<Scenic_Spot_Ticket_Sales_Management__c> aftUpdateList) {
        disSumSalesAmountAndCount(aftUpdateList, false);
    } 
    
    // 删除前更新营业员销售业绩
    public void scenicSpotTicketBeferDelete(List<Scenic_Spot_Ticket_Sales_Management__c> befDeleteList) {
        disSumSalesAmountAndCount(befDeleteList, true);
    }

    public void disSumSalesAmountAndCount(List<Scenic_Spot_Ticket_Sales_Management__c> scenicSpotTicketList, Boolean deleteCheck) {
        // 存储父对象Id TradeAssistant__c
        Set<Id> tradeAssistantIds = new Set<Id>();
        // 存储要处理的数据Id 在删除处理时不计入处理范围
        Set<Id> scenicSpotTicketIds = new Set<Id>();
        for (Scenic_Spot_Ticket_Sales_Management__c ticketObj : scenicSpotTicketList) {
            tradeAssistantIds.add(ticketObj.TradeAssistant__c);
            scenicSpotTicketIds.add(ticketObj.Id);
        }
        // 查询当前门票记录关联的销售员信息
        List<TradeAssistant__c> relatedtradeAssistantList = getParentObjectData(tradeAssistantIds);
        // 查询当前记录关联销售员下所有的门票销售记录
        List<Scenic_Spot_Ticket_Sales_Management__c> relatedAllTicketList = getRelatedAllTicketList(tradeAssistantIds);
        List<Scenic_Spot_Ticket_Sales_Management__c> duplicateAllTicketList = new List<Scenic_Spot_Ticket_Sales_Management__c>();
        if (deleteCheck) {
            for (Scenic_Spot_Ticket_Sales_Management__c duplicateObj : relatedAllTicketList) {
                for (Id duplicateId : scenicSpotTicketIds) {
                    if (duplicateObj.Id != duplicateId && duplicateObj.TicketStatus__c != '退票') {
                        duplicateAllTicketList.add(duplicateObj);
                    }
                }
            }   
        }

        if (!relatedtradeAssistantList.isEmpty()) {
            for (TradeAssistant__c disTradeObj : relatedtradeAssistantList) {
                if (!relatedAllTicketList.isEmpty()) {
                    // 销售利润(净利润)
                    Decimal totalSalesAmount = 0;
                    // 销售数量
                    Decimal totalSalesCount = 0;
                    if (deleteCheck && !duplicateAllTicketList.isEmpty()) {
                        for (Scenic_Spot_Ticket_Sales_Management__c disDelTicketObj : duplicateAllTicketList) {
                            // 同一条销售员记录下的门票销售记录
                            if (disTradeObj.Id == disDelTicketObj.TradeAssistant__c && disDelTicketObj.TicketStatus__c == '全票') {
                                totalSalesAmount += disDelTicketObj.ActualAmount__c;
                                totalSalesCount++;
                            }
                        }
                    } else if (!deleteCheck && duplicateAllTicketList.isEmpty()) {
                        for (Scenic_Spot_Ticket_Sales_Management__c disTicketObj : relatedAllTicketList) {
                            // 同一条销售员记录下的门票销售记录
                            if (disTradeObj.Id == disTicketObj.TradeAssistant__c && disTicketObj.TicketStatus__c == '全票') {
                                totalSalesAmount += disTicketObj.ActualAmount__c;
                                totalSalesCount++;
                            }
                        }
                    }
                    System.debug('###### totalSalesAmount: ' + totalSalesAmount);
                    disTradeObj.SalesPerformanceDetail__c = totalSalesAmount;
                    disTradeObj.TotalSalesPerformance__c = totalSalesCount;
                }
            }

            update relatedtradeAssistantList;
        }
    }

    // 获取销售员下关联的所有门票销售数据
    public static List<Scenic_Spot_Ticket_Sales_Management__c> getRelatedAllTicketList(Set<Id> tradeAssistantIds) {
        List<Scenic_Spot_Ticket_Sales_Management__c> relatedAllTicketList = [ SELECT Id, Name, RecordTypeId, CostReduction__c, TypesOfTickets__c, NameOfBuyer__c, ContactInformation__c, TicketCostReduction__c, TheTicketAmount__c, ActualAmount__c, Age__c, IsPurchasingAgency__c, TradeAssistant__c, IdNumber__c, BuyTicketDate__c, TicketStatus__c FROM Scenic_Spot_Ticket_Sales_Management__c WHERE TradeAssistant__c IN: tradeAssistantIds ];
        if (!relatedAllTicketList.isEmpty()) {
            return relatedAllTicketList;
        } else {
            return new List<Scenic_Spot_Ticket_Sales_Management__c>();
        }
    }

    // 获取关联的TradeAssistant数据
    public static List<TradeAssistant__c> getParentObjectData(Set<Id> tradeAssistantIds) {
        List<TradeAssistant__c> tradeAssistantList = [ SELECT Id, Name, TradeAssistantOwnerChannel__c, ContactInformation__c, SalesPerformance__c, SalesPerformanceDetail__c, TotalSalesPerformance__c, PowerRating__c FROM TradeAssistant__c WHERE Id IN: tradeAssistantIds ];
        if (!tradeAssistantList.isEmpty()) {
            return tradeAssistantList;
        } else {
            return new List<TradeAssistant__c>();
        }
    }
}