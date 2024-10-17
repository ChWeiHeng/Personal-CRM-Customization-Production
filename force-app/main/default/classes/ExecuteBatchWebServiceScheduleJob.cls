global with sharing class ExecuteBatchWebServiceScheduleJob implements Schedulable {
    public static String CRON = '* * * L * ?';
    
    global static String scheduleIt(){
        ExecuteBatchWebServiceJob sche = new ExecuteBatchWebServiceJob();
        return System.schedule('Job Start', CRON, sche);
    }

    global void execute(SchedulableContext sc) {
        LeadConvertedByDMLBatch batch = new LeadConvertedByDMLBatch();
        Database.executeBatch(batch,1);
    }

}