public with sharing class ReturnErrorMsgController {
    public ReturnErrorMsgController(ApexPages.StandardController controller) {
        Apexpages.Message Msg = new Apexpages.Message(ApexPages.Severity.ERROR,'测试提示错误!');
        Apexpages.addMessage(Msg);
    }
}