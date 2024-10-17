public with sharing class QueryKnowledgeController {
    public QueryKnowledgeController() {

    }

    @AuraEnabled
    public static List<ConnectApi.Topic> getNavigationTopics(){
        String commId = [Select Id from Network where Name = 'ChenDongCommunity2'].Id;
        ConnectApi.ManagedTopicCollection mtCollection = ConnectAPI.ManagedTopics.getManagedTopics(commId, ConnectApi.ManagedTopicType.Navigational);
        List<ConnectApi.Topic> topicList = new List<ConnectApi.Topic>();
        for(ConnectApi.ManagedTopic mtopic : mtCollection.managedTopics) {
            topicList.add(mtopic.topic);
        }
        System.debug('topicList: ' + topicList);
        return topicList;
    }

    @AuraEnabled
    public static List<CommonResponse> getKnowledgeArticleVersionByTopicId(String topicId) {
        List<CommonResponse> commonResponse = new List<CommonResponse>();
        Set<Id> knowledgeIds = new Set<Id>();
        List<KnowledgeArticleVersion> knowledgeArticleList = [ SELECT 
                                                                Title, 
                                                                ArticleNumber, 
                                                                UrlName, 
                                                                Id, 
                                                                KnowledgeArticleId,
                                                                CreatedDate
                                                               FROM KnowledgeArticleVersion 
                                                               WHERE Language = 'en_US' 
                                                               AND PublishStatus = 'Online' 
                                                               AND Id in 
                                                               ( 
                                                                 SELECT 
                                                                  EntityId 
                                                                 FROM TopicAssignment 
                                                                 WHERE TopicId =: topicId
                                                                ) 
                                                              ];

        for(KnowledgeArticleVersion know : knowledgeArticleList) {
            knowledgeIds.add(know.KnowledgeArticleId);
        }

        List<KnowledgeArticleViewStat> knowledgeArticleViewStatList = [ 
                                                                        SELECT 
                                                                         Id, 
                                                                         IsDeleted, 
                                                                         ParentId, 
                                                                         Channel, 
                                                                         ViewCount 
                                                                        FROM KnowledgeArticleViewStat 
                                                                        WHERE Channel = 'AllChannels' 
                                                                        AND ParentId =: knowledgeIds ];
        System.debug('knowledgeArticleViewStatList: ' + knowledgeArticleViewStatList);
        for(KnowledgeArticleVersion knowArticle : knowledgeArticleList) {
            for(KnowledgeArticleViewStat knowView : knowledgeArticleViewStatList) {
                if(knowArticle.KnowledgeArticleId == knowView.ParentId) {
                    CommonResponse common = new CommonResponse();
                    Map<String, Object> viewAndKnowledgeArticlesMap = new Map<String, Object>();
                    viewAndKnowledgeArticlesMap.put('records', knowArticle);
                    common.data = viewAndKnowledgeArticlesMap;
                    common.viewCount = knowView.ViewCount;
                    commonResponse.add(common);
                }
            }
        }
        return commonResponse;
    }

}