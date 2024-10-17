import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LightningFileUpload extends LightningElement {

    @api recordId;
    get acceptedFormats() {
        return ['.png', '.PNG', '.jpg', '.JPG', '.pdf', '.PDF'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.showNotification(uploadedFiles.length + ' files are Uploaded Successfully', 'success');
    }

    showNotification(message, variant) {
        const evt = new ShowToastEvent({
            'message': message,
            'variant': variant
        });
        this.dispatchEvent(evt);
    }
}