// parentComponent.js
import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track slicerOptions = [
        { label: '选项1', value: 'option1', isSelected: false },
        { label: '选项2', value: 'option2', isSelected: false },
        { label: '选项3', value: 'option3', isSelected: false },
    ];
    @track selectedOptions = [];

    handleOptionsChange(event) {
        this.selectedOptions = event.detail;
    }
}