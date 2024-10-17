({
    // init
	doInit : function(component, event, helper) {                
        helper.getProducts(component, helper);
    },

    // selected product data pagination
    onNext : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        console.log('pageNumber: ', pageNumber);
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component, helper);
    },
    
    processMe : function(component, event, helper) {
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component, helper);
    },
    
    onFirst : function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.buildData(component, helper);
    },
    
    onLast : function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component, helper);
    },

    // selected product data pagination
    onSelNext : function(component, event, helper) {        
        var selPageNumber = component.get("v.selCurrentPageNumber");
        component.set("v.selCurrentPageNumber", selPageNumber+1);
        helper.buildSelectedProductData(component, helper);
    },
    
    onSelPrev : function(component, event, helper) {        
        var selPageNumber = component.get("v.selCurrentPageNumber");
        component.set("v.selCurrentPageNumber", selPageNumber-1);
        helper.buildSelectedProductData(component, helper);
    },
    
    selProcessMe : function(component, event, helper) {
        component.set("v.selCurrentPageNumber", parseInt(event.target.name));
        helper.buildSelectedProductData(component, helper);
    },
    
    onSelFirst : function(component, event, helper) {        
        component.set("v.selCurrentPageNumber", 1);
        helper.buildSelectedProductData(component, helper);
    },
    
    onSelLast : function(component, event, helper) {        
        component.set("v.selCurrentPageNumber", component.get("v.selTotalPages"));
        helper.buildSelectedProductData(component, helper);
    },

    // selected accessory data pagination
    onSelAccNext : function(component, event, helper) {        
        var selPageNumber = component.get("v.selAccCurrentPageNumber");
        component.set("v.selAccCurrentPageNumber", selPageNumber+1);
        helper.buildSelectedAccessoryData(component, helper);
    },
    
    onSelAccPrev : function(component, event, helper) {        
        var selPageNumber = component.get("v.selAccCurrentPageNumber");
        component.set("v.selAccCurrentPageNumber", selPageNumber-1);
        helper.buildSelectedAccessoryData(component, helper);
    },
    
    selAccProcessMe : function(component, event, helper) {
        component.set("v.selAccCurrentPageNumber", parseInt(event.target.name));
        helper.buildSelectedAccessoryData(component, helper);
    },
    
    onSelAccFirst : function(component, event, helper) {        
        component.set("v.selAccCurrentPageNumber", 1);
        helper.buildSelectedAccessoryData(component, helper);
    },
    
    onSelAccLast : function(component, event, helper) {        
        component.set("v.selAccCurrentPageNumber", component.get("v.selAccTotalPages"));
        helper.buildSelectedAccessoryData(component, helper);
    },

    // query data by search param
    queryDataBySearchParam : function(component, event, helper){
        helper.getProducts(component, helper);
    },

    // add product data to selected list
    addProDataToTemporaryList : function(component, event, helper) {
        helper.addProductItemToTemporaryList(component, event, helper);
    },

    // del product data to selected list
    delProDataToTemporaryList : function(component, event, helper) {
        helper.delProductItemToTemporaryList(component, event, helper);
    },

    // add accessory data to selected list
    addAccDataToTemporaryList : function(component, event, helper) {
        helper.addAccessoryToTemporaryList(component, event, helper);
    },

    // del accessory data to selected list
    delAccDataToTemporaryList : function(component, event, helper) {
        helper.delAccessoryToTemporaryList(component, event, helper);
    },

    // show detail
    linkProductDetailPage : function (component, event, helper) {
        console.log('event.Name: ', event.currentTarget.getAttribute("name"));
        var recordId = event.currentTarget.getAttribute("name");
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId
        });
        navEvt.fire();
    },

    // show data detail (open new window)
    linkProductDetailPageByNewWindow : function(component, event, helper) {
        var navService = component.find("navService");
        var recordId = event.currentTarget.getAttribute("name");
        var pageReference = {    
            "type": "standard__recordPage",
            "attributes": {
                "recordId": recordId,
                "actionName": "view"
            }
        }
        navService.generateUrl(pageReference)
        .then($A.getCallback(function(url) {
            console.log('success: ' + url);
            window.open(url,'_blank');
        }), 
        $A.getCallback(function(error) {
            console.log('error: ' + error);
        }));
    },

    cancel: function(component, event, helper) {
        event.preventDefault();
    },

    drop: function(component, event, helper) {
        var oldIndex = component.get("v.dragid");
        //console.log('old index: ' + oldIndex);
        var newIndex = event.target.dataset.dragId;
        var pos = event.clientY;
        var target = event.target;
        //console.log('node type: ' + target.nodeName);

        var rect;
        if(target.nodeName == 'TD'){
            rect = target.firstChild.getBoundingClientRect();
        }	else if(target.nodeName == 'DIV') {
            rect = target.getBoundingClientRect();
        }

        if(pos > rect.bottom){
            //newIndex = parseInt(newIndex) + 1;
        } else if (pos < rect.top){
            newIndex = parseInt(newIndex) - 1;
        }

        //console.log('new index: ' + newIndex);

        if(newIndex && oldIndex){
            var values = component.get("v.data");

            while (newIndex < 0) {
                newIndex += values.length;
        }
            
            if (newIndex >= values.length) {
                    var k = newIndex - values.length + 1;
                    while (k--) {
                            values.push(undefined);
                    }
            }
            
            values.splice(newIndex, 0, values.splice(oldIndex, 1)[0]);
            component.set("v.data", values);
        }

        event.preventDefault();
    },

    //DUC added
	dragstart: function(component, event, helper) {
        //console.log('dragstart->dragid: ' + event.target.dataset.dragId);
        component.set("v.dragid", event.target.dataset.dragId);
        event.dataTransfer.setData('Text', component.id);
    },

    mouseOverDragIcon: function(cmp, event, helper){
        var thisRow = event.currentTarget;
        var parentDiv = thisRow.parentElement.parentElement;
        parentDiv.setAttribute('draggable', true);
    },

    mouseOutDragIcon: function(cmp, event, helper){
            var thisRow = event.currentTarget;
            var parentDiv = thisRow.parentElement.parentElement;
            parentDiv.setAttribute('draggable', false);
    },
  
})