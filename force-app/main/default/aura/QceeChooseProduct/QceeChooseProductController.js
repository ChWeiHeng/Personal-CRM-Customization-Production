({
  /*
   * init method
   * */
  doInit: function (component, event, helper) {
    helper.getProducts(component, helper);
  },

  /*
   * selected product data pagination
   * */
  onNext: function (component, event, helper) {
    var pageNumber = component.get("v.currentPageNumber");
    console.log("pageNumber: ", pageNumber);
    component.set("v.currentPageNumber", pageNumber + 1);
    helper.buildData(component, helper);
  },

  onPrev: function (component, event, helper) {
    var pageNumber = component.get("v.currentPageNumber");
    component.set("v.currentPageNumber", pageNumber - 1);
    helper.buildData(component, helper);
  },

  processMe: function (component, event, helper) {
    component.set("v.currentPageNumber", parseInt(event.target.name));
    helper.buildData(component, helper);
  },

  onFirst: function (component, event, helper) {
    component.set("v.currentPageNumber", 1);
    helper.buildData(component, helper);
  },

  onLast: function (component, event, helper) {
    component.set("v.currentPageNumber", component.get("v.totalPages"));
    helper.buildData(component, helper);
  },

  /*
   * selected product data pagination
   * */
  onSelNext: function (component, event, helper) {
    var selPageNumber = component.get("v.selProCurrentPageNumber");
    component.set("v.selProCurrentPageNumber", selPageNumber + 1);
    helper.buildSelectedProductData(component, helper);
  },

  onSelPrev: function (component, event, helper) {
    var selPageNumber = component.get("v.selProCurrentPageNumber");
    component.set("v.selProCurrentPageNumber", selPageNumber - 1);
    helper.buildSelectedProductData(component, helper);
  },

  selProcessMe: function (component, event, helper) {
    component.set("v.selProCurrentPageNumber", parseInt(event.target.name));
    helper.buildSelectedProductData(component, helper);
  },

  onSelFirst: function (component, event, helper) {
    component.set("v.selProCurrentPageNumber", 1);
    helper.buildSelectedProductData(component, helper);
  },

  onSelLast: function (component, event, helper) {
    component.set("v.selProCurrentPageNumber", component.get("v.selProTotalPages"));
    console.log('select accessory selProCurrentPageNumber: ', component.get("v.selProCurrentPageNumber"));
    console.log('select accessory selProTotalPages: ', component.get("v.selProTotalPages"));
    helper.buildSelectedProductData(component, helper);
  },

  /*
   * selected accessory data pagination
   * */
  onSelAccNext: function (component, event, helper) {
    var selPageNumber = component.get("v.selAccCurrentPageNumber");
    component.set("v.selAccCurrentPageNumber", selPageNumber + 1);
    helper.buildSelectedAccessoryData(component, helper);
  },

  onSelAccPrev: function (component, event, helper) {
    var selPageNumber = component.get("v.selAccCurrentPageNumber");
    component.set("v.selAccCurrentPageNumber", selPageNumber - 1);
    helper.buildSelectedAccessoryData(component, helper);
  },

  selAccProcessMe: function (component, event, helper) {
    component.set("v.selAccCurrentPageNumber", parseInt(event.target.name));
    helper.buildSelectedAccessoryData(component, helper);
  },

  onSelAccFirst: function (component, event, helper) {
    component.set("v.selAccCurrentPageNumber", 1);
    helper.buildSelectedAccessoryData(component, helper);
  },

  onSelAccLast: function (component, event, helper) {
    component.set("v.selAccCurrentPageNumber",component.get("v.selAccTotalPages"));
    console.log('select accessory selAccCurrentPageNumber: ', component.get("v.selAccCurrentPageNumber"));
    console.log('select accessory selAccTotalPages: ', component.get("v.selAccTotalPages"));
    helper.buildSelectedAccessoryData(component, helper);
  },

  /*
   * query data by search param
   * */
  queryDataBySearchParam: function (component, event, helper) {
    helper.getProducts(component, helper);
  },

  /*
   * add product data to selected list
   * */
  addProDataToTemporaryList: function (component, event, helper) {
    helper.addProductItemToTemporaryList(component, event, helper);
  },

  /*
   * del product data to selected list
   * */
  delProDataToTemporaryList: function (component, event, helper) {
    helper.delProductItemToTemporaryList(component, event, helper);
  },

  /*
   * add accessory data to selected list
   * */
  addAccDataToTemporaryList: function (component, event, helper) {
    helper.addAccessoryToTemporaryList(component, event, helper);
  },

  /*
   * del accessory data to selected list
   * */
  delAccDataToTemporaryList: function (component, event, helper) {
    helper.delAccessoryToTemporaryList(component, event, helper);
  },

  /*
   * link id to show detail
   * */
  linkProductDetailPage: function (component, event, helper) {
    console.log("event.Name: ", event.currentTarget.getAttribute("name"));
    var recordId = event.currentTarget.getAttribute("name");
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      recordId: recordId,
    });
    navEvt.fire();
  },

  /*
   * show data detail (open new window)
   * */
  linkProductDetailPageByNewWindow: function (component, event, helper) {
    var navService = component.find("navService");
    var recordId = event.currentTarget.getAttribute("name");
    var pageReference = {
      type: "standard__recordPage",
      attributes: {
        recordId: recordId,
        actionName: "view",
      },
    };
    navService.generateUrl(pageReference).then(
      $A.getCallback(function (url) {
        console.log("success: " + url);
        window.open(url, "_blank");
      }),
      $A.getCallback(function (error) {
        console.log("error: " + error);
      })
    );
  },

  /*
   * calculate product sales product price
   * */
  calculateProSalesPrice: function (component, event, helper) {
    var currentProSalesPrice = component.get("v.proSalesTotalPrice");
    console.log("currentProSalesPrice: ", currentProSalesPrice);
    var proSalesPriceParam = event.getSource().get("v.value");
    var proSalesPrice;
    console.log("proSalesPrice: ", proSalesPrice);
    var proSalesId = event.getSource().get("v.accesskey");
    console.log("proSalesId: ", proSalesId);
    console.log("proSales detail: ", event.getSource());

    var proPreAndCurPriceList = component.get(
      "v.proPreviousAndCurrentPriceList"
    );
    console.log("proPreAndCurPriceList: ", proPreAndCurPriceList);
    console.log("proPreAndCurPriceList.length: ", proPreAndCurPriceList.length);
    console.log("proSalesPriceParam: ", proSalesPriceParam);
    if (isNaN(proSalesPriceParam) || $A.util.isUndefinedOrNull(proSalesPriceParam)) {
      return;
    } else {
      if (proSalesPriceParam == '') {
        proSalesPrice = 0;
      } else {
        proSalesPrice = parseInt(proSalesPriceParam);
      }
    }
    if (proPreAndCurPriceList.length == 0) {
      proPreAndCurPriceList = [];
      var selectParam = {};
      selectParam.Id = proSalesId;
      selectParam.oldPrice = proSalesPrice;
      selectParam.newPrice = proSalesPrice;
      console.log("selectParam: ", selectParam);
      proPreAndCurPriceList.push(selectParam);
      console.log("proPreAndCurPriceList222: ", proPreAndCurPriceList);
      component.set(
        "v.proSalesTotalPrice",
        Math.ceil(currentProSalesPrice + proSalesPrice)
      );
      component.set("v.proPreviousAndCurrentPriceList", proPreAndCurPriceList);
    } else {
      var dataFlag = false;
      for (var i = 0; i < proPreAndCurPriceList.length; i++) {
        if (proSalesId == proPreAndCurPriceList[i].Id) {
          dataFlag = true;
        }
      }
      console.log("dataFlag: ", dataFlag);
      if (dataFlag) {
        for (var i = 0; i < proPreAndCurPriceList.length; i++) {
          console.log("proSalesId: ", proSalesId);
          console.log(
            "proPreAndCurPriceList[i].Id: ",
            proPreAndCurPriceList[i].Id
          );
          if (proSalesId == proPreAndCurPriceList[i].Id) {
            currentProSalesPrice =
              currentProSalesPrice -
              proPreAndCurPriceList[i].oldPrice +
              proSalesPrice;
            console.log("currentProSalesPrice: ", currentProSalesPrice);
            proPreAndCurPriceList[i].Id = proSalesId;
            proPreAndCurPriceList[i].oldPrice = proSalesPrice;
            proPreAndCurPriceList[i].newPrice = proSalesPrice;
            console.log("proPreAndCurPriceList: ", proPreAndCurPriceList);
            break;
          }
        }
        component.set("v.proSalesTotalPrice", Math.ceil(currentProSalesPrice));
        component.set(
          "v.proPreviousAndCurrentPriceList",
          proPreAndCurPriceList
        );
      } else {
        var selectParamT = {};
        var selectPriceList = [];
        var finalPriceList = [];
        currentProSalesPrice = currentProSalesPrice + proSalesPrice;
        console.log("currentProSalesPrice222: ", currentProSalesPrice);
        selectParamT.Id = proSalesId;
        selectParamT.oldPrice = proSalesPrice;
        selectParamT.newPrice = proSalesPrice;
        console.log("selectParamT: ", selectParamT);
        selectPriceList.push(selectParamT);
        finalPriceList = proPreAndCurPriceList.concat(selectPriceList);
        console.log("selectPriceList: ", selectPriceList);
        console.log("finalPriceList: ", finalPriceList);
        component.set("v.proSalesTotalPrice", Math.ceil(currentProSalesPrice));
        component.set("v.proPreviousAndCurrentPriceList", finalPriceList);
      }
    }
  },

  /*
   * calculate accessory sales product price
   * */
  calculateAccSalesPrice: function (component, event, helper) {
    var currentAccSalesPrice = parseInt(component.get("v.accSalesTotalPrice"));
    console.log("currentAccSalesPrice: ", currentAccSalesPrice);
    var accSalesPriceParam = event.getSource().get("v.value");
    var accSalesPrice;
    console.log("accSalesPriceParam: ", accSalesPriceParam);
    var accSalesId = event.getSource().get("v.accesskey");
    console.log("accSalesId: ", accSalesId);

    var accPreAndCurPriceList = component.get(
      "v.accPreviousAndCurrentPriceList"
    );
    console.log("accPreAndCurPriceList: ", accPreAndCurPriceList);
    console.log("accPreAndCurPriceList.length: ", accPreAndCurPriceList.length);
    if (isNaN(accSalesPriceParam) || $A.util.isUndefinedOrNull(accSalesPriceParam)) {
      return;
    } else {
      if (accSalesPriceParam == '') {
        accSalesPrice = 0;
      } else {
        accSalesPrice = parseInt(accSalesPriceParam);
      }
    }
    if (accPreAndCurPriceList.length == 0) {
      accPreAndCurPriceList = [];
      var selectParam = {};
      selectParam.Id = accSalesId;
      selectParam.oldPrice = accSalesPrice;
      selectParam.newPrice = accSalesPrice;
      console.log("selectParam: ", selectParam);
      accPreAndCurPriceList.push(selectParam);
      console.log("accPreAndCurPriceList222: ", accPreAndCurPriceList);
      component.set(
        "v.accSalesTotalPrice",
        Math.ceil(currentAccSalesPrice + accSalesPrice)
      );
      component.set("v.accPreviousAndCurrentPriceList", accPreAndCurPriceList);
    } else {
      var dataFlag = false;
      for (var i = 0; i < accPreAndCurPriceList.length; i++) {
        if (accSalesId == accPreAndCurPriceList[i].Id) {
          dataFlag = true;
        }
      }
      console.log("dataFlag: ", dataFlag);
      if (dataFlag) {
        for (var i = 0; i < accPreAndCurPriceList.length; i++) {
          console.log("accSalesId: ", accSalesId);
          console.log(
            "accPreAndCurPriceList[i].Id: ",
            accPreAndCurPriceList[i].Id
          );
          if (accSalesId == accPreAndCurPriceList[i].Id) {
            currentAccSalesPrice =
              currentAccSalesPrice -
              accPreAndCurPriceList[i].oldPrice +
              accSalesPrice;
            console.log("currentAccSalesPrice: ", currentAccSalesPrice);
            accPreAndCurPriceList[i].Id = accSalesId;
            accPreAndCurPriceList[i].oldPrice = accSalesPrice;
            accPreAndCurPriceList[i].newPrice = accSalesPrice;
            console.log("accPreAndCurPriceList: ", accPreAndCurPriceList);
            break;
          }
        }
        component.set("v.accSalesTotalPrice", Math.ceil(currentAccSalesPrice));
        component.set(
          "v.accPreviousAndCurrentPriceList",
          accPreAndCurPriceList
        );
      } else {
        var selectParamT = {};
        var selectPriceList = [];
        var finalPriceList = [];
        currentAccSalesPrice = currentAccSalesPrice + accSalesPrice;
        console.log("currentAccSalesPrice222: ", currentAccSalesPrice);
        selectParamT.Id = accSalesId;
        selectParamT.oldPrice = accSalesPrice;
        selectParamT.newPrice = accSalesPrice;
        console.log("selectParamT: ", selectParamT);
        selectPriceList.push(selectParamT);
        finalPriceList = accPreAndCurPriceList.concat(selectPriceList);
        console.log("selectPriceList: ", selectPriceList);
        console.log("finalPriceList: ", finalPriceList);
        component.set("v.accSalesTotalPrice", Math.ceil(currentAccSalesPrice));
        component.set("v.accPreviousAndCurrentPriceList", finalPriceList);
      }
    }
  },

  /*
   * calculate product quantity
   * */
  calculateProQuantity: function(component, event, helper) {
    var currentProSalesQuantity = component.get("v.proSalesTotalQuantity");
    console.log("currentProSalesQuantity: ", currentProSalesQuantity);
    var proSalesQuantityParam = event.getSource().get("v.value");
    var proSalesQuantity;
    console.log("proSalesQuantity: ", proSalesQuantity);
    var proSalesId = event.getSource().get("v.accesskey");
    console.log("proSalesId: ", proSalesId);
    console.log("proSales detail: ", event.getSource());

    var proPreAndCurQuantityList = component.get(
      "v.proPreviousAndCurrentQuantityList"
    );
    console.log("proPreAndCurQuantityList: ", proPreAndCurQuantityList);
    console.log("proPreAndCurQuantityList.length: ", proPreAndCurQuantityList.length);
    if (isNaN(proSalesQuantityParam) || $A.util.isUndefinedOrNull(proSalesQuantityParam)) {
      return;
    } else {
      if (proSalesQuantityParam == '') {
        proSalesQuantity = 0;
      } else {
        proSalesQuantity = parseInt(proSalesQuantityParam);
      }
    }
    if (proPreAndCurQuantityList.length == 0) {
      proPreAndCurQuantityList = [];
      var selectParam = {};
      selectParam.Id = proSalesId;
      selectParam.oldQuantity = proSalesQuantity;
      selectParam.newQuantity = proSalesQuantity;
      console.log("selectParam: ", selectParam);
      proPreAndCurQuantityList.push(selectParam);
      console.log("proPreAndCurQuantityList222: ", proPreAndCurQuantityList);
      component.set(
        "v.proSalesTotalQuantity",
        Math.ceil(currentProSalesQuantity + proSalesQuantity)
      );
      component.set("v.proPreviousAndCurrentQuantityList", proPreAndCurQuantityList);
    } else {
      var dataFlag = false;
      for (var i = 0; i < proPreAndCurQuantityList.length; i++) {
        if (proSalesId == proPreAndCurQuantityList[i].Id) {
          dataFlag = true;
        }
      }
      console.log("dataFlag: ", dataFlag);
      if (dataFlag) {
        for (var i = 0; i < proPreAndCurQuantityList.length; i++) {
          console.log("proSalesId: ", proSalesId);
          console.log(
            "proPreAndCurQuantityList[i].Id: ",
            proPreAndCurQuantityList[i].Id
          );
          if (proSalesId == proPreAndCurQuantityList[i].Id) {
            currentProSalesQuantity =
            currentProSalesQuantity -
            proPreAndCurQuantityList[i].oldQuantity +
              proSalesQuantity;
            console.log("currentProSalesQuantity: ", currentProSalesQuantity);
            proPreAndCurQuantityList[i].Id = proSalesId;
            proPreAndCurQuantityList[i].oldQuantity = proSalesQuantity;
            proPreAndCurQuantityList[i].newQuantity = proSalesQuantity;
            console.log("proPreAndCurQuantityList: ", proPreAndCurQuantityList);
            break;
          }
        }
        component.set("v.proSalesTotalQuantity", Math.ceil(currentProSalesQuantity));
        component.set(
          "v.proPreviousAndCurrentQuantityList",
          proPreAndCurQuantityList
        );
      } else {
        var selectParamT = {};
        var selectQuantityList = [];
        var finalQuantityList = [];
        currentProSalesQuantity = currentProSalesQuantity + proSalesQuantity;
        console.log("currentProSalesQuantity222: ", currentProSalesQuantity);
        selectParamT.Id = proSalesId;
        selectParamT.oldQuantity = proSalesQuantity;
        selectParamT.newQuantity = proSalesQuantity;
        console.log("selectParamT: ", selectParamT);
        selectQuantityList.push(selectParamT);
        finalQuantityList = proPreAndCurQuantityList.concat(selectQuantityList);
        console.log("selectQuantityList: ", selectQuantityList);
        console.log("finalQuantityList: ", finalQuantityList);
        component.set("v.proSalesTotalQuantity", Math.ceil(currentProSalesQuantity));
        component.set("v.proPreviousAndCurrentQuantityList", finalQuantityList);
      }
    }
  },

  /*
   * calculate accessory quantity
   * */
  calculateAccQuantity: function(component, event, helper) {
    var currentAccSalesQuantity = parseInt(component.get("v.accSalesTotalQuantity"));
    console.log("currentAccSalesQuantity: ", currentAccSalesQuantity);
    var accSalesQuantityParam = event.getSource().get("v.value");
    var accSalesQuantity;
    console.log("accSalesQuantityParam: ", accSalesQuantityParam);
    var accSalesId = event.getSource().get("v.accesskey");
    console.log("accSalesId: ", accSalesId);

    var accPreAndCurQuantityList = component.get(
      "v.accPreviousAndCurrentQuantityList"
    );
    console.log("accPreAndCurQuantityList: ", accPreAndCurQuantityList);
    console.log("accPreAndCurQuantityList.length: ", accPreAndCurQuantityList.length);
    if (isNaN(accSalesQuantityParam) || $A.util.isUndefinedOrNull(accSalesQuantityParam)) {
      return;
    } else {
      if (accSalesQuantityParam == '') {
        accSalesQuantity = 0;
      } else {
        accSalesQuantity = parseInt(accSalesQuantityParam);
      }
    }
    if (accPreAndCurQuantityList.length == 0) {
      accPreAndCurQuantityList = [];
      var selectParam = {};
      selectParam.Id = accSalesId;
      selectParam.oldQuantity = accSalesQuantity;
      selectParam.newQuantity = accSalesQuantity;
      console.log("selectParam: ", selectParam);
      accPreAndCurQuantityList.push(selectParam);
      console.log("accPreAndCurQuantityList222: ", accPreAndCurQuantityList);
      component.set(
        "v.accSalesTotalQuantity",
        Math.ceil(currentAccSalesQuantity + accSalesQuantity)
      );
      component.set("v.accPreviousAndCurrentQuantityList", accPreAndCurQuantityList);
    } else {
      var dataFlag = false;
      for (var i = 0; i < accPreAndCurQuantityList.length; i++) {
        if (accSalesId == accPreAndCurQuantityList[i].Id) {
          dataFlag = true;
        }
      }
      console.log("dataFlag: ", dataFlag);
      if (dataFlag) {
        for (var i = 0; i < accPreAndCurQuantityList.length; i++) {
          console.log("accSalesId: ", accSalesId);
          console.log(
            "accPreAndCurQuantityList[i].Id: ",
            accPreAndCurQuantityList[i].Id
          );
          if (accSalesId == accPreAndCurQuantityList[i].Id) {
            currentAccSalesQuantity =
            currentAccSalesQuantity -
            accPreAndCurQuantityList[i].oldQuantity +
              accSalesQuantity;
            console.log("currentAccSalesQuantity: ", currentAccSalesQuantity);
            accPreAndCurQuantityList[i].Id = accSalesId;
            accPreAndCurQuantityList[i].oldQuantity = accSalesQuantity;
            accPreAndCurQuantityList[i].newQuantity = accSalesQuantity;
            console.log("accPreAndCurQuantityList: ", accPreAndCurQuantityList);
            break;
          }
        }
        component.set("v.accSalesTotalQuantity", Math.ceil(currentAccSalesQuantity));
        component.set(
          "v.accPreviousAndCurrentQuantityList",
          accPreAndCurQuantityList
        );
      } else {
        var selectParamT = {};
        var selectQuantityList = [];
        var finalQuantityList = [];
        currentAccSalesQuantity = currentAccSalesQuantity + accSalesQuantity;
        console.log("currentAccSalesQuantity222: ", currentAccSalesQuantity);
        selectParamT.Id = accSalesId;
        selectParamT.oldQuantity = accSalesQuantity;
        selectParamT.newQuantity = accSalesQuantity;
        console.log("selectParamT: ", selectParamT);
        selectQuantityList.push(selectParamT);
        finalQuantityList = accPreAndCurQuantityList.concat(selectQuantityList);
        console.log("selectQuantityList: ", selectQuantityList);
        console.log("finalQuantityList: ", finalQuantityList);
        component.set("v.accSalesTotalQuantity", Math.ceil(currentAccSalesQuantity));
        component.set("v.accPreviousAndCurrentQuantityList", finalQuantityList);
      }
    }
  },

  /*
   * save product or accessory data
   * */
  saveProductOrAccessoryData: function(component, event, helper) {
    // save product or accessory data
    // 当所选类别为产品、附件时，点击保存 判断选择类型 根据类型保存对应的数据
  }
});