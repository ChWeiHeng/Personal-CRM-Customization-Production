import { LightningElement } from 'lwc';

export default class Display extends LightningElement {
  counter = 0;
  augmentor = 1;

  get options() {
    return [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ];
  }
  
  handleAugmentorChange(event) {
    this.augmentor = event.target.value;
  }

  handleIncrement(event) {
    const operand = event.detail;
    this.counter += operand;
  }
  
  handleDecrement(event) {
    const operand = event.detail;
    this.counter -= operand;
  }

  clickCreateItem(component, event, helper) {
    var validItem = component.find('itemform').reduce(function (validSoFar, inputCmp) {
			// 显示无效的错误信息fields
			inputCmp.showHelpMessageIfInvalid();
			return validSoFar && inputCmp.get('v.validity').valid;
		}, true);
		
		if(validItem) {
			// 创建新项目
			var newItem = component.get("v.newItem");
			console.log("创建项目: " + JSON.stringify(newItem));
			var allItems = component.get("v.items");
			component.set("v.items", allItems);
			newItem = {
				'sobjectType': 'Camping_Item__c',
				'Quantity__c': 0,
				'Price__c': 0
			};
			component.set("v.newItem", newItem);
		}
  }
}