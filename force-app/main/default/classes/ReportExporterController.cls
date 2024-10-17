public with sharing class ReportExporterController {
    
    @AuraEnabled
    public static String searchReports(String searchTerm) {
        // 查询逻辑，返回匹配的报表
        List<Report> reports = [SELECT Id, Name, LastModifiedDate FROM Report WHERE Name LIKE :('%' + searchTerm + '%')];
        List<ReportWrapper> reportWrappers = new List<ReportWrapper>();
        for (Report report : reports) {
            reportWrappers.add(new ReportWrapper(report.Id, report.Name, report.LastModifiedDate));
        }
        System.debug('$$$$$$ reportWrappers: ' + reportWrappers);
        return JSON.serialize(reportWrappers);
    }

    @AuraEnabled
    public static String exportReportsToExcel(List<Id> reportIds) {
        List<Report> reports = [SELECT Id, Name, CreatedDate FROM Report WHERE Id IN :reportIds];
        String csvContent = 'Id,Name,CreatedDate\n';
        
        for (Report rpt : reports) {
            csvContent += '"' + rpt.Id + '","' + rpt.Name + '","' + rpt.CreatedDate.format() + '"\n';
        }
        
        Blob csvBlob = Blob.valueOf(csvContent);
        String fileName = 'reports.csv';
        
        // Create a ContentVersion record to generate a file URL
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.Title = fileName;
        contentVersion.PathOnClient = fileName;
        contentVersion.VersionData = csvBlob;
        contentVersion.FirstPublishLocationId = UserInfo.getUserId(); // 添加这一行
        insert contentVersion;

        List<ContentVersion> queryLatestContentVersions = [SELECT Id, ContentDocumentId, Title FROM ContentVersion WHERE Id = :contentVersion.Id];
        System.debug('$$$$$$ queryLatestContentVersions: ' + queryLatestContentVersions);
        String fileUrl = '';
        
        if (!queryLatestContentVersions.isEmpty()) {
            ContentDocumentLink cdl = new ContentDocumentLink();
            cdl.ContentDocumentId = queryLatestContentVersions[0].ContentDocumentId;
            cdl.LinkedEntityId = reports[0].Id;
            cdl.ShareType = 'V';
            insert cdl;
            fileUrl = '/sfc/servlet.shepherd/version/download/' + contentVersion.Id;
        } else {
            throw new AuraHandledException('ContentDocumentId is null. The ContentVersion might not have been fully processed.');
        }
        
        System.debug('$$$$$$ fileUrl: ' + fileUrl);
        return fileUrl;
    }

    public class ReportWrapper {
        @AuraEnabled public Id Id { get; set; }
        @AuraEnabled public String Name { get; set; }
        @AuraEnabled public Datetime LastModifiedDate { get; set; }

        public ReportWrapper(Id id, String name, Datetime lastModifiedDate) {
            this.Id = id;
            this.Name = name;
            this.LastModifiedDate = lastModifiedDate;
        }
    }
}