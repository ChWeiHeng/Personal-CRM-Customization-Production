({
    doInit : function(component, event, helper) {
    	console.log(component.get("v.recordId"));
        // var action = component.get("c.initialize");
        // action.setParams({"recordId": component.get("v.recordId")});

        // action.setCallback(this, function(response) {
        //     if (response.getState() === "SUCCESS") {
        //     	console.log(response.getState());
        //     	var retValue = response.getReturnValue();
        //     	console.log(response.getReturnValue());
		//         component.set('v.data', retValue);
        //     }
        // });
        // $A.enqueueAction(action);
    },

    saveSelectData : function(component, event, helper) {
    	// var parentSelectIndex = component.find('parentSelect').get('v.value');
    	// console.log('parentSelectIndex', parentSelectIndex);

    	// var action = component.get("c.SaveData");
    	// action.setParams({
        //     "recordId" : component.get("v.recordId"),
        //     "parentStatus" : parentStr,
        //     "childStatus" : childStr
        // });
    	// action.setCallback(this, function(response) {
    	// 	if (response.getState() === "SUCCESS") {
    	// 		window.location.reload();
    	// 	} else {
        //         var errors = response.getError();                       
        //         component.set("v.showErrors",true);
        //         component.set("v.errorMessage",errors[0].message);
        //     }
    	// });
    	// $A.enqueueAction(action);
    },

    cancelPage : function(component, event, helper) {
    	$A.get("e.force:closeQuickAction").fire();
    },

    showModel: function(component, event, helper) {
        component.set("v.showModal", true);
     },
    
     hideModel: function(component, event, helper) {
        component.set("v.showModal", false);
     },
    
     saveDetails: function(component, event, helper) {
        component.set("v.showModal", false);
     },
})