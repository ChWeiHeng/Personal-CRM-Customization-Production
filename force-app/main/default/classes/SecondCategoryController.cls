public with sharing class SecondCategoryController {

    public SecondCategoryController() {

    }

    @AuraEnabled
    public static List<Product__c> getProductListByCategoryName(String categoryName) {
        return [ SELECT 
                    Id, 
                    Name, 
                    ProductPrice__c, 
                    ProductImage__c, 
                    ProductIntroduce__c, 
                    ProductType__c 
                    FROM Product__c
                    WHERE ProductType__c =: categoryName
                    ORDER BY Name
                ];
    }

}