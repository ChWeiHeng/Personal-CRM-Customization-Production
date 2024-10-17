global class Sap2SalesforceWebservice {
    global class InnerObject {
        webService String innerParam1 { get; set; }
        webService String innerParam2 { get; set; }
    }
    
    global class RequestObject1 {
        webService String param1 { get; set; }
        webService String param2 { get; set; }
        webService InnerObject innerObject { get; set; }
    }
    
    webService static String processParameters(RequestObject1 request) {
        try {
            // 在此处处理来自SAP的参数
            // 可以执行相应的逻辑，如创建记录、更新数据等
            
            // 示例中将参数拼接并返回
            return 'Received parameters: ' + request.param1 + ', ' + request.param2 +
                   ', ' + request.innerObject.innerParam1 + ', ' + request.innerObject.innerParam2;
        } catch (Exception e) {
            return 'Error processing parameters: ' + e.getMessage();
        }
    }
    
    public class Record {
        public String CarDate { get; set; }
        public String CarInfo { get; set; }
        public String Member1 { get; set; }
        public String Member2 { get; set; }
        public String Member3 { get; set; }
        public String Member4 { get; set; }
        public String Member5 { get; set; }
    }
    
    webService static String processData(String jsonData) {
        try {
            // 解析JSON数据并处理
            Map<String, Object> dataMap = (Map<String, Object>) JSON.deserializeUntyped(jsonData);
            List<Object> recordList = (List<Object>) dataMap.get('Record');
            List<String> returnResults = new List<String>();
            List<Record> records = new List<Record>();
    
            for (Object recordObj : recordList) {
                Map<String, Object> recordMap = (Map<String, Object>) recordObj;
                Record record = new Record();
    
                record.CarDate = (String) recordMap.get('CarDate');
                record.CarInfo = (String) recordMap.get('CarInfo');
                record.Member1 = (String) recordMap.get('Member1');
                record.Member2 = (String) recordMap.get('Member2');
                record.Member3 = (String) recordMap.get('Member3');
                record.Member4 = (String) recordMap.get('Member4');
                record.Member5 = (String) recordMap.get('Member5');
    
                records.add(record);
            }
            System.debug('$$$$$$ records: ' + records);
            // 处理逻辑：将SAP数据插入到Salesforce对象中
            if (!records.isEmpty()) {
                for (Record record : records) {
                    // 处理每条记录的数据
                    String carDate = record.CarDate;
                    String carInfo = record.CarInfo;
                    String member1 = record.Member1;
                    String member2 = record.Member2;
                    String member3 = record.Member3;
                    String member4 = record.Member4;
                    String member5 = record.Member5;
    
                    // 执行相关的逻辑操作，如插入到Salesforce对象
                    System.debug('Car Date: ' + carDate);
                    System.debug('Car Info: ' + carInfo);
                    System.debug('Member 1: ' + member1);
                    System.debug('Member 2: ' + member2);
                    System.debug('Member 3: ' + member3);
                    System.debug('Member 4: ' + member4);
                    System.debug('Member 5: ' + member5);
                    String returnStr = carDate + ' *** ' + carInfo + ' *** ' + member1 + ' *** ' + member2 + ' *** ' + member3 + ' *** ' + member4 + ' *** ' + member5;
                    returnResults.add(returnStr);
                }
            }
            String returnMsg = String.join(returnResults, '\n');
            return returnMsg;
        } catch (Exception e) {
            return 'Error processing data: ' + e.getMessage();
        }
    }
    
    
}