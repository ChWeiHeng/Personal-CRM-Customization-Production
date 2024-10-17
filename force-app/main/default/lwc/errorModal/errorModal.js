import { LightningElement, api } from 'lwc';

export default class ErrorModal extends LightningElement {
    @api errors;

    handleClose() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent); // 关闭模态事件
    }

    handleErrorClick(event) {
        const fieldName = event.target.dataset.fieldName; // 获取字段名
        // 发送自定义事件，将字段名传递回父组件
        const errorClickEvent = new CustomEvent('errorclick', {
            detail: { fieldName }
        });
        this.dispatchEvent(errorClickEvent);
    }
}