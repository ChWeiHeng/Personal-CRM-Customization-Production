global class SendNotificationBatch implements Database.Batchable<sObject>, Schedulable, Database.Stateful {

    // Variable Section
    global FINAL String strQuery;
    global List<String> errorMessages = new List<String>();
    global FINAL String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
    
    global SendNotificationBatch() { 
        this.strQuery = getBatchQuery();
    }
    
    // Returns the Query String to Batch constructor to fetch right records.
    private String getBatchQuery() {
        String strQuery = 'SELECT Id, Name, CloseDate, Remaining_Days_Of_Project_Completion__c, Owner.Email, Owner.Id, Owner.Name FROM Opportunity WHERE Remaining_Days_Of_Project_Completion__c <=' + 10 + 'AND Remaining_Days_Of_Project_Completion__c >=' + 0; 
        return strQuery;
    }
    
    // Batch Start method
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator(strQuery);
    }

    // Batch Execute method calls findCostForWoD method
    global void execute(Database.BatchableContext BC, List<sObject> scopeList) {
        System.debug(LoggingLevel.INFO, '== scopeList size ==' + scopeList.size());
        System.debug(LoggingLevel.INFO, '== scopeList ==' + scopeList);
        
        List<Opportunity> oppList = (List<Opportunity>) scopeList;
        if(!oppList.isEmpty()) { 
            List<Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
            EmailTemplate et = [ SELECT Id, Subject, Body FROM EmailTemplate WHERE DeveloperName =: 'OppEmailTemplate001' ];
            String bodyStr = et.Body;
            System.debug('###### bodyStr1: ' + bodyStr);
            for (Opportunity prod : oppList) {      
                bodyStr = bodyStr.replace('{!Opportunity.OwnerFullName}', prod.Owner.Name);
                bodyStr = bodyStr.replace('{!Opportunity.Name}', prod.Name);
                bodyStr = bodyStr.replace('{!Opportunity.Link}', baseUrl + '/' + prod.Id);   
                System.debug('###### bodyStr2: ' + bodyStr);
                Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage(); 
                String[] toAddresses = new String[] {prod.Owner.Email};
                message.setTemplateId(et.Id);
                message.setTargetObjectId(prod.Owner.Id);
                message.setWhatId(prod.Id);
                message.setToAddresses(toAddresses); 
                message.setSaveAsActivity(false);
                message.setSubject(et.Subject);
                message.setPlainTextBody(bodyStr);
                mailList.add(message);
                
            }
            if(!mailList.isEmpty()) {
                try{
                    Messaging.sendEmail(mailList);
                }
                catch (Exception ex) {
                    errorMessages.add('Unable to send email to Tech: '+ ex.getStackTraceString());
                    System.debug(ex.getMessage());
                }
            }
        }
    }  

    // Batch Finish method for after execution of batch work
    global void finish(Database.BatchableContext BC) { 
        AsyncApexJob aaj = [Select Id, Status, NumberOfErrors, JobItemsProcessed, MethodName, TotalJobItems, CreatedBy.Email from AsyncApexJob where Id =:BC.getJobId()];
        
        // Send an email to the Apex job's submitter notifying of job completion.
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {aaj.CreatedBy.Email};
        mail.setToAddresses(toAddresses);
        mail.setSubject('JOB Salesforce Send Notification Batch: ' + aaj.Status);
        String bodyText='Total Job Items ' + aaj.TotalJobItems + ' Number of records processed ' + aaj.JobItemsProcessed + ' with '+ aaj.NumberOfErrors + ' failures.\n';
        bodyText += 'Number of Error Messages ' + errorMessages.size() + '\n';
        bodyText += 'Error Message' + String.join(errorMessages, '\n');
        mail.setPlainTextBody(bodyText);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
    
    // Method which schedules the ProductDownloadBatch
    global void execute(SchedulableContext sc) {        
        SendNotificationBatch snInstance = new SendNotificationBatch();
        ID batchprocessid = Database.executeBatch(snInstance);
    }
}