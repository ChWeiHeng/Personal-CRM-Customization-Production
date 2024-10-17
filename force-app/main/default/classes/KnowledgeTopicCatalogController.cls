public with sharing class KnowledgeTopicCatalogController {
    public KnowledgeTopicCatalogController() {}

    @AuraEnabled
    public static List<KnowledgeResponse> getKnowledgeArticleVersionByTopicId(String topicId) {
      KnowledgeTopicCatalogController knowledgeTopicCatalog = new KnowledgeTopicCatalogController();
      List<KnowledgeResponse> knowledgeResponse = new List<KnowledgeResponse>();
      Set<Id> knowledgeIds = new Set<Id>();
      Set<Id> topicEntityId = new Set<Id>();

      // 查询总主题 及 子主题
      String communityId = '0DB2w0000004FIAGA2';
      String communityId3 = Network.getNetworkId();
      System.debug('communityId3: ' + communityId3);
      Integer depth =2;
      ConnectApi.ManagedTopicCollection topics = ConnectApi.ManagedTopics.getManagedTopics(communityId3,ConnectApi.ManagedTopicType.Navigational,depth);
      Map<Id,Set<Id>> topicAndSubTopicMap = new Map<Id,Set<Id>>();
      for (ConnectApi.ManagedTopic managedTopic : topics.managedTopics) {
          System.debug('###managedTopic.topic.name = ' + ((ConnectApi.Topic)managedTopic.topic).name);

          Set<Id> topicIds = new Set<Id>();
          for (ConnectApi.ManagedTopic childManagedTopic : managedTopic.children) {
              //System.debug('###childManagedTopic: ' + childManagedTopic);
              //System.debug('###(ConnectApi.Topic)childManagedTopic.topic).Id = ' + ((ConnectApi.Topic)childManagedTopic.topic).Id);
              //System.debug('###(ConnectApi.Topic)childManagedTopic.topic).Name = ' + ((ConnectApi.Topic)childManagedTopic.topic).Name);
              topicIds.add(((ConnectApi.Topic)childManagedTopic.topic).Id);
          }
          // System.debug('### childTopicIds:\n' + topicIds);
          topicAndSubTopicMap.put(((ConnectApi.Topic)managedTopic.topic).Id, topicIds);
      }
      System.debug('###topicAndSubTopicMap: ' + topicAndSubTopicMap);

      List<Topic> topicList = [ SELECT Id, NetworkId, Name, Description, TalkingAbout, ManagedTopicType FROM Topic WHERE Id =: topicAndSubTopicMap.get(topicId) ];

      System.debug('topicList: ' + topicList);
      if(!topicList.isEmpty()) {
        for(Topic topic : topicList) {
          KnowledgeResponse knowledge = new KnowledgeResponse();
          knowledge.knowledgeData = topic;
          knowledgeResponse.add(knowledge);
        }
      }

      System.debug('knowledgeResponse: ' + knowledgeResponse);

      // List<TopicAssignment> topicAssignmentList = [ SELECT Id, NetworkId, TopicId, EntityId, EntityKeyPrefix, EntityType, CreatedDate, CreatedById, IsDeleted, SystemModstamp FROM TopicAssignment WHERE TopicId =: topicId LIMIT 1000 ];
      // System.debug('topicAssignmentList: ' + topicAssignmentList);
      // for (TopicAssignment topic : topicAssignmentList) {
      //   topicEntityId.add(topic.EntityId);
      // }
      // List<KnowledgeArticleVersion> knowledgeArticleList = [ SELECT 
      //                                                         Title, 
      //                                                         ArticleNumber, 
      //                                                         UrlName, 
      //                                                         Id, 
      //                                                         KnowledgeArticleId,
      //                                                         CreatedDate,
      //                                                         LastPublishedDate
      //                                                         FROM KnowledgeArticleVersion 
      //                                                         WHERE Language = 'en_US' 
      //                                                         AND PublishStatus = 'Online'
      //                                                         AND IsVisibleInPkb = TRUE
      //                                                         // AND IsLatestVersion = TRUE
      //                                                         // AND ValidationStatus = '検証済み'
      //                                                         AND Id =: topicEntityId
      //                                                         ORDER BY LastPublishedDate DESC
      //                                                       ];
      // System.debug('knowledgeArticleList: ' + knowledgeArticleList);
      // for(KnowledgeArticleVersion know : knowledgeArticleList) {
      //   knowledgeIds.add(know.KnowledgeArticleId);
      // }
      // List<KnowledgeArticleViewStat> knowledgeArticleViewStatList = [ 
      //                                                                 SELECT 
      //                                                                   Id, 
      //                                                                   IsDeleted, 
      //                                                                   ParentId, 
      //                                                                   Channel, 
      //                                                                   ViewCount 
      //                                                                 FROM KnowledgeArticleViewStat 
      //                                                                 WHERE Channel = 'AllChannels' 
      //                                                                 AND ParentId =: knowledgeIds ];
      // System.debug('knowledgeArticleViewStatList: ' + knowledgeArticleViewStatList);
      // if(Test.isRunningTest()) {
      //   for(KnowledgeArticleVersion testKnowArticleDataFirst : knowledgeArticleList) {
      //     KnowledgeResponse knowledge = new KnowledgeResponse();
      //     knowledge.knowledgeData = testKnowArticleDataFirst;
      //     knowledge.viewCount = 10;
      //     knowledgeResponse.add(knowledge);
      //   }
      //   for(KnowledgeArticleVersion testKnowArticleDataSecond : knowledgeArticleList) {
      //     KnowledgeResponse knowledge = new KnowledgeResponse();
      //     knowledge.knowledgeData = testKnowArticleDataSecond;
      //     knowledge.viewCount = 20;
      //     knowledgeResponse.add(knowledge);
      //   }
      //   for(KnowledgeArticleVersion testKnowArticleDataThird : knowledgeArticleList) {
      //     KnowledgeResponse knowledge = new KnowledgeResponse();
      //     knowledge.knowledgeData = testKnowArticleDataThird;
      //     knowledge.viewCount = 30;
      //     knowledgeResponse.add(knowledge);
      //   }
      // } else {
      //   for(KnowledgeArticleVersion knowArticle : knowledgeArticleList) {
      //     for(KnowledgeArticleViewStat knowView : knowledgeArticleViewStatList) {
      //       if(knowArticle.KnowledgeArticleId == knowView.ParentId) {
      //         KnowledgeResponse knowledge = new KnowledgeResponse();
      //         knowledge.knowledgeData = knowArticle;
      //         knowledge.viewCount = knowView.ViewCount;
      //         knowledgeResponse.add(knowledge);
      //       }
      //     }
      //   }
      // }
      return knowledgeResponse;
    }
}