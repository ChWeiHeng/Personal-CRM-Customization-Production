public with sharing class SearchknowledgeDocumentController {
    public list <WeChat__c> queryWechatList {get;set;}
    public String searchKey {get;set;}

    public SearchknowledgeDocumentController() {
        String initQuery = 'SELECT Name, Chat_record__c FROM WeChat__c';
        queryWechatList = Database.query(initQuery);
    }

    public void SearchKnowledgeData() {
        String searchquery = 'SELECT Name, Chat_record__c FROM WeChat__c WHERE Name LIKE \'%' + searchKey + '%\'';
        queryWechatList = Database.query(searchquery);
    }

    public void ClearData() {
        queryWechatList.clear();
    }

}