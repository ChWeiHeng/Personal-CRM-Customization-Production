({
  loadKnowledgeContent: function (component, event, helper) {
    var action = component.get("c.getKnowledgeDetailData");
    var recordId = component.get("v.recordId");
    action.setParam("knowledgeId", recordId);
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var responses = response.getReturnValue();
        component.set("v.knowledgeContentList", responses);
      } else {
        console.log('response.getError(): ', response.getError());
      }
    });
    $A.enqueueAction(action);
  },
});