/**********************************************************************
 * 
 * LeadConvertedBatch Test Cls
*************************************************************************/

@isTest
private class Test_LeadConvertedBatch {

	static testMethod void myUnitTest() {

		// 添加客户数据
		List<Account> insertAccountList = new List<Account>();

		for (Integer i = 1;i < = 100;i++) {
			Account acc = new Account();
			acc.Name = 'TestAccountName' + i;
			insertAccountList.add(acc);
		}

		insert insertAccountList;

		List<Account> newAccountList = [ SELECT Id, Name FROM Account WHERE Name LIKE '%TestAccountName%' ];

		// 添加潜在客户数据
		List<Lead> insertLeadList = new List<Lead>();

		for(Integer i = 1;i < = 100;i++) {
		    Lead lead = new Lead();
		    lead.LastName = 'TestLastName' + i;
		    lead.FirstName = 'TestFirstName' + i;
		    lead.Company = 'TestCompany' + i;
		    lead.Status = 'Open - Not Contacted';
		    lead.CustomAccount__c = newAccountList[i-1].Id;
		    insertLeadList.add(lead);
		}

		insert insertLeadList;

		// 执行批处理
		LeadConvertedBatch leadConvertedBatch = new LeadConvertedBatch();
		Database.executeBatch(leadConvertedBatch);

	}

}