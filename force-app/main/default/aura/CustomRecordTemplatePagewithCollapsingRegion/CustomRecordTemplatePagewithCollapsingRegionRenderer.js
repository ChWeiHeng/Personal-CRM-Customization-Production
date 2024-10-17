({
  // Your renderer method overrides go here
  afterRender: function (component, helper) {
    this.superAfterRender();
    console.log('###### return result section one: ' + component.getConcreteComponent().getElement('flex-page-box').clientWidth);
    var left_region_width = component.find("flex-page-box-content-left-parent-id").getElement().clientWidth;
      document.getElementById('flex-page-sidebar-line-left').style.setProperty('left', '16.5%');
      document.getElementById('flex-page-sidebar-line-left-button').style.setProperty('left', '15%');
  
      var right_region_width = component.find("flex-page-box-content-right-parent-id").getElement().clientWidth;
      document.getElementById('flex-page-sidebar-line-right').style.setProperty('right', '16.7%');
      document.getElementById('flex-page-sidebar-line-right-button').style.setProperty('right', '15.3%');
  },

  // rerender: function (component, helper) {
  //   console.log('###### rerender 重新渲染!');
  //   this.superAfterRender();
  //   console.log('###### rerender 重新渲染! return result section one: ' + component.getConcreteComponent().getElement('flex-page-box').clientWidth);
  //   var left_region_width = component.find("flex-page-box-content-left-parent-id").getElement().clientWidth;
  //   console.log('###### rerender 重新渲染! left_region_width: ' + left_region_width);
  //   document.getElementById('flex-page-sidebar-line-left').style.setProperty('left', left_region_width + 'px');
  //   document.getElementById('flex-page-sidebar-line-left-button').style.setProperty('left', (left_region_width - 25) + 'px');

  //   var right_region_width = component.find("flex-page-box-content-right-parent-id").getElement().clientWidth;
  //   document.getElementById('flex-page-sidebar-line-right').style.setProperty('right', right_region_width + 'px');
  //   document.getElementById('flex-page-sidebar-line-right-button').style.setProperty('right', (right_region_width - 25) + 'px');
  // },
});