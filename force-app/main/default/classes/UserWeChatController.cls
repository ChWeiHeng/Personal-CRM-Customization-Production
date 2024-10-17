public class UserWeChatController {

	@AuraEnabled
    public static List<WeChat__c> initialize(Id accId) {
    	System.debug('当前记录Id: ' + accId);
    	List<Account> accList = [ SELECT Id, Name, OwnerId FROM Account WHERE Id =: accId ]; // 获取客户数据
    	// 当accList为null或为空时不处理
    	List<WeChat__c> recordList1 = new List<WeChat__c>(); // 获取聊天记录
    	if(null != accList && accList.size() > 0) {
    		System.debug('客户数据符合条件1');
    		for (Account acc : accList) {
    			System.debug('根据客户数据条件查询聊天记录');
    			recordList1 = [ Select Id, Name, Chat_record__c, WeChat_Picture__c, WeChat_Voice__c, Record_Date__c, WeChat_TextArea__c, WeChat_User_TextArea__c, WeChat_User_Picture__c, WeChat_User_Voice__c, AccountId__c, SendUser__c, SendUser__r.Name From WeChat__c WHERE AccountId__r.Id =: accId AND SendUser__r.Id =: acc.OwnerId Order BY Record_Date__c asc ];
    			System.debug('根据客户数据条件查询聊天记录 Data: ' + recordList1);
    		}
    		if(null == recordList1 || recordList1.size() < 0) {
    			System.debug('聊天记录为null');
    			return null;
    		}
    	}
    	System.debug('聊天记录数据: ' + recordList1);
    	return recordList1;
        
    }

}