import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HelloForEach extends NavigationMixin(LightningElement) {

    contacts = [
        {
            Id: 1,
            Name: 'TestName1',
            Age: 18,
            Title: 'VP of Engineering'
        },
        {
            Id: 2,
            Name: 'TestName2',
            Age: 19,
            Title: 'VP of Sales'
        },
        {
            Id: 3,
            Name: 'TestName3',
            Age: 20,
            Title: 'CEO'
        }
    ];

    navagateToRecordDetail(event) {
        console.log('jump jump jump');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: 'a082w000008UceeAAC',
                objectApiName: 'WeChat__c',
                actionName: 'view'
            }
        });
    }

}