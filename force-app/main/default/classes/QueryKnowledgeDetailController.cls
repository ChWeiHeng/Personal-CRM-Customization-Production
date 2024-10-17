public with sharing class QueryKnowledgeDetailController {
    public QueryKnowledgeDetailController() {

    }

    @AuraEnabled
    public static List<Knowledge__kav> getKnowledgeDetailData(String knowledgeId) {
        List<Knowledge__kav> knowledgekavList = [ SELECT Id, KnowledgeArticleId, Language, Title, UrlName, Answer__c, Question__c FROM Knowledge__kav WHERE Id =: knowledgeId LIMIT 1 ];
        System.debug('knowledgekavList: ' + knowledgekavList);
        return knowledgekavList;
    }
}