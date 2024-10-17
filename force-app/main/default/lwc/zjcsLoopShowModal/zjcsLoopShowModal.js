import { LightningElement, track  } from 'lwc';

export default class ZjcsLoopShowModal extends LightningElement {
    @track ObjectList = [
        { id: '1', name: 'Item 1', key: 'Key 1', note: 'Note 1' },
        { id: '2', name: 'Item 2', key: 'Key 2', note: 'Note 2' },
        { id: '3', name: 'Item 3', key: 'Key 3', note: 'Note 3' },
        { id: '4', name: 'Item 4', key: 'Key 4', note: 'Note 4' }
    ];
    @track showModal = false;
    @track selectedItem;
    @track selectedItemName;
    @track selectedItemKey;
    @track selectedItemNote;

    handleViewDetails(event) {
        const selectedId = event.target.dataset.id;
        console.log('$$$$$$ selectedId: ' + selectedId);
        this.selectedItem = this.ObjectList.find(item => item.id === selectedId);
        console.log('$$$$$$ this.selectedItem: ' + this.selectedItem);
        this.selectedItemName = this.selectedItem.name;
        this.selectedItemKey = this.selectedItem.key;
        this.selectedItemNote = this.selectedItem.note;
        this.showModal = true;
        console.log('$$$$$$ this.showModal: ' + this.showModal);
        console.log('$$$$$$ this.selectedItemName: ' + this.selectedItemName);
        console.log('$$$$$$ this.selectedItemKey: ' + this.selectedItemKey);
        console.log('$$$$$$ this.selectedItemNote: ' + this.selectedItemNote);
    }

    handleTextareaChange(event) {
        // Update selectedItemName on textarea value change
        this.selectedItemName = event.target.value;
    }

    handleConfirmSelect(event) {
        // Update ObjectList with the new name value from textarea
        const updatedObjectList = this.ObjectList.map(item => {
            if (item.id === this.selectedItem.id) {
                return { ...item, name: this.selectedItemName };
            }
            return item;
        });

        this.ObjectList = JSON.parse(JSON.stringify(updatedObjectList));
        console.log('$$$$$$ this.ObjectList: ' + JSON.stringify(this.ObjectList));
        this.showModal = false;
    }

    closeModal() {
        this.showModal = false;
    }
}