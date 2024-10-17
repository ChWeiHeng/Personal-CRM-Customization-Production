trigger AccountTrigger on Account (before insert, before update, after insert, after update) {

    Set<Id> updatedAccounts = new Set<Id>(); // Keep track of updated accounts

    if (Trigger.isBefore && Trigger.isUpdate) {
        AccounTriggerHandler accountHandler = new AccounTriggerHandler();
        accountHandler.beforeUpdateAccount(Trigger.new);
    }
}