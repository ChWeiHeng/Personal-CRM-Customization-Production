// slicerComponent.js
import { LightningElement, api, track } from 'lwc';

export default class RadioListComponent extends LightningElement {
    @api options = [];
    @track selectedOptions = [];

    handleOptionClick(event) {
        const clickedValue = event.target.label;
        const optionIndex = this.options.findIndex(option => option.label === clickedValue);

        if (optionIndex !== -1) {
            this.options[optionIndex].isSelected = !this.options[optionIndex].isSelected;

            if (this.options[optionIndex].isSelected) {
                this.selectedOptions.push(clickedValue);
            } else {
                this.selectedOptions = this.selectedOptions.filter(option => option !== clickedValue);
            }

            this.dispatchEvent(new CustomEvent('optionschange', { detail: this.selectedOptions }));
        }
    }
}