/**
*@Name: ScenicSpotTicketTrigger
*@Author: Chengzhi Niu
*@Date: 2022.05.26
*@Description：景点门票管理触发器
*/
trigger ScenicSpotTicketTrigger on Scenic_Spot_Ticket_Sales_Management__c (before insert, before update, before delete, after insert, after update, after delete) {
    // 调用执行类
    ScenicSpotTicketTriggerHandler scenicSpotTicketHandle = new ScenicSpotTicketTriggerHandler();

    if (Trigger.isAfter && Trigger.isInsert) { // after insert
        scenicSpotTicketHandle.scenicSpotTicketAfterInsert(Trigger.new);
    } else if (Trigger.isAfter && Trigger.isUpdate) { // after update
        scenicSpotTicketHandle.scenicSpotTicketAfterUpdate(Trigger.new);
    } else if (Trigger.isBefore && Trigger.isDelete) { // before delete
        scenicSpotTicketHandle.scenicSpotTicketBeferDelete(Trigger.old);
    }
}