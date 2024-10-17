public with sharing class WechatTriggerHandler {
    public static Boolean repeat = true;
    public WechatTriggerHandler() {

    }

    public void beforeInsert(List<Wechat__c> beforeInsWechatList) {
        for(Wechat__c wechat : beforeInsWechatList) {
            System.debug('Before Insert wechat.OwnerId: ' + wechat.OwnerId);
            System.debug('Before Insert wechat.CreatedDate: ' + wechat.CreatedDate);
            System.debug('Before Insert wechat.CreatedById: ' + wechat.CreatedById);
            System.debug('Before Insert wechat.LastModifiedDate: ' + wechat.LastModifiedDate);
            System.debug('Before Insert wechat.LastModifiedById: ' + wechat.LastModifiedById);
        }
    }

    public void afterInsert(List<Wechat__c> afterInsWechatList) {
        for(Wechat__c wechat : afterInsWechatList) {
            System.debug('After Insert wechat.OwnerId: ' + wechat.OwnerId);
            System.debug('After Insert wechat.CreatedDate: ' + wechat.CreatedDate);
            System.debug('After Insert wechat.CreatedById: ' + wechat.CreatedById);
            System.debug('After Insert wechat.LastModifiedDate: ' + wechat.LastModifiedDate);
            System.debug('After Insert wechat.LastModifiedById: ' + wechat.LastModifiedById);
        }
    }

    public void beforeUpdate(List<Wechat__c> beforeUpNewWechatList) {
        if(repeat) {
            repeat = false;
        } else {
            return;
        }
        for(Wechat__c wechat : beforeUpNewWechatList) {
            wechat.Test_Number__c = 5;
            System.debug('wechat.Test_Number__c: ' + wechat.Test_Number__c);
        }
    }

    public void afterUpdate(List<Wechat__c> afterUpWechatNewList, List<Wechat__c> afterUpWechatOldList, Map<Id,Wechat__c> afterUpWechatMap) {
        // for(Wechat__c wechat : afterUpWechatOldList) {
        //     wechat.Test_Number__c = 5;
        //     System.debug('wechat.Test_Number__c: ' + wechat.Test_Number__c);
        // }
        for(Id wechatId : afterUpWechatMap.keyset()) {
            Wechat__c wechatObject = afterUpWechatMap.get(wechatId);
            System.debug('wechatId: ' + wechatId);
            System.debug('afterUpWechatMap.get(wechatId): ' + afterUpWechatMap.get(wechatId));
        }
        System.debug('afterUpWechatOldList: ' + afterUpWechatOldList);
    }

}