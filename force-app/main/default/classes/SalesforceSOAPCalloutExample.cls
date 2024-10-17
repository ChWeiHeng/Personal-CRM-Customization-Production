public with sharing class SalesforceSOAPCalloutExample  {
    public SalesforceSOAPCalloutExample() {}

    public void makeSOAPCallout() {
        // 构建SOAP请求
        String endpoint = 'https://example.com/soap-endpoint';
        String requestXML = generateSOAPRequest();

        // 发送SOAP请求
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'text/xml');
        request.setBody(requestXML);

        HttpResponse response = new HttpResponse();
        Http http = new Http();
        response = http.send(request);

        // 处理SOAP响应
        if (response.getStatusCode() == 200) {
            String responseBody = response.getBody();
            // 处理响应数据
        } else {
            System.debug('SOAP Callout 失败：' + response.getStatusCode() + ' - ' + response.getStatus());
        }
    }

    private String generateSOAPRequest() {
        // 构建SOAP请求的XML
        String jsonPayload = '{"Record": [{"CarDate": "2023-06-01", "CarInfo": "一号车", "Member1": "吉田", "Member2": "早川", "Member3": "野原", "Member4": "武藤", "Member5": "山上"},{"CarDate": "2023-06-02", "CarInfo": "二号车", "Member1": "吉田", "Member2": "早川", "Member3": "野原", "Member4": "武藤", "Member5": "山上"},{"CarDate": "2023-06-03", "CarInfo": "三号车", "Member1": "吉田", "Member2": "早川", "Member3": "野原", "Member4": "武藤", "Member5": "山上"},{"CarDate": "2023-06-04", "CarInfo": "四号车", "Member1": "吉田", "Member2": "早川", "Member3": "野原", "Member4": "武藤", "Member5": "山上"},{"CarDate": "2023-06-05", "CarInfo": "五号车", "Member1": "吉田", "Member2": "早川", "Member3": "野原", "Member4": "武藤", "Member5": "山上"}]}';
        
        // 使用String.replaceAll()方法转义特殊字符
        String escapedPayload = jsonPayload.replaceAll('[&<>\'"]', '');

        // 构建SOAP请求的XML
        String soapRequest = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://example.com">' +
            '   <soapenv:Header/>' +
            '   <soapenv:Body>' +
            '      <web:ProcessData>' +
            '         <web:jsonData>' + escapedPayload + '</web:jsonData>' +
            '      </web:ProcessData>' +
            '   </soapenv:Body>' +
            '</soapenv:Envelope>';

        return soapRequest;
    }
}