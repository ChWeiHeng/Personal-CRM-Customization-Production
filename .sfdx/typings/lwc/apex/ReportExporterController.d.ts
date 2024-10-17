declare module "@salesforce/apex/ReportExporterController.searchReports" {
  export default function searchReports(param: {searchTerm: any}): Promise<any>;
}
declare module "@salesforce/apex/ReportExporterController.exportReportsToExcel" {
  export default function exportReportsToExcel(param: {reportIds: any}): Promise<any>;
}
