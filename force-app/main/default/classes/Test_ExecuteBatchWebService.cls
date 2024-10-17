@isTest
public with sharing class Test_ExecuteBatchWebService {
    static testMethod void myUnitTest() {
        ExecuteBatchWebService.executeBatchByParamPost('LeadConvertedByDMLBatch,SoapDispatchBatch');
        ExecuteBatchWebService.executeBatchByParamPost('SoapDispatchBatch,LeadConvertedByDMLBatch');
        ExecuteBatchWebService.queryJobStatusByClassName('LeadConvertedByDMLBatch,SoapDispatchBatch', 6000);
        ExecuteBatchWebService.stopExecuteBatchByClassName('LeadConvertedByDMLBatch,SoapDispatchBatch');
    }
}