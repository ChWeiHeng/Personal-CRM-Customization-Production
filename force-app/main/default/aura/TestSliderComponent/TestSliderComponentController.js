({
  doInit: function (component, event, helper) {
    helper.initialLoad(component, event, helper);
  },
  onMouseDown: function (component, event, helper) {
    console.log("mousedown");
    helper.onMouseDown(component, event, helper);
  },
});