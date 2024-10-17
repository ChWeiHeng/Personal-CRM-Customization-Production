import { LightningElement } from 'lwc';

export default class Child extends LightningElement {

    showFooter = true;

    handleClick() {
        this.showFooter = !this.showFooter;
    }

}