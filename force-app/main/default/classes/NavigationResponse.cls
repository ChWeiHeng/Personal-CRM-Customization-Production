public with sharing class NavigationResponse {
    public NavigationResponse() {}
    @AuraEnabled public Object responseData {get; set;}
    @AuraEnabled public String objApiName {get; set;}
    @AuraEnabled public Object knowledgeRelatedTopicData {get; set;}
}