// filteredRelatedCaseList.js
import { LightningElement, api, wire, track } from 'lwc';
export default class FilteredRelatedCaseList extends LightningElement {
    @track options = [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' }
    ];

    @track selectedValues = [];

    handleComboboxChange(event) {
        this.selectedValues = event.detail.value;
    }
}