import { LightningElement, wire, track, api } from "lwc";
import testToSaveChangeData from '@salesforce/apex/TestToParentTableController.testToSaveChangeData';

export default class TestToSearchAndShowModal extends LightningElement {
  @track selectedWechat;

  @track showConfirmationDialog;
  @api testValue;

  // connectedCallback() {
  //   this.testValue = 'a082w00000XRsDDAA1';
  // }

  handleWechatSelection(event) {
    const selected = event.detail.value;
    console.log('$$$$$$ selected: ' + selected);
    if (selected != '' && selected != null && selected != undefined) {
        console.log('$$$$$$ 选中状态: ');
        // if (confirm("确认选择此数据？")) {
        //     // 处理选中数据的逻辑
        //     // TODO: 执行逻辑，将选中的值放入显示框
            this.selectedWechat = event.target.value;
        //     console.log("The selected Wechat id is" + this.selectedWechat);
        // } else {
        //     // 返回上一级页面或执行其他操作
        //     // TODO: 返回上一级页面或执行其他操作
        //     this.selectedWechat = null;
        //     console.log("The selected Wechat id is" + null);
        //     return;
        // }

        this.showConfirmationDialog = true;
    } else if(selected == '' || selected == null || selected == undefined) {
        console.log('$$$$$$ 取消状态: ');
        return;
    }
  }

  handleConfirmation() {
    if (this.selectedWechat != null && this.selectedWechat != '' && this.selectedWechat != undefined) {
        let param = {
            CarId: '11111',
            WorkingDate: '2023-05-18',
            RecordType: '1件目'
        };
        // 保存操作
        this.showConfirmationDialog = false;
        testToSaveChangeData({paramStr: JSON.stringify(param)})
        .then(result => {
            if (result) {
                console.log('$$$$$$ Created Success');
            }
        })
        .catch(error => {
            console.log('$$$$$$ Created Faild : ' + JSON.stringify(error));
        })
    }
  }

  handleCancellation() {
    this.showConfirmationDialog = false;
  }
}