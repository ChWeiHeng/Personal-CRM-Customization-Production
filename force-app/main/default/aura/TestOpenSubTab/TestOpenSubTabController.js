({
    openTabWithSubtab : function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            url: '/lightning/r/WeChat__c/a082w00000XRsDDAA1/view',
            focus: true
        }).then(function(response) {
            workspaceAPI.openSubtab({
                parentTabId: response,
                url: '/lightning/r/Product__c/a0C2w00000IftaTEAR/view',
                focus: true
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    },

    openTab: function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            pageReference: {
                "type": "standard__recordPage",
                "attributes": {
                    "recordId":"a0C2w00000IftaTEAR",
                    "actionName":"view"
                },
                "state": {}
            },
            focus: true
        }).then(function(response) {
            workspaceAPI.getTabInfo({
                tabId: response
        }).then(function(tabInfo) {
            console.log("The recordId for this tab is: " + tabInfo.recordId);
        });
        }).catch(function(error) {
            console.log(error);
        });
    },

    onTabCreated : function(component, event, helper) {
        var tabId = event.getParam("tabId");
        alert("Tab with tabId of " + tabId + " was just closed.");
    },

})