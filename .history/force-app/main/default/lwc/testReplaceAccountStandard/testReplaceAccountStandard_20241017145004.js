import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class TestReplaceAccountStandard extends NavigationMixin(LightningElement) {
    @track fields = [];
    @track isModalOpen = true; // 控制模态框的开关
    @track isLoading = true; // 初始化为 true，表明正在加载
    formLoaded = false;  // 用于防止多次触发 onload

    @track activeSections = ['basicInfo', 'financialInfo', 'contactInfo', 'thirdPartyIntegration'];

    @track annualRevenue = 0;
    inboundEmailsCount = 0; // Obc-1 输入值
    inboundEmailsEffort = 0; // Obc-2 输入值

    @track hasErrors = false; // 表示是否有错误
    @track showErrorModal = false; // 错误模态框的显示状态
    @track errors = []; // 存储错误信息

    connectedCallback() {
        // 在组件初始化时记录用户的记录类型ID
        const urlParams = new URLSearchParams(window.location.search);
        this.recordTypeId = urlParams.get('recordTypeId');
    }

    // 处理字段变更
    handleFieldChange(event) {
        const fieldName = event.target.fieldName;
        const fieldValue = event.target.value;

        if (fieldName === 'REVGRD__Inbound_Emails_Count__c') {
            this.inboundEmailsCount = fieldValue ? Number(fieldValue) : 0;
        } else if (fieldName === 'REVGRD__Inbound_Emails_Effort__c') {
            this.inboundEmailsEffort = fieldValue ? Number(fieldValue) : 0;
        }

        // 实时计算 AnnualRevenue
        this.calculateAnnualRevenue();
    }

    // 计算 AnnualRevenue，处理空值情况
    calculateAnnualRevenue() {
        // 确保字段为空时的计算
        const count = this.inboundEmailsCount || 0;  // 若为空，则设为 0
        const effort = this.inboundEmailsEffort || 0; // 若为空，则设为 0
        this.annualRevenue = (count + effort) * 1.397;  // 根据有效值计算
    }

    // 获取 Account 对象的字段定义
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    handleObjectInfo({ data, error }) {
        if (data) {
            this.fields = Object.keys(data.fields);
        }
    }

    closeModal() {
        this.isModalOpen = false; // 关闭模态框

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        });
    }

    handleSave(event) {
        console.log('$$$$$$$ 保存步骤1');
        event.preventDefault(); // 阻止默认提交行为
        this.errors = []; // 清空之前的错误信息
        this.hasErrors = false; // 重置错误状态

        // 验证字段逻辑
        const fields = this.template.querySelectorAll('lightning-input-field');
        console.log('$$$$$$$ fields: ' + fields);
        fields.forEach(field => {
            const fieldName = field.fieldName;
            const value = field.value;

            // 简单的验证示例：如果字段值为空，记录错误
            if (!value) {
                this.errors.push({ fieldName, message: `字段 ${fieldName} 不能为空` });
                this.hasErrors = true; // 标记有错误
            }
        });
        console.log('$$$$$$$ 保存步骤2');

        // 如果有错误，显示错误模态
        if (this.hasErrors) {
            this.showErrorModal = true; // 显示错误模态
            return; // 如果有错误，停止执行后续逻辑
        }

        console.log('$$$$$$$ 保存步骤3');
        // 如果没有错误，调用表单的 submit 方法
        try {
            const recordEditForm = this.template.querySelector('lightning-record-edit-form');
            console.log('$$$$$$$ recordEditForm: ' + recordEditForm);
            if (recordEditForm) {
                recordEditForm.submit();
            } else {
                throw new Error('Form element not found');
            }
        } catch (error) {
            console.error('提交表单时出错:', error);
            this.isLoading = false; 
            this.showToast('错误', '提交表单时出错，请重试。', 'error');
        }
    }

    handleCloseModal() {
        this.showErrorModal = false; // 关闭模态
    }

    handleErrorSelect(event) {
        const fieldName = event.detail.fieldName;
        const field = this.template.querySelector(`[data-id="${fieldName}"]`);
        if (field) {
            field.focus(); // 定位到指定字段
        }
    }

    // handleSave(event) {
    //     this.isLoading = true; // 显示加载效果

    //     // 在提交之前调用自定义验证方法
    //     const validationResult = this.validateFields();
    //     console.log('$$$$$$ validationResult: ' + JSON.stringify(validationResult));
    //     if (!validationResult) {
    //         this.isLoading = false; // 验证失败时隐藏加载效果
    //         this.scrollToTop(); // 滚动到页面顶部
    //         return; // 退出，防止提交
    //     }

    //     try {
    //         const recordEditForm = this.template.querySelector('lightning-record-edit-form');
    //         if (recordEditForm) {
    //             recordEditForm.submit();
    //         } else {
    //             throw new Error('Form element not found');
    //         }
    //     } catch (error) {
    //         console.error('提交表单时出错:', error);
    //         this.isLoading = false; 
    //         this.showToast('错误', '提交表单时出错，请重试。', 'error');
    //     }
    // }

    validateFields() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('lightning-input-field');

        // 清除先前的错误消息
        inputFields.forEach(inputField => {
            inputField.reportValidity(); // 报告有效性以清除消息
        });

        inputFields.forEach(inputField => {
            if (!inputField.reportValidity()) {
                isValid = false; // 只要有一个字段无效，整体标记为无效
            }
        });

        return isValid; // 返回验证结果
    }

    scrollToTop() {
        console.log('Attempting to scroll to top');
        const contentTop = this.template.querySelector('.slds-modal__content');
        console.log('$$$$$$ contentTop: ' + JSON.stringify(contentTop));
        if (contentTop) {
            console.log('Scrolling into view');
            contentTop.scrollTop = 0;  // 强制将滚动条设置为顶部
        } else {
            console.error('Top contentTop not found');
        }
    }

    handleFormLoad() {
        // 当表单加载完成时触发，关闭加载状态
        this.isLoading = false;
    }

    handleSuccess(event) {
        this.isLoading = false; // 隐藏加载效果
        const recordId = event.detail.id; // 获取新创建记录的 ID
        this.showToast('成功', '客户记录已成功创建！', 'success');
        
        // 跳转到新创建的记录页面
        this.navigateToRecord(recordId);

        // 关闭模态框
        this.isModalOpen = false; 
    }

    handleError(event) {
        console.error('$$$$$$ 表单提交后的捕获错误');
        try {
            // 捕获潜在的错误并记录详细信息
            console.error('保存记录时出错:', event.detail);
            this.showToast('错误', '保存记录时出错，请重试。', 'error');
        } catch (error) {
            // 捕捉任何意外错误并记录
            console.error('处理保存错误时出现异常:', error);
            this.showToast('错误', '处理保存错误时出错。', 'error');
        } finally {
            // 确保加载条关闭
            this.isLoading = false;
        }
    }

    handleShowErrors() {
        this.showErrorModal = !this.showErrorModal; // 切换错误显示
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(evt);
    }

    navigateToRecord(recordId) {
        console.log('$$$$$$ recordId: ' + recordId);
        if (recordId) { // 检查记录 ID 是否存在
            try {
                // 使用 Lightning Navigation API 跳转到新记录页面
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: recordId,
                        objectApiName: 'Account', // 目标对象 API 名称
                        actionName: 'view' // 动作类型
                    }
                });
            } catch (error) {
                console.error('导航到记录页面时出错:', error); // 打印错误信息
                this.showToast('错误', '无法导航到新记录页面，请重试。', 'error'); // 显示错误提示
            }
        } else {
            console.error('记录 ID 无效，无法导航到新记录页面。');
        }
    }
    
    handleUploadFinished(event) {
        // 获取上传完成的文件
        const uploadedFiles = event.detail.files;
        if (uploadedFiles.length > 0) {
            this.convertFileToBase64(uploadedFiles[0]);
        }
    }

    convertFileToBase64(file) {
        // const mimeType = file.type;
        // console.log('$$$$$$ file type: ' + mimeType);
        const reader = new FileReader();
        reader.onloadend = () => {
            // 读取文件为Base64
            const base64Data = reader.result.split(',')[1];
            this.uploadToAWS(base64Data);
        };
        reader.readAsDataURL(file);
    }

    uploadToAWS(base64Data) {
        // 将Base64编码的数据传递到服务器或AWS
        // 调用Apex或者直接发送HTTP请求到AWS
        console.log('Base64 Encoded Data: ', base64Data);
    }
}