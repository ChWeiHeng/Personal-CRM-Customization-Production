public with sharing class SearchKnowledgeCatalogController {
  public SearchKnowledgeCatalogController() {}

  @AuraEnabled
  public static List<Knowledge__kav> searchKnowledgeDataByParam(String searchParam) {        
    List<Knowledge__kav> knowledgekavList = new List<Knowledge__kav>();
    for(Knowledge__kav knoledge : [ SELECT Id, KnowledgeArticleId, Language, Title, UrlName, ArticleNumber, ValidationStatus, LastModifiedDate, Answer__c, Question__c FROM Knowledge__kav ORDER BY LastModifiedDate DESC ]) {
      knoledge.Answer__c = knoledge.Answer__c.replaceAll('</?[^>]+>', '');
      if(knoledge.Title.containsIgnoreCase(searchParam) || knoledge.Answer__c.containsIgnoreCase(searchParam)) {
        knowledgekavList.add(knoledge);
      }
    }
    System.debug('knowledgekavList: ' + knowledgekavList);
    return knowledgekavList;
  }
}