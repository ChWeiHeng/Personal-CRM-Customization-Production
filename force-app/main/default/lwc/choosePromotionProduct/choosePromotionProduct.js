import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getProductListByCategory from '@salesforce/apex/ChoosePromotionProductController.getProductListByCategory';

export default class ChoosePromotionProduct extends NavigationMixin(LightningElement) {

    productList; // 存放商品信息
    popWindowFlag = false; // 按钮点击时打开弹窗标识
    insertProductName; // form表单中产品名称预填充值
    insertProductPrice; // form表单中产品价格预填充值
    insertProductImage; // form表单中产品图片预填充值
    insertProductIntroduce; // form表单中产品描述预填充值

    categoryList = [ // 存放分类信息
        {
            Id: 1,
            Name: 'Guitar',
            CateFlag: false
        },
        {
            Id: 2,
            Name: 'Bass',
            CateFlag: false
        },
        {
            Id: 3,
            Name: 'Drum',
            CateFlag: false
        },
        {
            Id: 4,
            Name: 'Piano',
            CateFlag: false
        },
        {
            Id: 5,
            Name: 'HeadPhone',
            CateFlag: false
        },
        {
            Id: 6,
            Name: 'Effector',
            CateFlag: false
        },
        {
            Id: 7,
            Name: 'Amp',
            CateFlag: false
        },
        {
            Id: 8,
            Name: 'Accessory',
            CateFlag: false
        },
        {
            Id: 9,
            Name: 'Case',
            CateFlag: false
        },
        {
            Id: 10,
            Name: 'Other',
            CateFlag: false
        }
    ];

    // 根据分类显示不同的商品信息
    navagateToCategoryList(event) {
        let categoryName = event.target.title;
        // dispatch method get data
        getProductListByCategory({categoryName: categoryName})
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
    createPromotionProduct(event) {
        const productId = event.target.title;
        this.popWindowFlag = true;
        this.productList.forEach(element => {
            if(element.Id == productId) {
                this.insertProductName = element.Name;
                this.insertProductPrice = element.ProductPrice__c;
                this.insertProductImage = element.ProductImage__c;
                this.insertProductIntroduce = element.Description;
            }
        });
    }

    // 关闭弹窗
    closeModal() {
        this.popWindowFlag = false;
    }

    // 点击按钮添加Wechat对象数据
    insertWeChatData(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.popWindowFlag = false;
    }

    // 添加成功后跳转至记录详细页面
    handleSuccess(event) {
        let Id = event.detail.id;
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