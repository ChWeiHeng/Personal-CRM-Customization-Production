({
    onTabCreated : function(component, event, helper) {
        var tabId = event.getParam("tabId");
        alert("Tab with tabId of " + tabId + " was just closed.");
    }
})