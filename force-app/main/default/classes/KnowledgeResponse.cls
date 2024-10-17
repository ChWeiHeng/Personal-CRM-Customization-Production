public with sharing class KnowledgeResponse {
    @AuraEnabled public Object knowledgeData {get; set;}
    @AuraEnabled public Integer viewCount {get; set;}
    public KnowledgeResponse() {}
}