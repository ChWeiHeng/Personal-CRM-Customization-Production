({
    doInit : function(component, event, helper) {

    	console.log(component.get("v.recordId"));

        var action = component.get("c.initialize");
        action.setParams({"accId": component.get("v.recordId")});
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {

            	console.log(response.getState());
            	var retValue = response.getReturnValue();
            	console.log(response.getReturnValue());
            	component.set("v.datas", retValue);
            	console.log(retValue[0].CreatedDate);
            }
        });
        $A.enqueueAction(action);
    },

})