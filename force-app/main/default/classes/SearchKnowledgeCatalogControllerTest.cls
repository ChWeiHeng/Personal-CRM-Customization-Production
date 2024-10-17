@isTest
public with sharing class SearchKnowledgeCatalogControllerTest {
    @isTest
    public static void myUnitTest() {
        knowledge__kav newArticle = new knowledge__kav(Title='test', summary='summary', urlname='urlname', Language = 'ja', IsVisibleInPkb = true);
        insert newArticle;
        SearchKnowledgeCatalogController knowledgeConstructor = new SearchKnowledgeCatalogController();
        List<Knowledge__kav> knowledgeList = SearchKnowledgeCatalogController.searchKnowledgeDataByParam('test');
        System.debug('knowledgeList: ' + knowledgeList);
    }
}