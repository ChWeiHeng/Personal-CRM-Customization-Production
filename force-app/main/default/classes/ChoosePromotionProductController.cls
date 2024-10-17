public with sharing class ChoosePromotionProductController {
    public ChoosePromotionProductController() {

    }

    @AuraEnabled
    public static List<Product2> getProductListByCategory(String categoryName){
        return [ SELECT Id, Name, ProductPrice__c, ProductImage__c, Description, Family FROM Product2 WHERE Family =: categoryName ORDER BY Name ];
    }
}