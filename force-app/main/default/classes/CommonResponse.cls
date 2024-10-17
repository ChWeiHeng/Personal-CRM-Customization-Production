public class CommonResponse {
    @AuraEnabled public Map<String, Object> data {get; set;}
    @AuraEnabled public Integer viewCount {get; set;}
    public CommonResponse() {}
}