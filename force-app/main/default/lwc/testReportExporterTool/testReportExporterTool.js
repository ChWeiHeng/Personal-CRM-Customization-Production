import { LightningElement, track } from 'lwc';
import searchReports from '@salesforce/apex/ReportExporterController.searchReports';
import exportReportsToExcel from '@salesforce/apex/ReportExporterController.exportReportsToExcel';

export default class TestReportExporterTool extends LightningElement {
    @track searchTerm = '';
    @track reports = [];
    @track selectedRows = [];
    @track columns = [
        { label: '报告名称', fieldName: 'Name' },
        { label: '报告 ID', fieldName: 'Id' },
        { label: '上次更新时间', fieldName: 'LastModifiedDate' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.getRowActions.bind(this) }
        }
    ];
    @track exportFileUrl;
    @track hasReports = false; // 控制数据表格显示

    get isExportDisabled() {
        return this.selectedRows.length === 0;
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        console.log('$$$$$$ searchTerm: ' + this.searchTerm);
    }

    handleSearch() {
        console.log('Handle search called with term:', this.searchTerm);
        searchReports({ searchTerm: this.searchTerm })
            .then(result => {
                console.log('Search result:', JSON.stringify(result));
                this.reports = JSON.parse(result);
                console.log('this.reports:', this.reports);
                this.hasReports = true;
            })
            .catch(error => {
                this.hasReports = false;
                console.error('Error fetching reports:', error);
            });
    }

    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows.map(row => row.Id);
        console.log('Selected rows:', this.selectedRows);
    }

    getRowActions(row, doneCallback) {
        const actions = [
            { label: 'Show Details', name: 'show_details' },
            { label: 'Delete', name: 'delete' }
        ];
        doneCallback(actions);
    }

    handleExportReports() {
        const selectedReportIds = this.selectedRows;
        console.log('$$$$$$ selectedReportIds: ' + selectedReportIds);
        
        exportReportsToExcel({ reportIds: selectedReportIds })
            .then(result => {
                this.exportFileUrl = result; // This should be a URL to the generated file
            })
            .catch(error => {
                console.error('Error exporting reports', error);
            });
    }
}