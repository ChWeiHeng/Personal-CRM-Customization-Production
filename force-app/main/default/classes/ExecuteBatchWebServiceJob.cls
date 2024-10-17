global with sharing class ExecuteBatchWebServiceJob implements Schedulable {
    public static String CRON = '* * * L * ?';
    
    global static String scheduleIt(){
        ExecuteBatchWebServiceJob sche = new ExecuteBatchWebServiceJob();
        return System.schedule('End Customer Status', CRON, sche);
    }

    global void execute(SchedulableContext sc) {
        LeadConvertedByDMLBatch batch = new LeadConvertedByDMLBatch();
        Database.executeBatch(batch,1);
    }

}