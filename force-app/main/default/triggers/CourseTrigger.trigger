trigger CourseTrigger on Course__c (before insert, before update) {
    if (Trigger.isBefore && Trigger.isUpdate) {
        CourseTriggerHandler.checkStatus(Trigger.new, Trigger.oldMap, Trigger.newMap);
    }
}