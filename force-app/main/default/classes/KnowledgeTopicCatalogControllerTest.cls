@isTest
public with sharing class KnowledgeTopicCatalogControllerTest {
    public KnowledgeTopicCatalogControllerTest() {}
    
    @isTest
    public static void myUnitTest() {
        List<KnowledgeResponse> result = getKnowLedgeTopicCatalog();
    }

    public static List<KnowledgeResponse> getKnowLedgeTopicCatalog() {
        knowledge__kav newArticle = new knowledge__kav(Title='test', summary='summary', urlname='urlname', Language = 'ja', IsVisibleInPkb = true);
        insert newArticle;
        Network netWork = [ SELECT Id, Name, Description, Status FROM Network LIMIT 1 ];
        Topic topic = new Topic(NetworkId = netWork.Id, Name = 'Knowledge');
        insert topic;
        TopicAssignment topicAssignment = new TopicAssignment(TopicId = topic.Id, EntityId = newArticle.Id, NetworkId = netWork.Id);
        insert topicAssignment;
        String topicId = Id.valueOf(topic.Id);
        List<KnowledgeArticleVersion> knowledgeArticleList = [ SELECT Title, ArticleNumber, UrlName, Id, KnowledgeArticleId, PublishStatus FROM KnowledgeArticleVersion ];
        KbManagement.PublishingService.publishArticle(knowledgeArticleList[0].KnowledgeArticleId, true);
        TopicAssignment topicAssignment2 = [ SELECT Id, EntityId FROM TopicAssignment WHERE TopicId =: topicId ];
        List<KnowledgeResponse> knowledgeResponse = KnowledgeTopicCatalogController.getKnowledgeArticleVersionByTopicId(topicId);
        Test.startTest();
        List<KnowledgeArticleVersion> knowledgeArticleSecondList = [ SELECT Title, ArticleNumber, UrlName, Id, KnowledgeArticleId, PublishStatus FROM KnowledgeArticleVersion UPDATE VIEWSTAT ];
        List<knowledge__kav> ArticleList = [ SELECT Id, OwnerId, Language, Title, UrlName, Summary FROM Knowledge__kav UPDATE VIEWSTAT ];
        Test.stopTest();
        List<KnowledgeArticleViewStat> knowledgeArticleViewStatList = [ 
                                                                        SELECT 
                                                                            Id, 
                                                                            IsDeleted, 
                                                                            ParentId, 
                                                                            Channel, 
                                                                            ViewCount 
                                                                        FROM KnowledgeArticleViewStat 
                                                                      ];
        return knowledgeResponse;
    }

}