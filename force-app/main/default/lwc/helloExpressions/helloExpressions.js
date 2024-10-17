import { LightningElement, track } from 'lwc';

export default class HelloExpressions extends LightningElement {

    firstName = '';
    lastName = '';
    @track fullName = { firstName : '', lastName : ''};

    handleChange(event) {
        const filed = event.target.name;
        if(filed == 'firstName') {
            this.firstName = event.target.value;
            this.fullName.firstName = {firstName: 'Doe', lastName: 'John'};
        } else {
            this.lastName = event.target.value;
            this.fullName.lastName = {lastName: 'John'};
        }
    }

    get uppercasedFullName() {
        return `${this.firstName} ${this.lastName}`.toUpperCase();
    }

}