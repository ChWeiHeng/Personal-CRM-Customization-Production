({
  loadNavigation: function (component, event, helper) {
    var recordId = component.get("v.recordId");
    if (recordId != "" && recordId != undefined) {
      var responses;
      var action = component.get("c.getNavaigationTopicsOrKnowledges");
      action.setParam("recordId", recordId);
      action.setCallback(this, function (response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          responses = response.getReturnValue();
          if (responses.objApiName == "Topic") {
            component.set("v.topic", responses.responseData);
            component.set("v.isTopicFlag", true);
            component.set("v.currentPageType", "Topic");
          } else {
            component.set("v.knowledge", responses.responseData);
            component.set("v.topic", responses.knowledgeRelatedTopicData);
            component.set("v.isTopicFlag", true);
            component.set("v.isKnowledgeFlag", true);
            component.set("v.currentPageType", "Knowledge");
          }
        }
      });
      $A.enqueueAction(action);
    }
  },

  // トピックカタログの詳細ページへ
  navagiationToTopic: function (component, event, helper) {
    const recordId = event.currentTarget.getAttribute("name");
    var navService = component.find("navService");
    var pageRef = {
      type: "standard__recordPage",
      attributes: {
        actionName: "view",
        objectApiName: "Topic",
        recordId: recordId,
      },
    };
    navService.navigate(pageRef, true);
  },

  // ホームページのページへ
  navagiationToHomePage: function (component, event, helper) {
    var navService = component.find("navService");
    var pageRef = {
      type: "standard__namedPage",
      attributes: {
        pageName: "home",
      },
    };
    navService.navigate(pageRef, true);
  },
});