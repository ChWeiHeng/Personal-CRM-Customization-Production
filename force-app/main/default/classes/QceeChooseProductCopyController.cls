public with sharing class QceeChooseProductCopyController {

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
    public static List<Product2> queryDataByProductParamCopy(String searchParam) {
        String param = '%' + searchParam + '%';
        System.debug('param: ' + param);
        List<Product2> returnProductList = [
            SELECT 
             Id, 
             Name, 
             ProductFamily__c, 
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
    public static List<Product2> queryDataByAccessoryParamCopy(String searchParam) {
        String param = '%' + searchParam + '%';
        System.debug('param: ' + param);
        List<Product2> returnProductList = [
            SELECT 
             Id, 
             Name, 
             ProductFamily__c, 
             ProductLine__c, 
             ProductModel__c, 
             ProductParameter__c,
             ProductPrice__c 
            FROM Product2 WHERE Name LIKE: param ORDER BY Name ASC
        ];
        System.debug('returnProductList: ' + returnProductList);
        return returnProductList;
    }

    // 适用于单个产品、附件的精确查询
    @AuraEnabled
    public static List<Product2> queryDataByProductIdCopy(String productId) {
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

    // 适用于单个产品标准价格的精确查询
    @AuraEnabled
    public static PricebookEntry queryPriceByPriceEntryCopy(String productId) {
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