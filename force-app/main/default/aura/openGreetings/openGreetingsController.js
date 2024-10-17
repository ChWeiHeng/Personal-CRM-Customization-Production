({
    openSubtab: function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getEnclosingTabId().then(function(enclosingTabId) {
            workspaceAPI.openSubtab({
                parentTabId: enclosingTabId,
                pageReference: {
                    "type": "standard__component",
                    "attributes": {
                        "componentName": "c__greetings"
                    },
                    "state": {
                        "uid": "1",
                        "c__name": component.get("v.myName")
                    }
                }
            }).then(function(subtabId) {
                console.log("The new subtab ID is:" + subtabId);
            }).catch(function(error) {
                console.log("error");
            });
        });
    }
})