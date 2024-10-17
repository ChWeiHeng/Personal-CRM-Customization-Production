public with sharing class KnowledgeNavigationController {
    public KnowledgeNavigationController() {}

    @AuraEnabled
    public static NavigationResponse getNavaigationTopicsOrKnowledges(String recordId) {
        String objectAPIName = '';
        String keyPrefix = recordId.substring(0,3);
        for(Schema.SObjectType obj : Schema.getGlobalDescribe().Values()) {
          String prefix = obj.getDescribe().getKeyPrefix();
          if(keyPrefix.equals(prefix)) {
            objectAPIName = obj.getDescribe().getName();
            break;
          }
        }
        NavigationResponse navigationResponse = new NavigationResponse();
        if(objectAPIName == 'Topic') {
            Topic topic = [ SELECT Id, NetworkId, Name, Description, CreatedDate, CreatedById, TalkingAbout, ManagedTopicType, SystemModstamp FROM Topic WHERE Id =: recordId LIMIT 1 ];
            navigationResponse.responseData = topic;
            navigationResponse.objApiName = objectAPIName;
        } else {
            Knowledge__kav knowledgekav = [ SELECT Id, KnowledgeArticleId, Language, Title, UrlName, Answer__c, Question__c FROM Knowledge__kav WHERE Id =: recordId LIMIT 1 ];
            String topicId = [ SELECT Id, TopicId FROM TopicAssignment WHERE EntityId =: recordId LIMIT 1 ].TopicId;
            Topic topic = [ SELECT Id, NetworkId, Name, Description, CreatedDate, CreatedById, TalkingAbout, ManagedTopicType, SystemModstamp FROM Topic WHERE Id =: topicId LIMIT 1 ];
            navigationResponse.responseData = knowledgekav;
            navigationResponse.objApiName = objectAPIName;
            navigationResponse.knowledgeRelatedTopicData = topic;
        }
        return navigationResponse;
    }
}