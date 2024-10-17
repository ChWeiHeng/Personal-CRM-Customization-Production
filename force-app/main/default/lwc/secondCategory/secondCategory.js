import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getProductListByCategoryName from '@salesforce/apex/SecondCategoryController.getProductListByCategoryName';

export default class SecondCategory extends NavigationMixin(LightningElement) {

    productList; // 存放商品信息
    popWindowFlag = false; // 按钮点击时打开弹窗标识
    insertWechatName; // form表单中Name预填充值
    insertWechatPrice; // form表单中Price预填充值
    insertWechatTextArea; // form表单中TextArea预填充值
    insertWechatUserTextArea; // form表单中UserTextArea预填充值

    categoryList = [ // 存放分类信息
        {
            Id: 1,
            Name: 'Guitar'
        },
        {
            Id: 2,
            Name: 'Bass'
        },
        {
            Id: 3,
            Name: 'Drum'
        },
        {
            Id: 4,
            Name: 'Piano'
        },
        {
            Id: 5,
            Name: 'HeadPhone'
        },
        {
            Id: 6,
            Name: 'Effector'
        },
        {
            Id: 7,
            Name: 'Amp'
        },
        {
            Id: 8,
            Name: 'Accessory'
        },
        {
            Id: 9,
            Name: 'Case'
        },
        {
            Id: 10,
            Name: 'Other'
        }
    ];

    // 根据分类显示不同的商品信息
    navagateToCategoryList(event) {
        let categoryName = event.target.title;
        // dispatch method get data
        getProductListByCategoryName({categoryName: categoryName})
        .then(
            result => {
                this.productList = result;
            }
        )
        .catch(
            this.productList = []
        )

    }

    // 点击按钮填充Wechat对象预设值
    createPromotion(event) {
        const productId = event.target.title;
        this.popWindowFlag = true;
        this.productList.forEach(element => {
            if(element.Id == productId) {
                this.insertWechatName = element.Name;
                this.insertWechatPrice = element.ProductPrice__c;
                this.insertWechatTextArea = element.ProductImage__c;
                this.insertWechatUserTextArea = element.ProductIntroduce__c;
            }
        });
    }

    // 关闭弹窗
    closeModal() {
        this.popWindowFlag = false;
    }

    // 点击按钮添加Wechat对象数据
    insertWeChatData(event) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        // this.popWindowFlag = false;
        // window.location.reload();
    }

    // 添加成功后跳转至记录详细页面
    handleSuccess(event) {
        let Id = event.detail.id;
        console.log('Id',Id);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: Id,
                objectApiName: 'WeChat__c',
                actionName: 'view'
            }
        });
    }

}