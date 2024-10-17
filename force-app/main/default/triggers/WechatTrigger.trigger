trigger WechatTrigger on WeChat__c (before insert, before update, before delete, after insert, after update, after delete) {
    public static Boolean repeat = true;
    WechatTriggerHandler wechatTriggerHandler = new WechatTriggerHandler();
    // before insert
    if(Trigger.isBefore && Trigger.isInsert) {
        wechatTriggerHandler.beforeInsert(trigger.new);
    }
    // before update 
    if(Trigger.isBefore && Trigger.isUpdate) {
        System.debug('before isUpdate');
        wechatTriggerHandler.beforeUpdate(trigger.new);
    }
    // before delete
    if(Trigger.isBefore && Trigger.isDelete) {

    }
    // after insert
    if(Trigger.isAfter && Trigger.isInsert) {
        wechatTriggerHandler.afterInsert(trigger.new);
    }
    // after update 
    if(Trigger.isAfter && Trigger.isUpdate) {
        wechatTriggerHandler.afterUpdate(trigger.new, trigger.old, trigger.oldMap);
    }
    // after delete
    if(Trigger.isAfter && Trigger.isDelete) {

    }
}