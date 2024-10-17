@isTest
public with sharing class KnowledgeNavigationControllerTest {
    public KnowledgeNavigationControllerTest() {}

    @isTest
    public static void myUnitTest() {
        knowledge__kav newArticle = new knowledge__kav(Title='test', summary='summary', urlname='urlname', Language = 'ja', IsVisibleInPkb = true);
        insert newArticle;
        Network netWork = [ SELECT Id, Name, Description, Status FROM Network LIMIT 1 ];
        Topic topic = new Topic(NetworkId = netWork.Id, Name = 'Knowledge');
        insert topic;
        TopicAssignment topicAssignment = new TopicAssignment(TopicId = topic.Id, EntityId = newArticle.Id, NetworkId = netWork.Id);
        insert topicAssignment;
        KnowledgeNavigationController knowledgeNavigation = new KnowledgeNavigationController();
        NavigationResponse navigationKnowledgeResponse = KnowledgeNavigationController.getNavaigationTopicsOrKnowledges(newArticle.Id);
        NavigationResponse navigationTopicResponse = KnowledgeNavigationController.getNavaigationTopicsOrKnowledges(topic.Id);
    }

}