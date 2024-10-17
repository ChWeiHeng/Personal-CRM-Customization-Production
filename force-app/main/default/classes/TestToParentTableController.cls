public with sharing class TestToParentTableController {
    public TestToParentTableController() {}

    @AuraEnabled
    public static Boolean testSaveDatetimeValueToOrg(Date recieveChangeDate, String paramId){
        Boolean returnCheckFlag = true;
        try {
            if (String.isNotBlank(paramId) && recieveChangeDate != null) {
                List<Wechat__c> wechats = [ 
                    SELECT 
                        Id, OwnerId, IsDeleted, Name, RecordTypeId, Chat_record__c, WeChat_Picture__c, WeChat_Voice__c, Record_Date__c, 
                        WeChat_TextArea__c, AccountId__c, SendUser__c, WeChat_User_TextArea__c, WeChat_User_Picture__c, WeChat_User_Voice__c, 
                        Status__c, CheckOne__c, CheckTwo__c, CheckThree__c, CheckFour__c, CheckFive__c, CheckSix__c, CheckStatus__c, Chat_Price__c, 
                        Test_Number__c, TestDateMonth__c, Test_Object_Summary_Total__c, BusinessTeam__c, TestDateMonthOne__c, TestEveryMonth__c, 
                        More_Select__c, Test_Quick_Text__c, Testformula__c, ProjectSegement__c, PicklistTest1__c, Field1produc__c, sdasd__c, Wechat_Datetime__c 
                    FROM WeChat__c 
                    WHERE Id =: paramId LIMIT 1
                ];
                if (wechats != null && wechats.size() > 0) {
                    for (Wechat__c item : wechats) {
                        item.Wechat_Datetime__c = recieveChangeDate;
                    }
                }

                update wechats;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return returnCheckFlag;
    }

    @AuraEnabled
    public static List<RecordsData> fetchRecords(String objectName, String filterField, String searchString, String value) {
        try {
            List<RecordsData> recordsDataList = new List<RecordsData>();
            String query = 'SELECT Id, ' + filterField + ' FROM '+objectName;
            if(String.isNotBlank(value)) {
                query += ' WHERE Id = \''+ value + '\' LIMIT 49999';
            } else {
                query += ' WHERE '+filterField+
                		' LIKE ' + '\'%' + String.escapeSingleQuotes(searchString.trim()) + '%\' LIMIT 49999';
            }
	        for(SObject s : Database.query(query)) {
	            recordsDataList.add( new RecordsData((String)s.get(filterField), (String)s.get('id')) );
	        }
            return recordsDataList;
	    } catch (Exception err) {
	    	if ( String.isNotBlank( err.getMessage() ) && err.getMessage().contains( 'error:' ) ) {
                throw new AuraHandledException(err.getMessage().split('error:')[1].split(':')[0] + '.');
            } else {
                throw new AuraHandledException(err.getMessage());
            }
	    }
    }

    @AuraEnabled
    public static Boolean testToSaveChangeData(String paramStr){
        Boolean status = true;
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return status;
    }
    
    // fetch return wrapper
    public class RecordsData {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        public RecordsData(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    @AuraEnabled(Cacheable = true)
    public static list<Account> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Account> accLst = [SELECT  Id, Name, Industry, Phone, Type From Account WHERE Name LIKE :textkey];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
}