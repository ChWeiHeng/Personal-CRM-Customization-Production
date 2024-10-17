({
    getProducts : function(component, helper) {
        var actions = [
            { label: '添加', name: 'choose' },
            { label: '详情', name: 'showDetail' }
        ]
        component.set('v.columns', [
            {label: '产品名称', fieldName: 'Name', type: 'text', sortable : true},
            {label: '产品家族', fieldName: 'ProductFamily__c', type: 'text', sortable : true},
            {label: '产品系列', fieldName: 'ProductLine__c', type: 'text', sortable : true},
            {label: '产品型号', fieldName: 'ProductModel__c', type: 'text', sortable : true},
            {label: '产品参数', fieldName: 'ProductParameter__c', type: 'text', sortable : true},
            {type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        component.set("v.errMessages", []);
        console.log('helper.method!');
        var searchType = component.get("v.value");
        var param = component.get("v.searchParam");
        var action;
        console.log('param', param);
        // judge type
        if(searchType == 'product') {
            console.log('进入产品查询列表');
            action = component.get("c.queryDataByProductParamCopy");
            // judge parameter
            if(param == undefined) {
                action.setParam("searchParam", "");
            } else {
                action.setParam("searchParam", param);
            }
            action.setCallback(this,function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.allData", response.getReturnValue());
                    console.log('response.getReturnValue(): ', response.getReturnValue());
                    component.set("v.accDataPageSwitch", "close");
                    component.set("v.selAccDataPageSwitch", "close");
                    component.set("v.currentPageNumber",1);
                    var selPaginationData = component.get("v.selData");
                    if(selPaginationData == null) {
                        selPaginationData = [];
                    }
                    var allProductData = component.get("v.allData");
                    console.log('selPaginationData pro: ', selPaginationData);
                    console.log('allProductData pro: ', allProductData);
                    if(selPaginationData.length > 0) {
                        console.log('one method');
                        component.set("v.selProDataPageSwitch", "open");
                        if(allProductData.length > 0) {
                            component.set("v.proDataPageSwitch", "open");
                        } else {
                            component.set("v.proDataPageSwitch", "close");
                        }
                    } else {
                        console.log('two method');
                        component.set("v.selProDataPageSwitch", "close");
                        if(allProductData.length > 0) {
                            component.set("v.proDataPageSwitch", "open");
                        } else {
                            component.set("v.proDataPageSwitch", "close");
                        }
                    }
                    helper.buildData(component, helper);
                }
            });
        } else {
            console.log('进入附件查询列表');
            action = component.get("c.queryDataByAccessoryParamCopy");
            // judge parameter
            if(param == undefined) {
                action.setParam("searchParam", "");
            } else {
                action.setParam("searchParam", param);
            }
            action.setCallback(this,function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                    component.set("v.allData", response.getReturnValue());
                    console.log('response.getReturnValue(): ', response.getReturnValue());
                    component.set("v.proDataPageSwitch", "close");
                    component.set("v.selProDataPageSwitch", "close");
                    component.set("v.currentPageNumber",1);
                    var selAccPaginationData = component.get("v.selAccData");
                    if(selAccPaginationData == null) {
                        selAccPaginationData = [];
                    }
                    var allProductData = component.get("v.allData");
                    console.log('selAccPaginationData acc: ', selAccPaginationData);
                    console.log('allProductData acc: ', allProductData);
                    if(selAccPaginationData.length > 0) {
                        console.log('one method');
                        component.set("v.selAccDataPageSwitch", "open");
                        if(allProductData.length > 0) {
                            component.set("v.accDataPageSwitch", "open");
                        } else {
                            component.set("v.accDataPageSwitch", "close");
                        }
                    } else {
                        console.log('two method');
                        component.set("v.selAccDataPageSwitch", "close");
                        if(allProductData.length > 0) {
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

    // add product to temporary list
    addProductItemToTemporaryList : function(component, event, helper) {
        component.set("v.errMessages", []);
        var productItemId = event.currentTarget.getAttribute("data-id");
        console.log('productItemId: ', productItemId);
        var allProductList = component.get("v.allData");
        var selTemporaryPaginationList = component.get("v.selData");
        if(selTemporaryPaginationList == null) {
            var selPaginationList = [];
        } else {
            var selPaginationList = selTemporaryPaginationList;
            var errMessages = [];
            for(var i = 0; i < selPaginationList.length; i++) {
                console.log('selPaginationList[i]: ', selPaginationList[i]);
                if(productItemId == selPaginationList[i].Id) {
                    errMessages.push({message: "不允许重复添加已存在的数据!"});
                    component.set("v.errMessages", errMessages);
                    return;
                }
            }
        }
        for(var i = 0; i < allProductList.length; i++) {
            console.log('allProductList[i].Id: ', allProductList[i].Id == productItemId);
            if(allProductList[i].Id == productItemId) {
                selPaginationList.push(allProductList[i]);
                allProductList.splice(i, 1);
                break;
            }
        }
        // set choose data to list
        component.set("v.selData", selPaginationList);
        component.set("v.allData", allProductList);
        if(selPaginationList.length > 0) {
            component.set("v.selProDataPageSwitch", "open");
            if(allProductList.length > 0) {
                component.set("v.proDataPageSwitch", "open");
            } else {
                component.set("v.proDataPageSwitch", "close");
            }
        } else {
            component.set("v.selProDataPageSwitch", "close");
            if(allProductList.length > 0) {
                component.set("v.proDataPageSwitch", "open");
            } else {
                component.set("v.proDataPageSwitch", "close");
            }
        }

        // get standard price by specified product id
        var action = component.get("c.queryPriceByPriceEntryCopy");
        action.setParam("productId", productItemId);
        action.setCallback(this,function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var selAllData = component.get("v.selData");
                component.set("v.priceEntry", response.getReturnValue());
                var productStandardPrice = component.get("v.priceEntry");
                for(var i = 0; i < selAllData.length; i++) {
                    if(selAllData[i].Id == productStandardPrice.Product2Id) {
                        selAllData[i].StandarPrice = productStandardPrice.UnitPrice;
                        console.log('selAllData[i]: ', selAllData[i]);
                        break;
                    }
                }
                component.set("v.selData", selAllData);
                helper.buildSelectedProductData(component, helper);
            }
        });
        $A.enqueueAction(action);
        helper.buildData(component, helper);
        helper.buildSelectedProductData(component, helper);
    },

    // add accessory to temporary list
    addAccessoryToTemporaryList : function(component, event, helper) {
        component.set("v.errMessages", []);
        var accessoryId = event.currentTarget.getAttribute("data-id");
        console.log('accessoryId: ', accessoryId);
        var allProductList = component.get("v.allData");
        var selAccTemporaryPaginationList = component.get("v.selAccData");
        if(selAccTemporaryPaginationList == null) {
            var selAccPaginationList = [];
        } else {
            var selAccPaginationList = selAccTemporaryPaginationList;
            var errMessages = [];
            for(var i = 0; i < selAccPaginationList.length; i++) {
                console.log('selAccPaginationList[i]: ', selAccPaginationList[i]);
                if(accessoryId == selAccPaginationList[i].Id) {
                    errMessages.push({message: "不允许重复添加已存在的数据!"});
                    component.set("v.errMessages", errMessages);
                    return;
                }
            }
        }
        for(var i = 0; i < allProductList.length; i++) {
            console.log('allProductList[i].Id: ', allProductList[i].Id == accessoryId);
            if(allProductList[i].Id == accessoryId) {
                selAccPaginationList.push(allProductList[i]);
                allProductList.splice(i, 1);
                break;
            }
        }
        // set choose data to list
        component.set("v.selAccData", selAccPaginationList);
        component.set("v.allData", allProductList);
        if(selAccPaginationList.length > 0) {
            component.set("v.selAccDataPageSwitch", "open");
            if(allProductList.length > 0) {
                component.set("v.accDataPageSwitch", "open");
            } else {
                component.set("v.accDataPageSwitch", "close");
            }
        } else {
            component.set("v.selAccDataPageSwitch", "close");
            if(allProductList.length > 0) {
                component.set("v.accDataPageSwitch", "open");
            } else {
                component.set("v.accDataPageSwitch", "close");
            }
        }

        // get standard price by specified accessory id
        var action = component.get("c.queryPriceByPriceEntryCopy");
        action.setParam("productId", accessoryId);
        action.setCallback(this,function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var selAccAllData = component.get("v.selAccData");
                component.set("v.priceEntry", response.getReturnValue());
                var accessoryStandardPrice = component.get("v.priceEntry");
                for(var i = 0; i < selAccAllData.length; i++) {
                    if(selAccAllData[i].Id == accessoryStandardPrice.Product2Id) {
                        selAccAllData[i].StandarPrice = accessoryStandardPrice.UnitPrice;
                        console.log('selAccAllData[i]: ', selAccAllData[i]);
                        break;
                    }
                }
                component.set("v.selAccData", selAccAllData);
                helper.buildSelectedAccessoryData(component, helper);
            }
        });
        $A.enqueueAction(action);
        helper.buildData(component, helper);
        helper.buildSelectedAccessoryData(component, helper);
    },

    // del product to temporary list
    delProductItemToTemporaryList : function(component, event, helper) {
        component.set("v.errMessages", []);
        var productItemId = event.currentTarget.getAttribute("data-id");
        console.log('productItemId: ', productItemId);
        var selAllProductList = component.get("v.selData");
        var allDataList = component.get("v.allData");
        if(allDataList == null) {
            var selPaginationList = [];
        } else {
            var selPaginationList = allDataList;
        }
        for(var i = 0; i < selAllProductList.length; i++) {
            console.log('selAllProductList[i].Id: ', selAllProductList[i].Id == productItemId);
            if(selAllProductList[i].Id == productItemId) {
                selPaginationList.push(selAllProductList[i]);
                selAllProductList.splice(i, 1);
                break;
            }
        }
        if(selAllProductList.length > 0) {
            component.set("v.selProDataPageSwitch", "open");
            if(allDataList.length > 0) {
                component.set("v.proDataPageSwitch", "open");
            } else {
                component.set("v.proDataPageSwitch", "close");
            }
        } else {
            component.set("v.selProDataPageSwitch", "close");
            if(allDataList.length > 0) {
                component.set("v.proDataPageSwitch", "open");
            } else {
                component.set("v.proDataPageSwitch", "close");
            }
        }
        
        component.set("v.allData", selPaginationList);
        component.set("v.selData", selAllProductList);
        helper.buildData(component, helper);
        helper.buildSelectedProductData(component, helper);
    },

    // del accessory to temporary list
    delAccessoryToTemporaryList : function(component, event, helper) {
        component.set("v.errMessages", []);
        var accessoryId = event.currentTarget.getAttribute("data-id");
        console.log('accessoryId: ', accessoryId);
        var selAllAccessoryList = component.get("v.selAccData");
        var allDataList = component.get("v.allData");
        if(allDataList == null) {
            var selAccPaginationList = [];
        } else {
            var selAccPaginationList = allDataList;
        }
        for(var i = 0; i < selAllAccessoryList.length; i++) {
            console.log('selAllAccessoryList[i].Id: ', selAllAccessoryList[i].Id == accessoryId);
            if(selAllAccessoryList[i].Id == accessoryId) {
                selAccPaginationList.push(selAllAccessoryList[i]);
                selAllAccessoryList.splice(i, 1);
                break;
            }
        }
        if(selAllAccessoryList.length > 0) {
            component.set("v.selAccDataPageSwitch", "open");
            if(allDataList.length > 0) {
                component.set("v.accDataPageSwitch", "open");
            } else {
                component.set("v.accDataPageSwitch", "close");
            }
        } else {
            component.set("v.selAccDataPageSwitch", "close");
            if(allDataList.length > 0) {
                component.set("v.accDataPageSwitch", "open");
            } else {
                component.set("v.accDataPageSwitch", "close");
            }
        }
        
        component.set("v.allData", selAccPaginationList);
        component.set("v.selAccData", selAllAccessoryList);
        helper.buildData(component, helper);
        helper.buildSelectedAccessoryData(component, helper);
    },
    
    /*
     * this function will build table data
     * based on current page selection
     * */
    buildData : function(component, helper) {
        component.set("v.errMessages", []);
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        console.log('pageNumber: ', pageNumber);
        var pageSize = component.get("v.pageSize");
        console.log('pageSize: ', pageSize);
        var allData = component.get("v.allData");
        console.log('allData: ', allData);
        var refreshDataTotalCount = Math.ceil(allData.length / pageSize);
        console.log('refreshDataTotalCount: ', refreshDataTotalCount);
        var x = (pageNumber-1)*pageSize;
        console.log('x: ', x);
        console.log('allData: ', allData);
        
        // creating data-table data
        for(; x<=(pageNumber)*pageSize; x++) {
            console.log('allData[x]: ', allData[x]);
            if(allData[x]) {
                data.push(allData[x]);
            }
        }
        if(data.length >= 6) {
            console.log('splice data');
            data.splice(data.length - 1, 1);
        }
        console.log('data: ', data);
        component.set("v.data", data);
        component.set("v.totalPages", refreshDataTotalCount);
        
        helper.generatePageList(component, pageNumber);
    },

    /*
     * this function will build selected product all data
     * based on current page selection
     * */
    buildSelectedProductData : function(component, helper) {
        component.set("v.errMessages", []);
        var selData = [];
        var selPageNumber = component.get("v.selCurrentPageNumber");
        console.log('selPageNumber: ', selPageNumber);
        var selPageSize = component.get("v.selPageSize");
        console.log('selPageSize: ', selPageSize);
        var selAllData = component.get("v.selData");
        var refreshDataTotalCount = Math.ceil(selAllData.length / selPageSize);
        console.log('refreshDataTotalCount: ', refreshDataTotalCount);
        var x = (selPageNumber-1)*selPageSize;
        console.log('selAllData: ', selAllData);
        
        // creating data-table data
        for(; x<=(selPageNumber)*selPageSize; x++){
            if(selAllData[x]){
            	selData.push(selAllData[x]);
            }
        }
        if(selData.length >= 6) {
            console.log('splice selData');
            selData.splice(selData.length - 1, 1);
        }
        console.log('selData: ', selData);
        component.set("v.selTemporaryPaginationList", selData);
        component.set("v.selTotalPages", refreshDataTotalCount);
        
        helper.generatePageList(component, selPageNumber);
    },

    /*
     * this function will build selected accessory all data
     * based on current page selection
     * */
    buildSelectedAccessoryData : function(component, helper) {
        component.set("v.errMessages", []);
        var selAccPaginationData = [];
        var selAccPageNumber = component.get("v.selAccCurrentPageNumber");
        console.log('selAccPageNumber: ', selAccPageNumber);
        var selAccPageSize = component.get("v.selAccPageSize");
        console.log('selAccPageSize: ', selAccPageSize);
        var selAccAllData = component.get("v.selAccData");
        var refreshDataTotalCount = Math.ceil(selAccAllData.length / selAccPageSize);
        console.log('refreshDataTotalCount: ', refreshDataTotalCount);
        var x = (selAccPageNumber-1)*selAccPageSize;
        console.log('selAccAllData: ', selAccAllData);
        
        // creating data-table data
        for(; x<=(selAccPageNumber)*selAccPageSize; x++){
            if(selAccAllData[x]){
            	selAccPaginationData.push(selAccAllData[x]);
            }
        }
        if(selAccPaginationData.length >= 6) {
            console.log('splice selAccPaginationData');
            selAccPaginationData.splice(selAccPaginationData.length - 1, 1);
        }
        console.log('selAccPaginationData: ', selAccPaginationData);
        component.set("v.selAccTemporaryPaginationList", selAccPaginationData);
        component.set("v.selAccTotalPages", refreshDataTotalCount);
        
        helper.generatePageList(component, selPageNumber);
    },
    
    /*
     * this function generate page list
     * */
    generatePageList : function(component, pageNumber) {
        component.set("v.errMessages", []);
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
    },
   
 })