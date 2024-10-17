({
  /*
   * do init method
   * */
  getProducts: function (component, helper) {
    component.set("v.errMessages", []);
    console.log("helper.method!");
    var searchType = component.get("v.value");
    var param = component.get("v.searchParam");
    var action;
    console.log("param", param);

    var priceBookValueParam = component.get("v.priceBookValue");
    if($A.util.isUndefinedOrNull(priceBookValueParam)) {
      priceBookValueParam = "";
    }
    var productTypeValueParam = component.get("v.productTypeValue");
    if($A.util.isUndefinedOrNull(productTypeValueParam)) {
      productTypeValueParam = "";
    }
    var productModelValueParam = component.get("v.productModelValue");
    if($A.util.isUndefinedOrNull(productModelValueParam)) {
      productModelValueParam = "";
    }
    var accessoryTypeValueParam = component.get("v.accessoryTypeValue");
    if($A.util.isUndefinedOrNull(accessoryTypeValueParam)) {
      accessoryTypeValueParam = "";
    }
    var accessoryModelValueParam = component.get("v.accessoryModelValue");
    if($A.util.isUndefinedOrNull(accessoryModelValueParam)) {
      accessoryModelValueParam = "";
    }

    // judge type
    if (searchType == "product") {
      console.log("进入产品查询列表");
      action = component.get("c.queryDataByProductParam");
      // judge parameter
      if ($A.util.isUndefinedOrNull(param)) {
        action.setParam("searchParam", "");
      } else {
        action.setParam("searchParam", param);
      }
      action.setParam("priceBookParam", priceBookValueParam);
      action.setParam("productTypeParam", productTypeValueParam);
      action.setParam("productModelParam", productModelValueParam);
      action.setCallback(this, function (response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          var initProductList = response.getReturnValue();
          for (var i = 0; i < initProductList.length; i++) {
            initProductList[i].proSalesPrice = 0; // 设置手动输入的产品销售价格初始值
            initProductList[i].proSalesQuantity = 0; // 设置手动输入的产品所选数量初始值
          }
          component.set("v.allData", initProductList);
          console.log("response.getReturnValue(): ", response.getReturnValue());
          component.set("v.accDataPageSwitch", "close");
          component.set("v.selAccDataPageSwitch", "close");
          component.set("v.currentPageNumber", 1);
          var selPaginationData = component.get("v.selData");
          if ($A.util.isUndefinedOrNull(selPaginationData)) {
            selPaginationData = [];
          }
          var allProductData = component.get("v.allData");
          console.log("selPaginationData pro: ", selPaginationData);
          console.log("allProductData pro: ", allProductData);
          if (selPaginationData.length > 0) {
            console.log("one method");
            component.set("v.selProDataPageSwitch", "open");
            if (allProductData.length > 0) {
              component.set("v.proDataPageSwitch", "open");
            } else {
              component.set("v.proDataPageSwitch", "close");
            }
          } else {
            console.log("two method");
            component.set("v.selProDataPageSwitch", "close");
            if (allProductData.length > 0) {
              component.set("v.proDataPageSwitch", "open");
            } else {
              component.set("v.proDataPageSwitch", "close");
            }
          }
          helper.buildData(component, helper);
        }
      });
    } else {
      console.log("进入附件查询列表");
      action = component.get("c.queryDataByAccessoryParam");
      // judge parameter
      if ($A.util.isUndefinedOrNull(param)) {
        action.setParam("searchParam", "");
      } else {
        action.setParam("searchParam", param);
      }
      action.setParam("priceBookParam", priceBookValueParam);
      action.setParam("accessoryTypeParam", accessoryTypeValueParam);
      action.setParam("accessoryModelParam", accessoryModelValueParam);
      action.setCallback(this, function (response) {
        console.log('accessory response: ', response);
        var state = response.getState();
        if (state === "SUCCESS") {
          component.set(
            "v.totalPages",
            Math.ceil(
              response.getReturnValue().length / component.get("v.pageSize")
            )
          );
          var initAccessoryList = response.getReturnValue();
          for (var i = 0; i < initAccessoryList.length; i++) {
            initAccessoryList[i].accSalesPrice = 0; // 设置手动输入的附件销售价格初始值
            initAccessoryList[i].accSalesQuantity = 0; // 设置手动输入的附件所选数量初始值
          }
          component.set("v.allData", initAccessoryList);
          console.log("response.getReturnValue(): ", response.getReturnValue());
          component.set("v.proDataPageSwitch", "close");
          component.set("v.selProDataPageSwitch", "close");
          component.set("v.currentPageNumber", 1);
          var selAccPaginationData = component.get("v.selAccData");
          if ($A.util.isUndefinedOrNull(selAccPaginationData)) {
            selAccPaginationData = [];
          }
          var allAccessoryData = component.get("v.allData");;
          console.log("selAccPaginationData acc: ", selAccPaginationData);
          console.log("allAccessoryData acc: ", allAccessoryData);
          if (selAccPaginationData.length > 0) {
            console.log("one method");
            component.set("v.selAccDataPageSwitch", "open");
            if (allAccessoryData.length > 0) {
              component.set("v.accDataPageSwitch", "open");
            } else {
              component.set("v.accDataPageSwitch", "close");
            }
          } else {
            console.log("two method");
            component.set("v.selAccDataPageSwitch", "close");
            if (allAccessoryData.length > 0) {
              component.set("v.accDataPageSwitch", "open");
            } else {
              component.set("v.accDataPageSwitch", "close");
            }
          }
          helper.buildData(component, helper);
        }
      });
    }
    $A.enqueueAction(action);
  },

  /*
   * add product to temporary list
   * */
  addProductItemToTemporaryList: function (component, event, helper) {
    component.set("v.errMessages", []);
    var productItemId = event.currentTarget.getAttribute("data-id");
    console.log("productItemId: ", productItemId);
    var allProductList = component.get("v.allData");
    var selTemporaryPaginationList = component.get("v.selData");
    if ($A.util.isUndefinedOrNull(selTemporaryPaginationList)) {
      var selPaginationList = [];
    } else {
      var selPaginationList = selTemporaryPaginationList;
      var errMessages = [];
      for (var i = 0; i < selPaginationList.length; i++) {
        console.log("selPaginationList[i]: ", selPaginationList[i]);
        if (productItemId == selPaginationList[i].Id) {
          errMessages.push({ message: "不允许重复添加已存在的数据!" });
          component.set("v.errMessages", errMessages);
          return;
        }
      }
    }
    for (var i = 0; i < allProductList.length; i++) {
      console.log(
        "allProductList[i].Id: ",
        allProductList[i].Id == productItemId
      );
      if (allProductList[i].Id == productItemId) {
        selPaginationList.push(allProductList[i]);
        allProductList.splice(i, 1);
        break;
      }
    }
    // 计算产品成本价格
    var proCostPriceSum = 0;
    for (var i = 0; i < selPaginationList.length; i++) {
      if (!$A.util.isUndefinedOrNull(selPaginationList[i].ProductPrice__c)) {
        proCostPriceSum += selPaginationList[i].ProductPrice__c;
      }
    }
    component.set("v.proCostTotalPrice", proCostPriceSum);
    // set choose data to list
    component.set("v.selData", selPaginationList);
    component.set("v.allData", allProductList);
    if (selPaginationList.length > 0) {
      component.set("v.selProDataPageSwitch", "open");
      if (allProductList.length > 0) {
        component.set("v.proDataPageSwitch", "open");
      } else {
        component.set("v.proDataPageSwitch", "close");
      }
    } else {
      component.set("v.selProDataPageSwitch", "close");
      if (allProductList.length > 0) {
        component.set("v.proDataPageSwitch", "open");
      } else {
        component.set("v.proDataPageSwitch", "close");
      }
    }

    // get standard price by specified product id
    var action = component.get("c.queryPriceByPriceEntry");
    action.setParam("productId", productItemId);
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var selAllData = component.get("v.selData");
        component.set("v.priceEntry", response.getReturnValue());
        var productStandardPrice = component.get("v.priceEntry");
        var proStandardPriceSum = component.get("v.proStandardTotalPrice");
        for (var i = 0; i < selAllData.length; i++) {
          if (selAllData[i].Id == productStandardPrice.Product2Id) {
            selAllData[i].StandarPrice = productStandardPrice.UnitPrice;
            console.log(
              "productStandardPrice.UnitPrice: ",
              productStandardPrice.UnitPrice
            );
            proStandardPriceSum += productStandardPrice.UnitPrice; // 计算标准总价
            console.log("selAllData[i]: ", selAllData[i]);
            break;
          }
        }
        component.set("v.proStandardTotalPrice", proStandardPriceSum);
        component.set("v.selData", selAllData);
        helper.buildSelectedProductData(component, helper);
      }
    });
    $A.enqueueAction(action);
    helper.buildData(component, helper);
    helper.buildSelectedProductData(component, helper);
  },

  /*
   * add accessory to temporary list
   * */
  addAccessoryToTemporaryList: function (component, event, helper) {
    component.set("v.errMessages", []);
    var accessoryId = event.currentTarget.getAttribute("data-id");
    console.log("accessoryId: ", accessoryId);
    var allProductList = component.get("v.allData");
    var selAccTemporaryPaginationList = component.get("v.selAccData");
    if ($A.util.isUndefinedOrNull(selAccTemporaryPaginationList)) {
      var selAccPaginationList = [];
    } else {
      var selAccPaginationList = selAccTemporaryPaginationList;
      var errMessages = [];
      for (var i = 0; i < selAccPaginationList.length; i++) {
        console.log("selAccPaginationList[i]: ", selAccPaginationList[i]);
        if (accessoryId == selAccPaginationList[i].Id) {
          errMessages.push({ message: "不允许重复添加已存在的数据!" });
          component.set("v.errMessages", errMessages);
          return;
        }
      }
    }
    for (var i = 0; i < allProductList.length; i++) {
      console.log(
        "allProductList[i].Id: ",
        allProductList[i].Id == accessoryId
      );
      if (allProductList[i].Id == accessoryId) {
        selAccPaginationList.push(allProductList[i]);
        allProductList.splice(i, 1);
        break;
      }
    }
    // 计算附件成本价格
    var accCostPriceSum = 0;
    for (var i = 0; i < selAccPaginationList.length; i++) {
      if (!$A.util.isUndefinedOrNull(selAccPaginationList[i].ProductPrice__c)) {
        accCostPriceSum += selAccPaginationList[i].ProductPrice__c;
      }
    }
    component.set("v.accCostTotalPrice", accCostPriceSum);
    // set choose data to list
    component.set("v.selAccData", selAccPaginationList);
    component.set("v.allData", allProductList);
    if (selAccPaginationList.length > 0) {
      component.set("v.selAccDataPageSwitch", "open");
      if (allProductList.length > 0) {
        component.set("v.accDataPageSwitch", "open");
      } else {
        component.set("v.accDataPageSwitch", "close");
      }
    } else {
      component.set("v.selAccDataPageSwitch", "close");
      if (allProductList.length > 0) {
        component.set("v.accDataPageSwitch", "open");
      } else {
        component.set("v.accDataPageSwitch", "close");
      }
    }

    // get standard price by specified accessory id
    var action = component.get("c.queryPriceByPriceEntry");
    action.setParam("productId", accessoryId);
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var selAccAllData = component.get("v.selAccData");
        component.set("v.priceEntry", response.getReturnValue());
        var accessoryStandardPrice = component.get("v.priceEntry");
        var accStandardPriceSum = component.get("v.accStandardTotalPrice");
        for (var i = 0; i < selAccAllData.length; i++) {
          if (selAccAllData[i].Id == accessoryStandardPrice.Product2Id) {
            selAccAllData[i].StandarPrice = accessoryStandardPrice.UnitPrice;
            accStandardPriceSum += accessoryStandardPrice.UnitPrice;
            console.log("selAccAllData[i]: ", selAccAllData[i]);
            break;
          }
        }
        component.set("v.accStandardTotalPrice", accStandardPriceSum);
        component.set("v.selAccData", selAccAllData);
        helper.buildSelectedAccessoryData(component, helper);
      }
    });
    $A.enqueueAction(action);
    helper.buildData(component, helper);
    helper.buildSelectedAccessoryData(component, helper);
  },

  /*
   * del product to temporary list
   * */
  delProductItemToTemporaryList: function (component, event, helper) {
    component.set("v.errMessages", []);
    var productItemId = event.currentTarget.getAttribute("data-id");
    console.log("productItemId: ", productItemId);
    var selAllProductList = component.get("v.selData");
    var allDataList = component.get("v.allData");
    if ($A.util.isUndefinedOrNull(allDataList)) {
      var selPaginationList = [];
    } else {
      var selPaginationList = allDataList;
    }
    let allProDataMap = new Map();
    for (let i = 0, len = selPaginationList.length; i < len; i++) { 
      allProDataMap.set(selPaginationList[i].Id, selPaginationList[i]);
    }
    let selProDataMap = new Map();
    for (let i = 0, len = selAllProductList.length; i < len; i++) { 
      selProDataMap.set(selAllProductList[i].Id, selAllProductList[i]);
    }
    if (!allProDataMap.has(productItemId)) {
      selPaginationList.push(selProDataMap.get(productItemId));
    }
    for (var i = 0; i < selAllProductList.length; i++) {
      console.log(
        "selAllProductList[i].Id: ",
        selAllProductList[i].Id == productItemId
      );
      if (selAllProductList[i].Id == productItemId) {
        console.log('selPaginationList: ', selPaginationList);
        selAllProductList.splice(i, 1);
      }
    }
    if (selAllProductList.length > 0) {
      component.set("v.selProDataPageSwitch", "open");
      if (allDataList.length > 0) {
        component.set("v.proDataPageSwitch", "open");
      } else {
        component.set("v.proDataPageSwitch", "close");
      }
    } else {
      component.set("v.selProDataPageSwitch", "close");
      if (allDataList.length > 0) {
        component.set("v.proDataPageSwitch", "open");
      } else {
        component.set("v.proDataPageSwitch", "close");
      }
    }
    // 处理产品标准、成本价格
    var proStandardPriceSum = 0;
    var proCostPriceSum = 0;
    var proSalesPrice = 0;
    var proSalesQuantity = 0;
    for (var i = 0; i < selAllProductList.length; i++) {
      console.log("删除已选列表中价格");
      console.log("selAllProductList[i]: ", selAllProductList[i]);
      if (!$A.util.isUndefinedOrNull(selAllProductList[i].StandarPrice)) {
        console.log("proStandardPriceSum111: ", proStandardPriceSum);
        proStandardPriceSum += selAllProductList[i].StandarPrice;
        console.log("proStandardPriceSum222: ", proStandardPriceSum);
      }
      if (!$A.util.isUndefinedOrNull(selAllProductList[i].ProductPrice__c)) {
        console.log("proCostPriceSum111: ", proCostPriceSum);
        proCostPriceSum += selAllProductList[i].ProductPrice__c;
        console.log("proCostPriceSum222: ", proCostPriceSum);
      }
      if (!$A.util.isUndefinedOrNull(selAllProductList[i].proSalesPrice)) {
        proSalesPrice += Math.ceil(selAllProductList[i].proSalesPrice);
      }
      if (!$A.util.isUndefinedOrNull(selAllProductList[i].proSalesQuantity)) {
        console.log('selAllProductList[i].proSalesQuantity: ', selAllProductList[i].proSalesQuantity);
        console.log('proSalesQuantity: ', proSalesQuantity);
        proSalesQuantity += Math.ceil(selAllProductList[i].proSalesQuantity);
      }
    }
    component.set("v.proStandardTotalPrice", proStandardPriceSum);
    component.set("v.proCostTotalPrice", proCostPriceSum);
    component.set("v.proSalesTotalPrice", proSalesPrice);
    component.set("v.proSalesTotalQuantity", proSalesQuantity);
    component.set("v.allData", selPaginationList);
    component.set("v.selData", selAllProductList);
    helper.buildData(component, helper);
    helper.buildSelectedProductData(component, helper);
  },

  /*
   * del accessory to temporary list
   * */
  delAccessoryToTemporaryList: function (component, event, helper) {
    component.set("v.errMessages", []);
    var accessoryId = event.currentTarget.getAttribute("data-id");
    console.log("accessoryId: ", accessoryId);
    var selAllAccessoryList = component.get("v.selAccData");
    var allDataList = component.get("v.allData");
    if ($A.util.isUndefinedOrNull(allDataList)) {
      var selAccPaginationList = [];
    } else {
      var selAccPaginationList = allDataList;
    }
    let allAccDataMap = new Map();
    for (let i = 0, len = selAccPaginationList.length; i < len; i++) { 
      allAccDataMap.set(selAccPaginationList[i].Id, selAccPaginationList[i]);
    }
    let selAccDataMap = new Map();
    for (let i = 0, len = selAllAccessoryList.length; i < len; i++) { 
      selAccDataMap.set(selAllAccessoryList[i].Id, selAllAccessoryList[i]);
    }
    if (!allAccDataMap.has(accessoryId)) {
      selAccPaginationList.push(selAccDataMap.get(accessoryId));
    }
    for (var i = 0; i < selAllAccessoryList.length; i++) {
      console.log(
        "selAllAccessoryList[i].Id: ",
        selAllAccessoryList[i].Id == accessoryId
      );
      if (selAllAccessoryList[i].Id == accessoryId) {
        selAllAccessoryList.splice(i, 1);
      }
    }
    if (selAllAccessoryList.length > 0) {
      component.set("v.selAccDataPageSwitch", "open");
      if (allDataList.length > 0) {
        component.set("v.accDataPageSwitch", "open");
      } else {
        component.set("v.accDataPageSwitch", "close");
      }
    } else {
      component.set("v.selAccDataPageSwitch", "close");
      if (allDataList.length > 0) {
        component.set("v.accDataPageSwitch", "open");
      } else {
        component.set("v.accDataPageSwitch", "close");
      }
    }
    // 处理附件标准、成本价格
    var accStandardPriceSum = 0;
    var accCostPriceSum = 0;
    var accSalesPrice = 0;
    var accSalesQuantity = 0;
    for (var i = 0; i < selAllAccessoryList.length; i++) {
      console.log("selAllAccessoryList[i]: ", selAllAccessoryList[i]);
      if (!$A.util.isUndefinedOrNull(selAllAccessoryList[i].StandarPrice)) {
        accStandardPriceSum += selAllAccessoryList[i].StandarPrice;
      }
      if (!$A.util.isUndefinedOrNull(selAllAccessoryList[i].ProductPrice__c)) {
        accCostPriceSum += selAllAccessoryList[i].ProductPrice__c;
      }
      if (!$A.util.isUndefinedOrNull(selAllAccessoryList[i].accSalesPrice)) {
        accSalesPrice += Math.ceil(selAllAccessoryList[i].accSalesPrice);
      }
      if (!$A.util.isUndefinedOrNull(selAllAccessoryList[i].accSalesQuantity)) {
        accSalesQuantity += Math.ceil(selAllAccessoryList[i].accSalesQuantity);
      }
    }
    component.set("v.accStandardTotalPrice", accStandardPriceSum);
    component.set("v.accCostTotalPrice", accCostPriceSum);
    component.set("v.accSalesTotalPrice", accSalesPrice);
    component.set("v.accSalesTotalQuantity", accSalesQuantity);
    component.set("v.allData", selAccPaginationList);
    component.set("v.selAccData", selAllAccessoryList);
    helper.buildData(component, helper);
    helper.buildSelectedAccessoryData(component, helper);
  },

  /*
   * this function will build table data
   * based on current page selection
   * */
  buildData: function (component, helper) {
    component.set("v.errMessages", []);
    var data = [];
    var pageNumber = component.get("v.currentPageNumber");
    console.log("pageNumber: ", pageNumber);
    var pageSize = component.get("v.pageSize");
    console.log("pageSize: ", pageSize);
    var allData = component.get("v.allData");
    console.log("allData: ", allData);
    var refreshDataTotalCount = Math.ceil(allData.length / pageSize);
    console.log("refreshDataTotalCount: ", refreshDataTotalCount);
    var x = (pageNumber - 1) * pageSize;
    console.log("x: ", x);
    console.log("allData: ", allData);

    // creating data-table data
    for (; x <= pageNumber * pageSize; x++) {
      console.log("allData[x]: ", allData[x]);
      if (allData[x]) {
        data.push(allData[x]);
      }
    }
    if (data.length >= 6) {
      console.log("splice data");
      data.splice(data.length - 1, 1);
    }
    console.log("data: ", data);
    component.set("v.data", data);
    component.set("v.totalPages", refreshDataTotalCount);

    helper.generatePageList(component, pageNumber);
  },

  /*
   * this function will build selected product all data
   * based on current page selection
   * */
  buildSelectedProductData: function (component, helper) {
    component.set("v.errMessages", []);
    var selData = [];
    var selPageNumber = component.get("v.selProCurrentPageNumber");
    console.log("selPageNumber: ", selPageNumber);
    var selPageSize = component.get("v.selPageSize");
    console.log("selPageSize: ", selPageSize);
    var selAllData = component.get("v.selData");
    var refreshDataTotalCount = Math.ceil(selAllData.length / selPageSize);
    console.log("refreshDataTotalCount: ", refreshDataTotalCount);
    var x = (selPageNumber - 1) * selPageSize;
    console.log("selAllData: ", selAllData);

    // creating data-table data
    for (; x <= selPageNumber * selPageSize; x++) {
      if (selAllData[x]) {
        selData.push(selAllData[x]);
      }
    }
    if (selData.length >= 6) {
      console.log("splice selData");
      selData.splice(selData.length - 1, 1);
    }
    console.log("selData: ", selData);
    component.set("v.selTemporaryPaginationList", selData);
    component.set("v.selProTotalPages", refreshDataTotalCount);

    // helper.generatePageList(component, selPageNumber);
    helper.generateProductPageList(component, selPageNumber);
  },

  /*
   * this function will build selected accessory all data
   * based on current page selection
   * */
  buildSelectedAccessoryData: function (component, helper) {
    component.set("v.errMessages", []);
    var selAccPaginationData = [];
    var selAccPageNumber = component.get("v.selAccCurrentPageNumber");
    console.log("selAccPageNumber: ", selAccPageNumber);
    var selAccPageSize = component.get("v.selAccPageSize");
    console.log("selAccPageSize: ", selAccPageSize);
    var selAccAllData = component.get("v.selAccData");
    var refreshDataTotalCount = Math.ceil(
      selAccAllData.length / selAccPageSize
    );
    console.log("refreshDataTotalCount: ", refreshDataTotalCount);
    var x = (selAccPageNumber - 1) * selAccPageSize;
    console.log("selAccAllData: ", selAccAllData);

    // creating data-table data
    for (; x <= selAccPageNumber * selAccPageSize; x++) {
      if (selAccAllData[x]) {
        selAccPaginationData.push(selAccAllData[x]);
      }
    }
    if (selAccPaginationData.length >= 6) {
      console.log("splice selAccPaginationData");
      selAccPaginationData.splice(selAccPaginationData.length - 1, 1);
    }
    console.log("selAccPaginationData: ", selAccPaginationData);
    component.set("v.selAccTemporaryPaginationList", selAccPaginationData);
    component.set("v.selAccTotalPages", refreshDataTotalCount);

    // helper.generatePageList(component, selPageNumber);
    helper.generateAccessoryPageList(component, selAccPageNumber);
  },

  /*
   * this function generate all data page list
   * */
  generatePageList: function (component, pageNumber) {
    component.set("v.errMessages", []);
    pageNumber = parseInt(pageNumber);
    var pageList = [];
    var totalPages = component.get("v.totalPages");
    if (totalPages > 1) {
      if (totalPages <= 10) {
        var counter = 2;
        for (; counter < totalPages; counter++) {
          pageList.push(counter);
        }
      } else {
        if (pageNumber < 5) {
          pageList.push(2, 3, 4, 5, 6);
        } else {
          if (pageNumber > totalPages - 5) {
            pageList.push(
              totalPages - 5,
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1
            );
          } else {
            pageList.push(
              pageNumber - 2,
              pageNumber - 1,
              pageNumber,
              pageNumber + 1,
              pageNumber + 2
            );
          }
        }
      }
    }
    component.set("v.pageList", pageList);
  },

  /*
   * this function generate selected product page list
   * */
  generateProductPageList: function (component, pageNumber) {
    component.set("v.errMessages", []);
    pageNumber = parseInt(pageNumber);
    var pageList = [];
    var totalPages = component.get("v.selProTotalPages");
    if (totalPages > 1) {
      if (totalPages <= 10) {
        var counter = 2;
        for (; counter < totalPages; counter++) {
          pageList.push(counter);
        }
      } else {
        if (pageNumber < 5) {
          pageList.push(2, 3, 4, 5, 6);
        } else {
          if (pageNumber > totalPages - 5) {
            pageList.push(
              totalPages - 5,
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1
            );
          } else {
            pageList.push(
              pageNumber - 2,
              pageNumber - 1,
              pageNumber,
              pageNumber + 1,
              pageNumber + 2
            );
          }
        }
      }
    }
    component.set("v.selProPageList", pageList);
  },

  /*
   * this function generate selected accessory page list
   * */
  generateAccessoryPageList: function (component, pageNumber) {
    component.set("v.errMessages", []);
    pageNumber = parseInt(pageNumber);
    var pageList = [];
    var totalPages = component.get("v.selAccTotalPages");
    if (totalPages > 1) {
      if (totalPages <= 10) {
        var counter = 2;
        for (; counter < totalPages; counter++) {
          pageList.push(counter);
        }
      } else {
        if (pageNumber < 5) {
          pageList.push(2, 3, 4, 5, 6);
        } else {
          if (pageNumber > totalPages - 5) {
            pageList.push(
              totalPages - 5,
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1
            );
          } else {
            pageList.push(
              pageNumber - 2,
              pageNumber - 1,
              pageNumber,
              pageNumber + 1,
              pageNumber + 2
            );
          }
        }
      }
    }
    component.set("v.selAccPageList", pageList);
  },
});