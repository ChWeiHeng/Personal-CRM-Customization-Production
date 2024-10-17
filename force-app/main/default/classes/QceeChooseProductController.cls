/**
*@Author: Chendong
*@Date: 2021.06.25
*@queryDataByProductParam: query product data by param
*@queryDataByAccessoryParam: query accessory data by param
*@queryDataByProductId: query specified product data by product id
*@queryPriceByPriceEntry: query product price data by product id
*/
public with sharing class QceeChooseProductController {
    @AuraEnabled
    public static string doInit(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return null;
    }

    // 适用于产品的模糊查询
    @AuraEnabled
    public static List<Product2> queryDataByProductParam(String searchParam, String priceBookParam, String productTypeParam, String productModelParam) {
        String param = '%' + searchParam + '%';
        System.debug('param: ' + param);
        List<Product2> returnProductList = [
            SELECT 
             Id, 
             Name, 
             ProductFamily__c, 
             ProductCode,
             ProductLine__c, 
             ProductModel__c, 
             ProductParameter__c,
             ProductPrice__c
            FROM Product2 WHERE Name LIKE: param ORDER BY Name ASC
        ];
        System.debug('returnProductList: ' + returnProductList);
        return returnProductList;
    }

    // 适用于附件的模糊查询
    @AuraEnabled
    public static List<Accessory__c> queryDataByAccessoryParam(String searchParam, String priceBookParam, String accessoryTypeValueParam, String accessoryModelValueParam) {
        String param = '%' + searchParam + '%';
        System.debug('param: ' + param);
        List<Accessory__c> returnAccessoryList = [
            SELECT 
             Id, 
             OwnerId, 
             IsDeleted, 
             Name,
             AccessoryName__c,
             AccessoryFamaily__c, 
             AccessorySeries__c, 
             AccessoryType__c, 
             AccessoryParameter__c 
            FROM Accessory__c WHERE AccessoryName__c LIKE: param ORDER BY AccessoryName__c ASC
        ];
        System.debug('returnAccessoryList: ' + returnAccessoryList);
        return returnAccessoryList;
    }

    // 适用于单个产品的精确查询
    @AuraEnabled
    public static List<Product2> queryDataByProductId(String productId) {
        System.debug('productId: ' + productId);
        List<Product2> productItemList = [
            SELECT 
             Id, 
             Name, 
             ProductFamily__c, 
             ProductLine__c, 
             ProductModel__c, 
             ProductParameter__c,
             ProductPrice__c
            FROM Product2 WHERE Id =: productId 
        ];
        System.debug('productItemList: ' + productItemList);
        return productItemList;
    }

    // 适用于单个产品、附件标准价格的精确查询
    @AuraEnabled
    public static PricebookEntry queryPriceByPriceEntry(String productId) {
        System.debug('productId: ' + productId);
        PricebookEntry priceEntry = [
            SELECT 
             Id, 
             ProductCode, 
             Product2Id, 
             Pricebook2Id, 
             UnitPrice
            FROM PricebookEntry WHERE Product2Id =: productId 
        ];
        System.debug('priceEntry: ' + priceEntry);
        return priceEntry;
    }

}