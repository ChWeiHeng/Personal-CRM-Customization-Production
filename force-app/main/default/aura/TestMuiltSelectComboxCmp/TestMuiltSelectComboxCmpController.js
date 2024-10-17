({
  handleSelect: function (component, event, helper) {
    var payload = event.getParam("payload");
    var payloadType = event.getParam("payloadType");
    if (payloadType === "multi-select") {
      console.log(payload.value);
      console.log(payload.values);
    }
  },
});