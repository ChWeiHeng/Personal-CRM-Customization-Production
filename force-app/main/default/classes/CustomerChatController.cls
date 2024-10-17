global class CustomerChatController {

	public CustomerChatController(ApexPages.StandardController controller) {}

	@AuraEnabled
    public static List<WeChat__c> datas11(){
    	List<WeChat__c> recordList = [ Select Id, Name, Chat_record__c, WeChat_Picture__c, WeChat_Voice__c, CreatedDate From WeChat__c Order BY CreatedDate asc ];

    	return recordList;
    }
}