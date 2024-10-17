global with sharing class scheduledSendNotification implements Schedulable {
    global scheduledSendNotification() {}

    global void execute(SchedulableContext SC) {
        SendNotificationBatch batch = new SendNotificationBatch(); 
        database.executebatch(batch);
     }
}