import { LightningElement } from 'lwc';

export default class Newcontainerchild extends LightningElement {

    addOneMore = true;

    handleChange() {
        this.addOneMore = !this.addOneMore;
    }

}