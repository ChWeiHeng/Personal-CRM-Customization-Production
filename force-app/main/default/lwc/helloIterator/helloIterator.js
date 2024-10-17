import { LightningElement } from 'lwc';

export default class HelloIterator extends LightningElement {

    contacts = [
        {
            Id: 1,
            Name: 'TestName1',
            Age: 18,
            Title: 'VP of Engineering',
            first: true,
            last: false
        },
        {
            Id: 2,
            Name: 'TestName2',
            Age: 19,
            Title: 'VP of Sales',
            first: false,
            last: false
        },
        {
            Id: 3,
            Name: 'TestName3',
            Age: 20,
            Title: 'CEO',
            first:false,
            last: true
        }
    ];

}