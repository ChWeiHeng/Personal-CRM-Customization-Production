@isTest
public with sharing class KnowledgeContentDetailControllerTest {
    public KnowledgeContentDetailControllerTest() {}

    @isTest
    public static void myUnitTest() {
        List<Knowledge__kav> result = getKnowLedgeDetail();
    }
    
    public static List<Knowledge__kav> getKnowLedgeDetail() {
        knowledge__kav newArticle = new knowledge__kav(Title='test', summary='summary', urlname='urlname', Language = 'ja');
        insert newArticle;
        KnowledgeContentDetailController knowledgeTopicCatalogController = new KnowledgeContentDetailController();
        List<Knowledge__kav> knowledgeKavList = KnowledgeContentDetailController.getKnowledgeDetailData(newArticle.Id);
        return knowledgeKavList;
    }
}