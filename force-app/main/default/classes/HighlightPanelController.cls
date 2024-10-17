public with sharing class HighlightPanelController {

    @AuraEnabled
    public static ReturnWP fetchFields(String recordId, String objectName, String fieldSetName) {
        System.debug('###### recordId: ' + recordId);
        System.debug('###### objectName: ' + objectName);
        System.debug('###### fieldSetName: ' + fieldSetName);
        ReturnWP res = new ReturnWP();
        try {
            // Querying Name Field
            if(String.isBlank(recordId)) {
                res.message = 'Invalid Id';
                return res;
            }
            List<sObject> objectList = Database.query('SELECT id, Name FROM ' + objectName + ' WHERE Id =: recordId');
            System.debug('###### objectList: ' + objectList);
            res.nameField = String.valueof(objectList[0].get('Name'));

            // Fetching Highlight Panel Field Set
            if(String.isBlank(fieldSetName)) {
                res.message = 'Please provide a Field Set Name';
                return res;
            }
            Schema.FieldSet fieldSet = Schema.getGlobalDescribe().get(objectName).getDescribe().fieldSets.getMap().get(fieldSetName);
            System.debug('###### schma get now field Set: ' + Schema.getGlobalDescribe().get(objectName).getDescribe());
            System.debug('###### schma get now field Set map: ' + Schema.getGlobalDescribe().get(objectName).getDescribe().fieldSets.getMap());
            System.debug('###### final filedSet: ' + fieldSet);
            if(fieldSet == null) {
                res.message = 'Field Set provided is not Valid';
                return res;
            }
            res.fieldsAPI = new List<String>();
            for(Schema.FieldSetMember fieldSetMem:fieldSet.getFields()){
                res.fieldsAPI.add(fieldSetMem.getFieldPath());
            }
            return res;
        } catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public class ReturnWP {
        @AuraEnabled public String message;
        @AuraEnabled public String nameField;
        @AuraEnabled public List<String> fieldsAPI;
    }
}