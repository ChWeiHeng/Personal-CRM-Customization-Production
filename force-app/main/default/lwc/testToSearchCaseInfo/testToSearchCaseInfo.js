import { LightningElement, api, track } from 'lwc';
import fetchRecords from '@salesforce/apex/TestToParentTableController.fetchRecords';
import getAccountData from '@salesforce/apex/TestToParentTableController.getAccountData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestToSearchCaseInfo extends LightningElement {

    @api carId;
    @api workingDate;
    @api recordTypeName;

    @api objectName;
    @api fieldName;
    @api value;
    @api iconName;
    @api label;
    @api placeholder;
    @api className;
    @api required = false;
    @track searchString;
    @track selectedRecord;
    @track recordsList;
    @track message;
    @track showPill = false;
    @track showSpinner = false;
    @track showDropdown = false;

    @track showPopup = false;
    @track searchKey;
    @track accounts = [];

    @track sortBy;
    @track sortDirection;

    @track selectedAccountId;

    handleRowSelection(event) {
        const selectedCheckbox = event.target;
        const selectedId = selectedCheckbox.dataset.id;
    
        // 取消之前选中的复选框
        const checkboxes = this.template.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox !== selectedCheckbox) {
                checkbox.checked = false;
            }
        });
    
        if (selectedCheckbox.checked) {
            // 处理选中行的逻辑
            this.selectedAccountId = selectedId;
        } else {
            // 取消选中行的逻辑
            this.selectedAccountId = null;
        }
    }

    handleConfirmSelect() {
        if (this.selectedAccountId != null) {
            var index = this.recordsList.findIndex(x => x.value === this.selectedAccountId)
            if(index != -1) {
                this.selectedRecord = this.recordsList[index];
                this.value = this.selectedRecord.value;
                this.showDropdown = false;
                this.showPill = true;
            }

            this.showPopup = false;
            this.closePopup();
        } else {
            const showToast = new ShowToastEvent({
                variant: 'error',
                message: 'You did not select any valid values',
            });
            this.dispatchEvent(showToast);
            return;
        }
    }

    connectedCallback() {
        if(this.value)
            this.fetchData();
    }

    searchRecords(event) {
        this.searchString = event.target.value;
        if(this.searchString) {
            this.fetchData();
        } else {
            this.showDropdown = false;
        }
    }

    selectItem(event) {
        if(event.currentTarget.dataset.key) {
    		var index = this.recordsList.findIndex(x => x.value === event.currentTarget.dataset.key)
            if(index != -1) {
                this.selectedRecord = this.recordsList[index];
                this.value = this.selectedRecord.value;
                this.showDropdown = false;
                this.showPill = true;
            }
        }
    }

    removeItem() {
        this.showPill = false;
        this.value = '';
        this.selectedRecord = '';
        this.searchString = '';
    }

    showRecords() {
        if(this.recordsList && this.searchString) {
            this.showDropdown = true;
        }
    }

    blurEvent() {
        this.showDropdown = false;
        console.log('$$$$$$ 光标离开时');
    }

    fetchData() {
        this.showSpinner = true;
        this.message = '';
        this.recordsList = [];
        fetchRecords({
            objectName : this.objectName,
            filterField : this.fieldName,
            searchString : this.searchString,
            value : this.value
        })
        .then(result => {
            if(result && result.length > 0) {
                if(this.value) {
                    this.selectedRecord = result[0];
                    this.showPill = true;
                } else {
                    this.recordsList = result;
                }
            } else {
                this.message = "No Records Found for '" + this.searchString + "'";
            }
            this.showSpinner = false;
        }).catch(error => {
            this.message = error.message;
            this.showSpinner = false;
        })
        if(!this.value) {
            this.showDropdown = true;
        }
    }

    openPopup() {
        this.showPopup = true;
        this.searchKey = this.searchString;
        console.log('$$$$$$ current enter value: ' + this.searchKey);
        this.searchAccountHandler();
    }

    closePopup() {
        this.showPopup = false;
        this.accounts = [];
        this.searchKey = '';
    }

    handelSearchKey(event){
        this.searchKey = event.target.value;
    }

    selectedValue(event) {
        console.log('$$$$$$ event.currentTarget.dataset.id: ' + event.currentTarget.dataset.id);

        var index = this.recordsList.findIndex(x => x.value === event.currentTarget.dataset.id)
        if(index != -1) {
            this.selectedRecord = this.recordsList[index];
            this.value = this.selectedRecord.value;
            this.showDropdown = false;
            this.showPill = true;
        }

        this.showPopup = false;
        this.closePopup();
    }

    //This funcation will fetch the Account Name on basis of searchkey
    searchAccountHandler(){
        //call Apex method.
        if (!this.isNotEmpty(this.searchKey)) {
            return;
        }
        getAccountData({textkey: this.searchKey})
        .then(result => {
                this.accounts = result;
        })
        .catch( error=>{
            this.accounts = null;
        });

    }
    cols = [
        {label:'Name', fieldName:'Name' , type:'text', sortable: "true", typeAttributes: { clickable: true }} ,
        {label:'Phone', fieldName:'Phone' , type:'Phone', sortable: "true"} ,
        {label:'Industry', fieldName:'Industry' , type:'text', sortable: "true"}
              
    ]

    handleSortAccountData(event) {       
        this.sortBy = event.detail.fieldName;       
        this.sortDirection = event.detail.sortDirection;       
        this.sortAccountData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortAccountData(fieldname, direction) {
        
        let parseData = JSON.parse(JSON.stringify(this.accounts));
       
        let keyValue = (a) => {
            return a[fieldname];
        };

       let isReverse = direction === 'asc' ? 1: -1;

           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
           
            return isReverse * ((x > y) - (y > x));
        });
        
        this.accounts = parseData;

    }

    sortByFieldName(event) {
        let fieldname = event.currentTarget.dataset.id;
        let direction = event.currentTarget.dataset.title;
        let parseData = JSON.parse(JSON.stringify(this.accounts));
        
        let currentFieldTaget = this.template.querySelector(`[data-title=${direction}]`);
        currentFieldTaget.getAttribute('data-title') == 'asc' ? currentFieldTaget.setAttribute('data-title', 'desc') : currentFieldTaget.setAttribute('data-title', 'asc');
       
        let keyValue = (a) => {
            return a[fieldname];
        };

       let isReverse = direction === 'asc' ? 1: -1;

           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
           
            return isReverse * ((x > y) - (y > x));
        });
        
        this.accounts = parseData;

    }

    isNotEmpty(value) {
        return value != undefined && value != null && value != "";
    }
}