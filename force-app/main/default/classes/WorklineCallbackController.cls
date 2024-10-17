public with sharing class WorklineCallbackController {
    public String code { get; set; }
    public String state { get; set; }

    public WorklineCallbackController() {
        // 获取查询参数
        code = ApexPages.currentPage().getParameters().get('code');
        state = ApexPages.currentPage().getParameters().get('state');
        
        // 在这里可以处理回调数据，例如存储或验证
        System.debug('$$$$$$ code: ' + code);
        System.debug('$$$$$$ state: ' + state);
    }

    @RemoteAction
    public static void saveCallbackData(String code, String state) {
        // 存储回调数据到自定义对象
        LineWorks_Connect_Info__c existingRecord;
        List<LineWorks_Connect_Info__c> records = [SELECT Id, LineWork_Code__c, LineWork_State__c FROM LineWorks_Connect_Info__c LIMIT 1];

        if (records.isEmpty()) {
            existingRecord = new LineWorks_Connect_Info__c();
        } else {
            existingRecord = records[0];
        }
        
        existingRecord.LineWork_Code__c = code;
        existingRecord.LineWork_State__c = state;

        try {
            upsert existingRecord;
        } catch (Exception e) {
            System.debug('Error storing callback data: ' + e.getMessage());
        }
    }

    public void init() {
        // 触发页面加载时的处理
        saveCallbackData(code, state);
    }
    
}