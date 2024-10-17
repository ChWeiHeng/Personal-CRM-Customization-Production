public with sharing class GetLineWorksTokenService {
    // 常量定义
    private static final String CLIENT_ID = 'DO27YkXDvMbSlHcVVd17'; // 连接器ID
    private static final String CLIENT_SECRET = 'E57XaGmSDs'; // 连接器密钥
    private static final String GRANT_TYPE = 'authorization_code'; // 授权类型
    private static final String TOKEN_URL = 'https://auth.worksmobile.com/oauth2/v2.0/token'; // 请求授权代码提交令牌的URL
    private static final String SCOPE = 'user.read calendar calendar.read bot bot.message'; // 权限范围
    private static final String SERVICE_ACCOUNT = 'ywer1.serviceaccount@jntrixpro'; // 实际的服务账户
    private static final String PRIVATE_KEY = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCAdtkKSjMIebYPMYYhilZZUSF4S0nx+WJZu0JWjBNvTrNWH66OfAi84YANeHBVAcANI/XwBhShcWvRgLgLGg0vxLSQMrzjnuH/94dek+vh30W1/XWkv820dr4nu3MMWQukc6ZdV7sb2hTxHlcVTcM+LcpSVXFHIIknDsH0yz0wvu/dnHYXN6vKcmpTWfE5x27XCf2ALE6IvZ/aX2dyQDWz/h7xV/3wxTTIXtvjBRPfMWV63ZzfzSs+ctUYXvmVRGDpcyMK1oOyeeq1csKkZwzZpR4y7301/du7/30vpAvet4LNWX2zT2QfnxK6clrSZF81DXzNcfGiU9PGynfvqGwdAgMBAAECggEAXeP/L2kZsXkbWjFtAjiUccU9PClyyxrlCgY2LwFD9xdDNZAESXlX/YymxbGgEFEuJ6x/xMT88R3vmniEiwCoYKBZBAdBTO/D6Avm8XYVccl4rtGn2RiiZOJgirOTG5Q9UR2BmzlStMGIis4NAbILH/fhpplyKHUcKOK9WYftmiD16+hrPNXGNSEelHtlcaXsaKbsXSbazruhNS2UIlN2afn5zSM83FKy477wpgShE8hGdVRZR/u0NnzEVxvgsSbO8Y/nylmGNhA0mUjWejAsnPAN6W6I28HGIepttZ2hf+AbCFL9+LXE8Y/Z41nZCVuwM9kmQ51yJzZJ5dXAFD4Q1QKBgQDYs1xuW81UIyWeOq08QT14ZQdkacfK5/0wAHx3zgVkyyb6rIp7jz8rCkrJU9gLYbRy1lvblgRXGPk5FKsnkL8PfaVWH2Q9AZdas8rijpqJ9P0glYkR9rQkAmuFWM+PRjO/NXANfCG+tzWgThGLpbGDEhTFCZfUZlrikw0TFCeJHwKBgQCXwvxVwZlZBbG3FAp/1FftKgGWeTvu2QW+6L7byBVV/hf9F6bMa/ggrdZO9WZzEHIy1qU36M1E3M9sREOGyCgLQAm3dxfdPp77bK8Y3aaMwNrKrawDteF7odLdeWDUUwbO6pDOvygOu1FvzE82fVQWOrR3il4FB86V+C/i0YpXQwKBgQCxJP5cYMNbElhAHutapGJhtwTx+t8OadK5mMwnC82w9blplf6mvxT+VC2KovWraDWg4sa4nMvzf0DMfq7jaxokyauM2aCRlmlqBivGRJjkSdda+aLRgoEEJs5Kda1HDDZlCoQNIfpb81ztLKR/KfYQlYlRAWSShxGowlkfzYv8NQKBgDlTAqOV7EmvF/DSliCw4cGI0262Pog626vAGI/GJSEFSKRmMbAXvHMDlubeVSNze99uKpxSyG6RhZwcsPERW+bb+o+dYZtFkyHfbMhUuRuDoWFbdpU0N4bOmmrj9UpeTj0MZ0Rg+k2OPfWf0+/+KSv4YsCguGDoEQWe6N+hTMMnAoGBAJupScfxJ4kVivLRKscPqGJxhHWkdXxJ5RlvuGVlKaWe1sT5kLcCh3+nPY/xmsvWGFnqaO5SKYh6chXaAkINVSuQUm5ErrfWcn7cJ6fgvZ+xVB8geHsJqOHe5065QD1DxWr74XHnz/cwj76mtMOOiYUWugDf8bEQKXw1cUz2M64h'; // 私有KEY

    // DML接口调用常量定义
    private static final String BASE_URL = 'https://www.worksapis.com/v1.0'; // 基础接口
    private static final String CALENDAR_API_URL = 'https://www.worksapis.com/v1.0/calendars'; // 创建日历接口

    // 获取AccessToken并立即创建日历事件
    public static void createCalendarEventWithToken() {
        String accessToken;
        String errorMsg;
        try {
            // 1. 获取 Access Token
            Http http = new Http();
            HttpRequest tokenRequest = new HttpRequest();
            tokenRequest.setEndpoint('https://auth.worksmobile.com/oauth2/v2.0/token');
            tokenRequest.setMethod('POST');
            tokenRequest.setHeader('Content-Type', 'application/x-www-form-urlencoded');

            // 生成JWT Token
            String jwtToken = generateJwt();
            String body = 'assertion=' + EncodingUtil.urlEncode(jwtToken, 'UTF-8') +
                          '&grant_type=' + EncodingUtil.urlEncode('urn:ietf:params:oauth:grant-type:jwt-bearer', 'UTF-8') +
                          '&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
                          '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8') +
                          '&scope=' + EncodingUtil.urlEncode(SCOPE, 'UTF-8');
            tokenRequest.setBody(body);

            HttpResponse tokenResponse = http.send(tokenRequest);

            if (tokenResponse.getStatusCode() == 200) {
                // 解析 Access Token
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(tokenResponse.getBody());
                accessToken = (String) responseMap.get('access_token');
                System.debug('Access Token retrieved: ' + accessToken);
            } else {
                throw new CalloutException('Failed to get Access Token: ' + tokenResponse.getBody());
            }

            // 2. 创建日历事件
            String userId = 'ai.xq@jntrixpro'; // 替换为实际的 userId
            String calendarId = 'c_400489802_6ea0da33-ae40-49a6-86e2-a710fc356124'; // 替换为实际的 calendarId

            String summary = 'TEST Salesforce meeting 2024-08-26'; // 日程内容
            String description = '通过 Salesforce 创建的日历事件数据'; // 日程备注
            String location = '济南市高新区政府'; // 地点
            String mapType = 'google'; // 地图类型
            String mapGeo = '36.6816;117.127561'; // 经纬度
            String mapUrl = 'https://maps.google.com/?q=36.6816,117.127561'; // 地图URL
            String mapImageId = 'mapImageId123'; // 地图图片Id
            String categoryId = '1'; // 预定类别Id
            String organizerEmail = 'ai.xq@jntrixpro'; // 主办人邮箱
            String organizerDisplayName = 'XQ AI'; // 主办人名称
            String startDateTime = '2024-08-27T10:00:00'; // 开始时间
            String endDateTime = '2024-08-27T12:00:00'; // 结束事件
            String timeZone = 'Asia/Tokyo'; // 时区
            String transparency = 'OPAQUE'; // 表示方法
            String visibility = 'PRIVATE'; // 是否公开
            Integer sequence = 0;

            List<Map<String, Object>> attendees = new List<Map<String, Object>>{
                new Map<String, Object>{
                    'email' => 'chendong294@jntrixpro',
                    'displayName' => '陈恫',
                    'partstat' => 'NEEDS-ACTION',
                    'isOptional' => false,
                    'isResource' => false
                }
            };

            String videoMeetingUrl = 'https://works.do/xYmmoMC_call';
            String videoMeetingResourceId = 'xYmmoMC_call';

            List<Map<String, Object>> reminders = new List<Map<String, Object>>{
                new Map<String, Object>{
                    'method' => 'DISPLAY',
                    'trigger' => '-PT10M'
                },
                new Map<String, Object>{
                    'method' => 'EMAIL',
                    'triggerDateTime' => new Map<String, String>{
                        'dateTime' => '2024-08-27T09:55:00',
                        'timeZone' => 'Asia/Tokyo'
                    }
                }
            };

            // 创建 JSON 生成器
            JSONGenerator gen = JSON.createGenerator(true);

            gen.writeStartObject();
            gen.writeFieldName('eventComponents');
            gen.writeStartArray();
            gen.writeStartObject();
            gen.writeStringField('summary', summary);
            gen.writeStringField('description', description);
            gen.writeStringField('location', location);

            gen.writeFieldName('map');
            gen.writeStartObject();
            gen.writeStringField('type', mapType);
            gen.writeStringField('geo', mapGeo);
            gen.writeEndObject();

            gen.writeFieldName('mapUrl');
            gen.writeStartObject();
            gen.writeStringField('mapUrl', mapUrl);
            gen.writeStringField('imageId', mapImageId);
            gen.writeEndObject();

            gen.writeStringField('categoryId', categoryId);

            gen.writeFieldName('organizer');
            gen.writeStartObject();
            gen.writeStringField('email', organizerEmail);
            gen.writeStringField('displayName', organizerDisplayName);
            gen.writeEndObject();

            gen.writeFieldName('start');
            gen.writeStartObject();
            gen.writeStringField('dateTime', startDateTime);
            gen.writeStringField('timeZone', timeZone);
            gen.writeEndObject();

            gen.writeFieldName('end');
            gen.writeStartObject();
            gen.writeStringField('dateTime', endDateTime);
            gen.writeStringField('timeZone', timeZone);
            gen.writeEndObject();

            gen.writeStringField('transparency', transparency);
            gen.writeStringField('visibility', visibility);
            gen.writeNumberField('sequence', sequence);

            gen.writeFieldName('attendees');
            gen.writeStartArray();
            for (Map<String, Object> attendee : attendees) {
                gen.writeStartObject();
                gen.writeStringField('email', (String) attendee.get('email'));
                gen.writeStringField('displayName', (String) attendee.get('displayName'));
                gen.writeStringField('partstat', (String) attendee.get('partstat'));
                gen.writeBooleanField('isOptional', (Boolean) attendee.get('isOptional'));
                gen.writeBooleanField('isResource', (Boolean) attendee.get('isResource'));
                gen.writeEndObject();
            }
            gen.writeEndArray();

            gen.writeFieldName('videoMeeting');
            gen.writeStartObject();
            gen.writeStringField('url', videoMeetingUrl);
            gen.writeStringField('resourceId', videoMeetingResourceId);
            gen.writeEndObject();

            gen.writeFieldName('reminders');
            gen.writeStartArray();
            for (Map<String, Object> reminder : reminders) {
                gen.writeStartObject();
                if (reminder.containsKey('method')) {
                    gen.writeStringField('method', (String) reminder.get('method'));
                }
                if (reminder.containsKey('trigger')) {
                    gen.writeStringField('trigger', (String) reminder.get('trigger'));
                }
                if (reminder.containsKey('triggerDateTime')) {
                    gen.writeFieldName('triggerDateTime');
                    gen.writeStartObject();
                    gen.writeStringField('dateTime', (String) ((Map<String, Object>) reminder.get('triggerDateTime')).get('dateTime'));
                    gen.writeStringField('timeZone', (String) ((Map<String, Object>) reminder.get('triggerDateTime')).get('timeZone'));
                    gen.writeEndObject();
                }
                gen.writeEndObject();
            }
            gen.writeEndArray();

            gen.writeEndObject();
            gen.writeEndArray();
            gen.writeEndObject();

            String jsonPayload = gen.getAsString();
            System.debug('JSON Payload: ' + jsonPayload);

            // 构建请求 URL
            String endpointUrl = BASE_URL + '/users/' + EncodingUtil.urlEncode(userId, 'UTF-8') + '/calendars/' + EncodingUtil.urlEncode(calendarId, 'UTF-8') + '/events';

            // 创建事件请求
            HttpRequest eventRequest = new HttpRequest();
            eventRequest.setEndpoint(endpointUrl); // 替换为实际的事件创建URL
            eventRequest.setMethod('POST');
            eventRequest.setHeader('Authorization', 'Bearer ' + accessToken);
            eventRequest.setHeader('Content-Type', 'application/json');
            eventRequest.setBody(jsonPayload);

            HttpResponse eventResponse = http.send(eventRequest);

            if (eventResponse.getStatusCode() == 200 || eventResponse.getStatusCode() == 201) {
                System.debug('Calendar event created successfully: ' + eventResponse.getBody());
            } else {
                System.debug('Failed to create calendar event: ' + eventResponse.getBody());
            }

        } catch (Exception e) {
            System.debug('Error occurred: ' + e.getMessage());
        }
    }

    /**
     * 获取 Access Token 授权码模式
     * 
     * 此方法从 Salesforce 自定义对象 `LineWorks_Connect_Info__c` 中获取最新的授权码，
     * 然后使用此授权码向 LINE WORKS 的 Token 端点发送 HTTP POST 请求以获取 Access Token。
     * 
     * 步骤说明：
     * 1. 查询 `LineWorks_Connect_Info__c` 对象以获取最新的认证代码。
     * 2. 如果找到记录，则创建并配置一个 HTTP 请求以获取 Access Token。
     * 3. 设置请求头和请求体参数，包括授权码、授权类型、客户端 ID 和客户端密钥。
     * 4. 发送 HTTP 请求，并检查响应状态码。
     * 5. 如果请求成功，解析响应 JSON，提取返回的各个 Token，调用 storeLineWorkToken 方法并将其存储。
     * 6. 如果请求失败，记录错误信息并抛出异常。
     * 7. 如果没有找到认证代码，记录错误信息并抛出异常。
     * 
     * @return String 返回响应的完整内容，包括 Access Token 和其他信息。
     * @throws CalloutException 如果获取 Access Token 失败或未找到认证代码，将抛出异常。
     */
    public static String getAccessToken() {
        // 查询最新的认证Code数据
        List<LineWorks_Connect_Info__c> records = [SELECT Id, LineWork_Code__c, LineWork_State__c FROM LineWorks_Connect_Info__c LIMIT 1];

        if (records != null && records.size() > 0) {
            // 创建一个 HTTP 请求对象
            HttpRequest req = new HttpRequest();
            req.setEndpoint(TOKEN_URL);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

            // 设置请求体参数
            String requestBody = 'code=' + EncodingUtil.urlEncode(records[0].LineWork_Code__c, 'UTF-8') +
                                '&grant_type=' + EncodingUtil.urlEncode(GRANT_TYPE, 'UTF-8') +
                                '&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
                                '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8');

            req.setBody(requestBody);

            // 发送 HTTP 请求并获取响应
            Http http = new Http();
            HttpResponse res = http.send(req);

            // 检查响应状态码
            if (res.getStatusCode() == 200) {
                System.debug('$$$$$$ res.getBody(): ' + res.getBody());
                // 解析 JSON 响应并提取 Access Token
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                System.debug('$$$$$$ responseMap: ' + responseMap);
                String accessToken = (String) responseMap.get('access_token');
                System.debug('$$$$$$ accessToken: ' + accessToken);
                storeLineWorkToken(responseMap);

                // 返回 Token及其他信息
                return res.getBody();
            } else {
                // 处理错误情况
                System.debug('Error: ' + res.getStatusCode() + ' - ' + res.getStatus());
                System.debug('Response Body: ' + res.getBody());
                throw new CalloutException('Failed to obtain access token');
            }
        } else {
            String errorMessage = '代码中查询不到最新的认证Code';
            System.debug(errorMessage);
            throw new CalloutException(errorMessage);
        }
    }

    /**
     * 获取 Access Token JWT模式
     * 
     * 此方法通过 JWT（JSON Web Token）授权模式从 LINE WORKS 获取 Access Token。
     * 
     * 步骤说明：
     * 1. 调用 `generateJwt` 方法生成 JWT Token，用于授权请求。
     * 2. 创建并配置一个 HTTP 请求对象。
     * 3. 设置请求的 URL、方法（POST）和请求头（内容类型为 `application/x-www-form-urlencoded`）。
     * 4. 构建请求体，包含 JWT Token、授权类型、客户端 ID、客户端密钥和作用域。
     * 5. 发送 HTTP 请求并获取响应。
     * 6. 检查响应状态码是否为 `200`，如果是，则解析 JSON 响应体，提取返回的各个 Token，并调用 `storeLineWorkToken` 方法存储 Token。
     * 7. 如果响应状态码不是 `200`，则抛出 `CalloutException` 异常，并记录错误信息。
     * 
     * @return String 返回响应的完整内容，包括 Access Token 和其他信息。
     * @throws CalloutException 如果 HTTP 请求失败，将抛出异常，并附带状态码和响应体的错误信息。
     */
    public static String getAccessTokenByJWT() {
        // 获取JWT生成的参数
        String jwtToken = generateJwt();
        // 创建 Http 对象
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        
        // 设置请求 URL
        request.setEndpoint('https://auth.worksmobile.com/oauth2/v2.0/token');
        request.setMethod('POST');
        
        // 设置请求头
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        // 设置请求体
        String body = 'assertion=' + EncodingUtil.urlEncode(jwtToken, 'UTF-8') +
                      '&grant_type=' + EncodingUtil.urlEncode('urn:ietf:params:oauth:grant-type:jwt-bearer', 'UTF-8') +
                      '&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
                      '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8') +
                      '&scope=' + EncodingUtil.urlEncode(SCOPE, 'UTF-8');
        
        request.setBody(body);
        
        // 发送请求
        HttpResponse response = http.send(request);
        
        // 处理响应
        if (response.getStatusCode() == 200) {
            // 解析 JSON 响应并提取 Access Token
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('$$$$$$ responseMap: ' + responseMap);
            String accessToken = (String) responseMap.get('access_token');
            System.debug('$$$$$$ accessToken: ' + accessToken);
            storeLineWorkToken(responseMap);
            return response.getBody();
        } else {
            throw new CalloutException('请求Token失败! HTTP request failed with status code: ' + response.getStatusCode() +
                                       ' and response body: ' + response.getBody());
        }
    }

    // Lineworks 创建日历数据入口
    public static void executeCreateCalendar() {
        // 定义日历信息
        String calendarName = 'TEST Calendar Create By Salesforce';
        String description = 'memo';
        
        // 定义成员列表
        List<Map<String, String>> members = new List<Map<String, String>>{
            new Map<String, String>{
                'id' => 'ai.xq@jntrixpro',
                'type' => 'USER',
                'role' => 'CALENDAR_EVENT_READ_WRITE'
            },
            new Map<String, String>{
                'id' => 'chendong294@jntrixpro',
                'type' => 'USER',
                'role' => 'CALENDAR_EVENT_READ_WRITE'
            }
        };
        
        // 设置日历是否公开
        Boolean isPublic = true;

        // 调用 CalendarService 创建日历
        try {
            String result = createCalendar(calendarName, description, members, isPublic);
            System.debug('Calendar creation result: ' + result);
        } catch (CalloutException e) {
            System.debug('Exception occurred: ' + e.getMessage());
        }
    }

    // Lineworks 创建日历实现方法
    public static String createCalendar(String calendarName, String description, List<Map<String, String>> members, Boolean isPublic) {
        // 获取最新的Access Token
        List<LineWorks_Connect_Info__c> existingRecords = [SELECT Id, LineWork_Code__c, LineWork_State__c, LineWorks_Access_Token__c FROM LineWorks_Connect_Info__c LIMIT 1];

        if (existingRecords != null && existingRecords.size() > 0) {
            // 创建一个 HTTP 请求对象
            HttpRequest req = new HttpRequest();
            req.setEndpoint(CALENDAR_API_URL);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('Authorization', 'Bearer ' + existingRecords[0].LineWorks_Access_Token__c);

            // 设置请求体参数
            Map<String, Object> requestBody = new Map<String, Object>();
            requestBody.put('calendarName', calendarName);
            requestBody.put('description', description);
            requestBody.put('members', members);
            requestBody.put('isPublic', isPublic);

            String jsonRequestBody = JSON.serialize(requestBody);
            req.setBody(jsonRequestBody);

            // 发送 HTTP 请求并获取响应
            Http http = new Http();
            HttpResponse res;
            try {
                res = http.send(req);
            } catch (Exception e) {
                System.debug('HTTP Callout Exception: ' + e.getMessage());
                throw new CalloutException('HTTP Callout failed: ' + e.getMessage());
            }

            // 检查响应状态码
            if (res.getStatusCode() == 201) {
                // 解析 JSON 响应
                Map<String, Object> responseMap;
                try {
                    responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                    System.debug('$$$$$$ responseMap: ' + responseMap);
                } catch (Exception e) {
                    System.debug('JSON Deserialization Exception: ' + e.getMessage());
                    throw new CalloutException('Failed to parse response JSON: ' + e.getMessage());
                }

                System.debug('Response: ' + responseMap);
                return 'Success: ' + responseMap.get('calendarId'); // Assuming the response contains an 'id' field
            } else {
                // 处理错误情况
                System.debug('Error: ' + res.getStatusCode() + ' - ' + res.getStatus());
                System.debug('Response Body: ' + res.getBody());
                throw new CalloutException('Failed to create calendar');
            }
        } else {
            // 处理错误情况 找不到最新的Access Token
            throw new CalloutException('找不到最新的Access Token');
        }
    }

    // 创建日历事件的入口
    public static void executeCreateCalendarEvent() {
        String userId = 'ai.xq@jntrixpro'; // 替换为实际的 userId
        // String calendarId = '4bf241b1-211b-468f-a095-81ddeadd8fae'; // 替换为实际的 calendarId
        String calendarId = 'c_400489802_6ea0da33-ae40-49a6-86e2-a710fc356124';

        String summary = 'TEST Salesforce meeting 2024-08-26'; // 日程内容
        String description = '通过 Salesforce 创建的日历事件数据'; // 日程备注
        String location = '济南市高新区政府'; // 地点
        String mapType = 'google'; // 地图类型
        String mapGeo = '36.6816;117.127561'; // 经纬度
        String mapUrl = 'https://maps.google.com/?q=36.6816,117.127561'; // 地图URL
        String mapImageId = 'mapImageId123'; // 地图图片Id
        String categoryId = '1'; // 预定类别Id
        String organizerEmail = 'ai.xq@jntrixpro'; // 主办人邮箱
        String organizerDisplayName = 'XQ AI'; // 主办人名称
        String startDateTime = '2024-08-26T18:00:00'; // 开始时间
        String endDateTime = '2024-08-26T21:00:00'; // 结束事件
        String timeZone = 'Asia/Tokyo'; // 时区
        String transparency = 'OPAQUE'; // 表示方法
        String visibility = 'PUBLIC'; // 是否公开
        Integer sequence = 0;

        // 出席者信息
        List<Map<String, Object>> attendees = new List<Map<String, Object>>{
            new Map<String, Object>{
                'email' => 'chendong294@jntrixpro', // 邮箱
                'displayName' => '陈恫', // 名称
                'partstat' => 'NEEDS-ACTION', // 回复状态-(默认未答复)
                'isOptional' => false, // 可选入口标志
                'isResource' => false // 设备标志
            }
        };

        String videoMeetingUrl = 'https://works.do/xYmmoMC_call'; // 视频通话网址
        String videoMeetingResourceId = 'xYmmoMC_call'; // 视频通话Id

        // 通知动作
        List<Map<String, Object>> reminders = new List<Map<String, Object>>{
            new Map<String, Object>{
                'method' => 'DISPLAY', // 通知方法
                'trigger' => '-PT10M' // 通知时间
            },
            new Map<String, Object>{
                'method' => 'EMAIL',
                'triggerDateTime' => new Map<String, String>{
                    'dateTime' => '2024-08-26T17:55:00',
                    'timeZone' => 'Asia/Tokyo'
                }
            }
        };

        try {
            String result = createCalendarEvent(userId, calendarId, summary, description, location, mapType, mapGeo, mapUrl, mapImageId, categoryId, organizerEmail, organizerDisplayName, startDateTime, endDateTime, timeZone, transparency, visibility, sequence, attendees, videoMeetingUrl, videoMeetingResourceId, reminders);
            System.debug('Calendar event creation result: ' + result);
        } catch (CalloutException e) {
            System.debug('Exception occurred: ' + e.getMessage());
        }
    }

    // 创建日历事件的方法
    public static String createCalendarEvent(String userId, String calendarId, String summary, String description, String location, String mapType, String mapGeo, String mapUrl, String mapImageId, 
        String categoryId, String organizerEmail, String organizerDisplayName, String startDateTime, String endDateTime, String timeZone, String transparency, 
        String visibility, Integer sequence, List<Map<String, Object>> attendees, String videoMeetingUrl, String videoMeetingResourceId, List<Map<String, Object>> reminders) {

        // 获取最新的Access Token
        List<LineWorks_Connect_Info__c> existingRecords = [SELECT Id, LineWork_Code__c, LineWork_State__c, LineWorks_Access_Token__c FROM LineWorks_Connect_Info__c LIMIT 1];

        if (existingRecords != null && existingRecords.size() > 0) {
            // 构建请求 URL
            String endpointUrl = BASE_URL + '/users/' + EncodingUtil.urlEncode(userId, 'UTF-8') + '/calendars/' + EncodingUtil.urlEncode(calendarId, 'UTF-8') + '/events';

            // 创建 JSON 生成器
            JSONGenerator gen = JSON.createGenerator(true);

            // 开始构建 JSON 数据
            gen.writeStartObject(); // 开始对象

            gen.writeFieldName('eventComponents');
            gen.writeStartArray(); // 开始数组
            gen.writeStartObject(); // 开始对象

            gen.writeStringField('summary', summary);
            gen.writeStringField('description', description);
            gen.writeStringField('location', location);

            gen.writeFieldName('map');
            gen.writeStartObject();
            gen.writeStringField('type', mapType);
            gen.writeStringField('geo', mapGeo);
            gen.writeEndObject(); // 结束 map 对象

            gen.writeFieldName('mapUrl');
            gen.writeStartObject();
            gen.writeStringField('mapUrl', mapUrl);
            gen.writeStringField('imageId', mapImageId);
            gen.writeEndObject(); // 结束 mapUrl 对象

            gen.writeStringField('categoryId', categoryId);

            gen.writeFieldName('organizer');
            gen.writeStartObject();
            gen.writeStringField('email', organizerEmail);
            gen.writeStringField('displayName', organizerDisplayName);
            gen.writeEndObject(); // 结束 organizer 对象

            gen.writeFieldName('start');
            gen.writeStartObject();
            gen.writeStringField('dateTime', startDateTime);
            gen.writeStringField('timeZone', timeZone);
            gen.writeEndObject(); // 结束 start 对象

            gen.writeFieldName('end');
            gen.writeStartObject();
            gen.writeStringField('dateTime', endDateTime);
            gen.writeStringField('timeZone', timeZone);
            gen.writeEndObject(); // 结束 end 对象

            gen.writeStringField('transparency', transparency);
            gen.writeStringField('visibility', visibility);
            gen.writeNumberField('sequence', sequence);

            gen.writeFieldName('attendees');
            gen.writeStartArray(); // 开始数组
            for (Map<String, Object> attendee : attendees) {
                gen.writeStartObject();
                gen.writeStringField('email', (String) attendee.get('email'));
                gen.writeStringField('displayName', (String) attendee.get('displayName'));
                gen.writeStringField('partstat', (String) attendee.get('partstat'));
                gen.writeBooleanField('isOptional', (Boolean) attendee.get('isOptional'));
                gen.writeBooleanField('isResource', (Boolean) attendee.get('isResource'));
                gen.writeEndObject(); // 结束 attendee 对象
            }
            gen.writeEndArray(); // 结束 attendees 数组

            gen.writeFieldName('videoMeeting');
            gen.writeStartObject();
            gen.writeStringField('url', videoMeetingUrl);
            gen.writeStringField('resourceId', videoMeetingResourceId);
            gen.writeEndObject(); // 结束 videoMeeting 对象

            gen.writeFieldName('reminders');
            gen.writeStartArray(); // 开始数组
            for (Map<String, Object> reminder : reminders) {
                gen.writeStartObject();
                if (reminder.containsKey('method')) {
                    gen.writeStringField('method', (String) reminder.get('method'));
                }
                if (reminder.containsKey('trigger')) {
                    gen.writeStringField('trigger', (String) reminder.get('trigger'));
                }
                if (reminder.containsKey('triggerDateTime')) {
                    gen.writeFieldName('triggerDateTime');
                    gen.writeStartObject();
                    gen.writeStringField('dateTime', (String) ((Map<String, Object>) reminder.get('triggerDateTime')).get('dateTime'));
                    gen.writeStringField('timeZone', (String) ((Map<String, Object>) reminder.get('triggerDateTime')).get('timeZone'));
                    gen.writeEndObject(); // 结束 triggerDateTime 对象
                }
                gen.writeEndObject(); // 结束 reminder 对象
            }
            gen.writeEndArray(); // 结束 reminders 数组

            gen.writeEndObject(); // 结束 eventComponents 对象
            gen.writeEndArray(); // 结束 eventComponents 数组
            gen.writeEndObject(); // 结束根对象

            String jsonPayload = gen.getAsString();
            System.debug('$$$$$$ JSON Payload: ' + jsonPayload);

            // 创建 HTTP 请求对象
            System.debug('$$$$$$ endpointUrl: ' + endpointUrl);
            HttpRequest req = new HttpRequest();
            req.setEndpoint(endpointUrl);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('Authorization', 'Bearer ' + existingRecords[0].LineWorks_Access_Token__c);
            req.setBody(jsonPayload);

            // 发送 HTTP 请求并获取响应
            Http http = new Http();
            HttpResponse res = http.send(req);

            // 检查响应状态码
            if (res.getStatusCode() == 200 || res.getStatusCode() == 201) {
                // 成功处理
                System.debug('Event created successfully: ' + res.getBody());
                return res.getBody();
            } else {
                // 处理错误情况
                System.debug('Error: ' + res.getStatusCode() + ' - ' + res.getStatus());
                System.debug('Response Body: ' + res.getBody());
                throw new CalloutException('Failed to create calendar event');
            }
        } else {
            // 处理错误情况 找不到最新的Access Token
            throw new CalloutException('找不到最新的Access Token');
        }
    }

    public static void storeLineWorkToken(Map<String, Object> responseMap) {
        // 返回数据不为空时保存数据到LineWorksConnectInfo中
        if (!responseMap.isEmpty()) {
            // 查询或创建自定义对象记录
            LineWorks_Connect_Info__c metadataRecord;
            
            // 查询现有记录（如果存在）
            List<LineWorks_Connect_Info__c> existingRecords = [SELECT Id, LineWork_Code__c, LineWork_State__c, LineWorks_Access_Token__c FROM LineWorks_Connect_Info__c LIMIT 1];
            
            if (!existingRecords.isEmpty()) {
                metadataRecord = existingRecords[0];
            } else {
                // 如果没有记录，创建一个新的记录
                metadataRecord = new LineWorks_Connect_Info__c();
            }

            // 设置 access_token 字段的值
            metadataRecord.LineWorks_Access_Token__c = (String) responseMap.get('access_token');
            // 设置 refresh_token 字段的值
            metadataRecord.LineWorks_Refresh_Token__c = (String) responseMap.get('refresh_token');

            // 插入或更新自定义元数据记录
            upsert metadataRecord;
        }
    }

    // 从 PEM 文件中提取 Base64 编码的私钥部分
    private static String getBase64PrivateKey() {
        String privateKeyBase64 = PRIVATE_KEY
            .replace('-----BEGIN PRIVATE KEY-----', '')
            .replace('-----END PRIVATE KEY-----', '')
            .replaceAll('\\s+', '');
        return privateKeyBase64;
    }

    // Base64 URL 编码
    private static String base64UrlEncode(Blob input) {
        String encoded = EncodingUtil.base64Encode(input);
        encoded = encoded.replace('+', '-').replace('/', '_').replace('=', '');
        return encoded;
    }

    // 生成 JWT
    public static String generateJwt() {
        // 处理私钥
        String privateKeyBase64 = getBase64PrivateKey();
        Blob privateKeyBlob = EncodingUtil.base64Decode(privateKeyBase64);
        
        // 创建 Header 和 Payload
        Map<String, Object> header = new Map<String, Object>{
            'alg' => 'RS256',
            'typ' => 'JWT'
        };
        
        Long currentTime = System.currentTimeMillis() / 1000;
        Map<String, Object> payload = new Map<String, Object>{
            'iss' => CLIENT_ID,
            'sub' => SERVICE_ACCOUNT, // 替换为实际的服务账户
            'iat' => Integer.valueOf(currentTime), // 当前时间（秒）
            'exp' => Integer.valueOf(currentTime + 3600) // 过期时间（当前时间 + 1 小时）
        };
        
        // 编码 Header 和 Payload
        String headerJson = JSON.serialize(header);
        String payloadJson = JSON.serialize(payload);
        
        Blob headerBlob = Blob.valueOf(headerJson);
        Blob payloadBlob = Blob.valueOf(payloadJson);
        
        String headerEncoded = base64UrlEncode(headerBlob);
        String payloadEncoded = base64UrlEncode(payloadBlob);
        
        // 拼接 Header 和 Payload
        String toSign = headerEncoded + '.' + payloadEncoded;
        
        // 进行签名
        Blob signedBlob = Crypto.sign('RSA-SHA256', Blob.valueOf(toSign), privateKeyBlob);
        String signature = base64UrlEncode(signedBlob);
        
        // 生成最终的 JWT
        String jwt = toSign + '.' + signature;
        
        return jwt;
    }

    // 处理可能出现的 CalloutException 异常
    public class CalloutException extends Exception {}
}