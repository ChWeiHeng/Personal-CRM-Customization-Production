import { LightningElement, api } from 'lwc';

export default class TestToSubTable extends LightningElement {

    @api record;
    @api index;

    connectedCallback() {
        console.log('###### record: ' + JSON.stringify(this.record));
    }

}