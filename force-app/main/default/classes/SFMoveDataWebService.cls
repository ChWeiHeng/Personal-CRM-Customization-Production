@RestResource(urlMapping='/SfMoveData')
global with sharing class SFMoveDataWebService {
    public SFMoveDataWebService() {}

    @HttpGet
    global static String doGet() {
        return 'dispatch success';
    }

    @HttpPost
    global static void doPost(String objectAPIName, String recieveJSONData) {
        System.debug('post dispatch success!');
        System.debug('$$$ recieve objectAPIName: ' + objectAPIName);
        System.debug('$$$ recieveJSONData: ' + recieveJSONData);

        // Step1: 解析接收数据
        List<Object> lst_JsonParse = (List<Object>)Json.deserializeUntyped(recieveJSONData);
        System.debug('$$$ lst_JsonParse: ' + lst_JsonParse);

        // Step2: 获取任意一组数据 转换为Map 获取传递的数据所有字段名
        Map<String,Object> fieldMap = (Map<String,Object>)lst_JsonParse[0];
        String objectId = (String)fieldMap.get('Id');
        System.debug('$$$ objectId: ' + objectId);
        Set<String> fieldSet = new Set<String>();
        for (String key : fieldMap.keySet()) {
            Object value = fieldMap.get(key);
            if (!key.equals('attributes') && !key.equals('Id')) {
                fieldSet.add(key);
            }
        }
        System.debug('$$$ fieldSet: ' + fieldSet);

        // Step3: 根据获取得对象名称获取指定对象下得字段
        Set<String> finalFieldSet = new Set<String>();
        // 存放字段名称及类型的Map键值对 方便赋值时的数据处理
        Map<String,Schema.DisplayType> fieldTypeMap = new Map<String,Schema.DisplayType>();
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(objectAPIName);
        Map<String,Schema.SObjectField> specifiedFieldMap = targetType.getDescribe().fields.getMap();
        for (Schema.SObjectField field : specifiedFieldMap.values()) {
            // 匹配接收到得对象数据字段
            for (String keyField : fieldSet) {
                if (field.getDescribe().getName() == keyField) {
                    finalFieldSet.add(keyField);
                    Schema.DisplayType fieldDataType = field.getDescribe().getType();
                    fieldTypeMap.put(keyField, fieldDataType);
                    System.debug('$$$ keyField: ' + keyField);
                }
            }
        }
        System.debug('$$$ fieldTypeMap: ' + fieldTypeMap);

        // Step4: 根据指定对象名获取对象类型
        SObjectType soType = ((SObject) Type.forName(objectAPIName).newInstance()).getSObjectType();
        System.debug('$$$ soType: ' + soType);

        // Step5: 处理数据
        dynamicInsert(lst_JsonParse, finalFieldSet, soType, objectAPIName, fieldTypeMap);
    }

    public static void dynamicInsert(List<Object> receiveRecord, Set<String> finalFieldSet, SObjectType sObjectType, String objectAPIName, Map<String,Schema.DisplayType> finalFieldTypeMap) {
        // 根据获取得对象类型拼接参数
        String listType = 'List<' + sObjectType + '>';
        // 定义指定对象类型得最终添加列表
        List<SObject> insertSObjectList = (List<SObject>)Type.forName(listType).newInstance();
        for (Object obj : receiveRecord) {
            // 根据指定对象名实例化Sobject对象
            SObject insertSObject = Schema.getGlobalDescribe().get(objectAPIName).newSObject();
            // 将当前对象数据转换为Map 获取对象值
            Map<String,Object> objMap = (Map<String,Object>)obj;
            for (String key : finalFieldSet) {
                System.debug('$$$ objMap.get(key): ' + objMap.get(key));
                // 当字段类型为日期时
                if(finalFieldTypeMap.get(key) == Schema.DisplayType.DATE) {
                    if(objMap.get(key) != null) {
                        String nowDate = String.valueOf(objMap.get(key));
                        System.debug('$$$ 参数1: ' + key);
                        System.debug('$$$ 参数2: ' + nowDate);
                        insertSObject.put(key, Date.valueOf(nowDate));
                    } else {
                        insertSObject.put(key, null);
                    }
                } else if(finalFieldTypeMap.get(key) == Schema.DisplayType.DATETIME) {
                    if(objMap.get(key) != null) {
                        String nowDateTime = String.valueOf(objMap.get(key));
                        insertSObject.put(key, Datetime.valueOf(nowDateTime));
                    } else {
                        insertSObject.put(key, null);
                    }
                } else {
                    // 根据筛选出的字段名 设置指定值
                    insertSObject.put(key, objMap.get(key));
                }
            }
            insertSObjectList.add(insertSObject);
        }
        System.debug('$$$ insertSObjectList: ' + insertSObjectList);
    }
}