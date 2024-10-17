import { LightningElement, track} from 'lwc';
import { publish,createMessageContext,releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import lmsDemoMC from "@salesforce/messageChannel/LMSDemoWin__c";
export default class LMS_MessageSenderReceiverLWC extends LightningElement {
    @track _msg = '';
    @track receivedMessage = '';
    channel;
    context = createMessageContext();

    constructor() {
        super();
    }
   
    handleSubscribe() {
        const parentPage = this;
        this.channel = subscribe(this.context, lmsDemoMC, function (event){
            if (event != null) {
                const message = event.messageBody;
                const source = event.source;
                parentPage.receivedMessage = 'Message: ' + message + '. Sent From: ' + source;
            }
        });
    }

    handleUnsubscribe() {
        unsubscribe(this.channel);
    }

    handleChange(event) { 
        this._msg = event.target.value;
    }

    handleClick() {  
        const payload = {
            source: "Lightnign Web Component",
            messageBody: this._msg
        }; 
        publish(this.context, lmsDemoMC, payload);
    } 

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}