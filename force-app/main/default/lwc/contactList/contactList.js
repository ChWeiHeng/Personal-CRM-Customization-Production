import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    contactData;
    @wire(getContacts)
    contacts({data,error}) {
        if(data) {
            this.contactData = data;
            console.log('this.contactData',this.contactData);
        }
    };

    testButton(event) {
        let Id = event.target.title;
        let foundelement = this.contactData.find(element => element.Id == Id);
        console.log('foundelement: ', foundelement);
        console.log('111foundelement: ', foundelement.TestChackOne__c);
        foundelement.TestChackOne__c = true;
        console.log('222foundelement: ', foundelement.TestChackOne__c);
        this.contactData = [...this.contactData];
        console.log('this.contactData', this.contactData);
    }

    // get errors() {
    //     return (this.contacts.error) ? reduceErrors(this.contacts.error) : [];
    // }

}