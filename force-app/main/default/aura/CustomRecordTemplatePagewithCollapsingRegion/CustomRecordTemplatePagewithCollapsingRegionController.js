({

  doInit : function(component, event, helper) {
    jQuery('document').ready(function () {
      console.log('jquery has loaded successfully');
    })
    // var left_region_width = component.find("flex-page-box-content-left-aura-id").getElement().style.width;
    // console.log('###### left_region_width: ' + left_region_width);
    // component.find('flex-page-sidebar-line-left').getElement().style.left = left_region_width;
  },

  allowDrop: function(cmp, event, helper){
    event.preventDefault();
  },
  drag: function(cmp, event, helper){
      var parentId = document.getElementById(event.target.id).parentElement.id;
      cmp.set("v.startId",event.target.id);
      cmp.set("v.parentId",parentId);
  },
  drop: function(component, event, helper){
    var droplineId = component.get('v.startId');
    console.log('###### droplineId: ' + droplineId);

    var event_clientX = event.clientX; 
    // var event_clientY = event.clientY;
    // var documentObj = document.documentElement.clientWidth;
    // var documentObj_Width = document.documentElement.clientWidth;
    // var documentObj_offsetLeft = document.documentElement.offsetLeft;
    // var documentObj_offsetWidth = document.documentElement.offsetWidth;
    // var documentObj_clientWidth = document.documentElement.clientWidth;

    var page_width = $('#flex-page-box').width();
    var page_right_width = $('#flex-page-box-content-right').width();
    var page_left_width = $('#flex-page-box-content-left').width();
    
    // var line_boundary = $('#flex-page-sidebar-line-left').offset().left;
    // var middle_width = $('#flex-page-box-content-middle-region').width();

    switch (droplineId) {
      case 'flex-page-sidebar-line-left':
        component.find("flex-page-box-content-left-parent-id").getElement().style.width = event_clientX + "px";
        component.find('flex-page-sidebar-line-left').getElement().style.left = event_clientX + "px";
        component.find('flex-page-sidebar-line-left-button').getElement().style.left = (event_clientX - 25) + "px";

        component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_width - page_right_width - event_clientX)  + "px";
        component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_width - page_right_width - event_clientX)  + "px";

        component.set('v.click_last_middle_region_width', (page_width - page_right_width - event_clientX));
        component.set('v.click_last_left_region_width', event_clientX);
        break;

      case 'flex-page-sidebar-line-right':
        component.find("flex-page-box-content-right-parent-id").getElement().style.width = (page_width - event_clientX) + "px";
        component.find('flex-page-sidebar-line-right').getElement().style.right = (page_width - event_clientX) + "px";
        component.find('flex-page-sidebar-line-right-button').getElement().style.right = ((page_width - event_clientX) - 25) + "px";


        component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_width - (page_width - event_clientX) - page_left_width)  + "px";
        component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_width - (page_width - event_clientX) - page_left_width)  + "px";

        component.set('v.click_last_middle_region_width', (page_width - (page_width - event_clientX) - page_left_width));
        component.set('v.click_last_right_region_width', (page_width - event_clientX));
        break;
    }
  },

  dropLeft : function (component, event, helper) {
    var droplineId = component.get('v.startId');
    console.log('####### click left droplineId: ' + droplineId);
    if (droplineId == 'flex-page-sidebar-line-right' || droplineId == '' || droplineId == undefined || droplineId == null) {
      return false;
    }

    var event_clientX = event.clientX; 
    var page_width = $('#flex-page-box').width();
    var page_right_width = $('#flex-page-box-content-right').width();

    component.find("flex-page-box-content-left-parent-id").getElement().style.width = event_clientX + "px";
    component.find('flex-page-sidebar-line-left').getElement().style.left = event_clientX + "px";
    component.find('flex-page-sidebar-line-left-button').getElement().style.left = (event_clientX - 25) + "px";

    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_width - page_right_width - event_clientX)  + "px";
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_width - page_right_width - event_clientX)  + "px";
  },

  dropRight: function (component, event, helper) {
    var droplineId = component.get('v.startId');
    console.log('####### click right droplineId: ' + droplineId);
    console.log('####### click right droplineId start val: ' + droplineId);
    console.log('####### val: ' + (droplineId === 'flex-page-sidebar-line-left' || !$A.util.isUndefinedOrNull(droplineId)));
    // if (droplineId === 'flex-page-sidebar-line-left' || !$A.util.isUndefinedOrNull(droplineId)) {
    //   return false;
    // }
    var event_clientX = event.clientX; 
    var page_width = $('#flex-page-box').width();
    var page_left_width = $('#flex-page-box-content-left').width();
    component.find("flex-page-box-content-right-parent-id").getElement().style.width = (page_width - event_clientX) + "px";
    component.find('flex-page-sidebar-line-right').getElement().style.right = (page_width - event_clientX) + "px";
    component.find('flex-page-sidebar-line-right-button').getElement().style.right = ((page_width - event_clientX) - 25) + "px";
    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_width - (page_width - event_clientX) - page_left_width)  + "px";
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_width - (page_width - event_clientX) - page_left_width)  + "px";
  },

  showLeftCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-sidebar-line-left-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-button-left');
    $A.util.addClass(cmpTargetButton, 'drag-element-button-left-show');

    var cmpTargetLine = component.find('flex-page-sidebar-line-left');
    $A.util.removeClass(cmpTargetLine, 'drag-element-left');
    $A.util.addClass(cmpTargetLine, 'drag-element-left-show');
  },

  hiddenLeftCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-sidebar-line-left-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-button-left-show');
    $A.util.addClass(cmpTargetButton, 'drag-element-button-left');

    var cmpTargetLine = component.find('flex-page-sidebar-line-left');
    $A.util.removeClass(cmpTargetLine, 'drag-element-left-show');
    $A.util.addClass(cmpTargetLine, 'drag-element-left');
  },

  showRightCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-sidebar-line-right-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-button-right');
    $A.util.addClass(cmpTargetButton, 'drag-element-button-right-show');

    var cmpTargetLine = component.find('flex-page-sidebar-line-right');
    $A.util.removeClass(cmpTargetLine, 'drag-element-right');
    $A.util.addClass(cmpTargetLine, 'drag-element-right-show');
  },

  hiddenRightCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-sidebar-line-right-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-button-right-show');
    $A.util.addClass(cmpTargetButton, 'drag-element-button-right');

    var cmpTargetLine = component.find('flex-page-sidebar-line-right');
    $A.util.removeClass(cmpTargetLine, 'drag-element-right-show');
    $A.util.addClass(cmpTargetLine, 'drag-element-right');
  },

  toggleLeftSection: function (component, event, helper) {
    var page_middle_width = $('#flex-page-box-content-middle-region').width();
    var page_left_width = $('#flex-page-box-content-left-region').width();
    var page_right_width = $('#flex-page-box-content-right-region').width();

    var cmpLeftRegion = component.find('flex-page-box-content-left-parent-id');
    $A.util.removeClass(cmpLeftRegion, 'slds-col slds-size_1-of-1 slds-large-size_3-of-12 intergrated-layout-size-css');
    $A.util.addClass(cmpLeftRegion, 'drag-element-button-left-click-hidden');

    var cmpHiddenLeftRegion = component.find('toggle-left-hidden-region');
    $A.util.removeClass(cmpHiddenLeftRegion, 'drag-element-button-left-click-hidden');

    var cmpMiddleRegion = component.find('flex-page-box-content-middle-parent-id');
    $A.util.removeClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_6-of-12 intergrated-layout-size-css');
    $A.util.addClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_9-of-12 intergrated-layout-size-css');

    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_middle_width + page_left_width) + 'px';
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_middle_width + page_left_width) + 'px';

    component.set('v.click_last_middle_region_width', page_middle_width + page_left_width);
    component.set('v.click_last_left_region_width', page_left_width);
    component.set('v.click_last_right_region_width', page_right_width);
    component.set('v.click_left_region_is_recover', false);
  },

  toggleLeftToRightSection: function (component, event, helper) {
    var previous_page_middle_width = component.get('v.click_last_middle_region_width');
    var previous_page_left_width = component.get('v.click_last_left_region_width');
    var previous_page_right_width = component.get('v.click_last_right_region_width');

    var right_region_check = component.get('v.click_right_region_is_recover');

    var cmpLeftRegion = component.find('flex-page-box-content-left-parent-id');
    $A.util.removeClass(cmpLeftRegion, 'drag-element-button-left-click-hidden');
    $A.util.addClass(cmpLeftRegion, 'slds-col slds-size_1-of-1 slds-large-size_3-of-12 intergrated-layout-css');

    var cmpHiddenLeftRegion = component.find('toggle-left-hidden-region');
    $A.util.addClass(cmpHiddenLeftRegion, 'drag-element-button-left-click-hidden');

    var cmpMiddleRegion = component.find('flex-page-box-content-middle-parent-id');
    $A.util.removeClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_9-of-12 intergrated-layout-size-css');
    $A.util.addClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_6-of-12 intergrated-layout-size-css');
    component.find('flex-page-box-content-left-parent-id').getElement().style.width = previous_page_left_width + 'px';
    component.find('flex-page-sidebar-line-left').getElement().style.left = previous_page_left_width + "px";
    component.find('flex-page-sidebar-line-left-button').getElement().style.left = (previous_page_left_width - 25) + "px";

    var middle_width;
    if (right_region_check) {
      middle_width = (previous_page_middle_width - previous_page_left_width) + 'px';
    } else {
      middle_width = (previous_page_middle_width - previous_page_left_width) + 'px';
    }
    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = middle_width;
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = middle_width;
    component.find('flex-page-box-content-right-parent-id').getElement().style.width = previous_page_right_width;

    component.set('v.click_last_middle_region_width', (previous_page_middle_width - previous_page_left_width));
    component.set('v.click_left_region_is_recover', true);
  },

  toggleRightSection: function (component, event, helper) {
    var page_middle_width = $('#flex-page-box-content-middle-region').width();
    var page_left_width = $('#flex-page-box-content-left-region').width();
    var page_right_width = $('#flex-page-box-content-right-region').width();

    var cmpRightRegion = component.find('flex-page-box-content-right-parent-id');
    $A.util.removeClass(cmpRightRegion, 'slds-col slds-size_1-of-1 slds-large-size_3-of-12 intergrated-layout-css');
    $A.util.addClass(cmpRightRegion, 'drag-element-button-right-click-hidden');

    var cmpHiddenRightRegion = component.find('toggle-right-hidden-region');
    $A.util.removeClass(cmpHiddenRightRegion, 'drag-element-button-right-click-hidden');

    var cmpMiddleRegion = component.find('flex-page-box-content-middle-parent-id');
    $A.util.removeClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_6-of-12 intergrated-layout-size-css');
    $A.util.addClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_9-of-12 intergrated-layout-size-css');

    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = (page_middle_width + page_right_width) + 'px';
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = (page_middle_width + page_right_width) + 'px';

    component.set('v.click_last_middle_region_width', (page_middle_width + page_right_width));
    component.set('v.click_last_left_region_width', page_left_width);
    component.set('v.click_last_right_region_width', page_right_width);
    component.set('v.click_right_region_is_recover', false);
  },

  toggleRightToLeftSection: function (component, event, helper) {
    var previous_page_middle_width = component.get('v.click_last_middle_region_width');
    var previous_page_left_width = component.get('v.click_last_left_region_width');
    var previous_page_right_width = component.get('v.click_last_right_region_width');

    var left_region_check = component.get('v.click_left_region_is_recover');

    var cmpRightRegion = component.find('flex-page-box-content-right-parent-id');
    $A.util.removeClass(cmpRightRegion, 'drag-element-button-right-click-hidden');
    $A.util.addClass(cmpRightRegion, 'slds-col slds-size_1-of-1 slds-large-size_3-of-12 intergrated-layout-css');

    var cmpHiddenrightRegion = component.find('toggle-right-hidden-region');
    $A.util.addClass(cmpHiddenrightRegion, 'drag-element-button-right-click-hidden');

    var cmpMiddleRegion = component.find('flex-page-box-content-middle-parent-id');
    $A.util.removeClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_9-of-12 intergrated-layout-size-css');
    $A.util.addClass(cmpMiddleRegion, 'slds-col slds-size_1-of-1 slds-large-size_6-of-12 intergrated-layout-size-css');
    component.find('flex-page-box-content-right-parent-id').getElement().style.width = previous_page_right_width + 'px';
    component.find('flex-page-sidebar-line-right').getElement().style.right = previous_page_right_width + "px";
    component.find('flex-page-sidebar-line-right-button').getElement().style.right = (previous_page_right_width - 25) + "px";

    var middle_width;
    if (left_region_check) {
      middle_width = (previous_page_middle_width - previous_page_right_width) + 'px';
    } else {
      middle_width = (previous_page_middle_width - previous_page_right_width) + 'px';
    }
    component.find('flex-page-box-content-middle-flex-content').getElement().style.width = middle_width;
    component.find('flex-page-box-content-middle-parent-id').getElement().style.width = middle_width;
    component.find('flex-page-box-content-left-parent-id').getElement().style.width = previous_page_right_width;

    console.log('###### 右向退回左向宽度： ' + (previous_page_middle_width - previous_page_right_width));
    component.set('v.click_last_middle_region_width', (previous_page_middle_width - previous_page_right_width));
    component.set('v.click_right_region_is_recover', true);
  },

  showToggleLeftCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-toggle-left-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-toggle-button-left');
    $A.util.addClass(cmpTargetButton, 'drag-element-toggle-button-left-show');

    var cmpTargetLine = component.find('flex-page-toggle-left');
    $A.util.removeClass(cmpTargetLine, 'drag-element-toggle-left');
    $A.util.addClass(cmpTargetLine, 'drag-element-toggle-left-show');
  },

  hiddenToggleLeftCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-toggle-left-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-toggle-button-left-show');
    $A.util.addClass(cmpTargetButton, 'drag-element-toggle-button-left');

    var cmpTargetLine = component.find('flex-page-toggle-left');
    $A.util.removeClass(cmpTargetLine, 'drag-element-toggle-left-show');
    $A.util.addClass(cmpTargetLine, 'drag-element-toggle-left');
  },

  showToggleRightCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-toggle-right-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-toggle-button-right');
    $A.util.addClass(cmpTargetButton, 'drag-element-toggle-button-right-show');

    var cmpTargetLine = component.find('flex-page-toggle-right');
    $A.util.removeClass(cmpTargetLine, 'drag-element-toggle-right');
    $A.util.addClass(cmpTargetLine, 'drag-element-toggle-right-show');
  },

  hiddenToggleRightCollpaseButton : function(component, event, helper) {
    var cmpTargetButton = component.find('flex-page-toggle-right-button');
    $A.util.removeClass(cmpTargetButton, 'drag-element-toggle-button-right-show');
    $A.util.addClass(cmpTargetButton, 'drag-element-toggle-button-right');

    var cmpTargetLine = component.find('flex-page-toggle-right');
    $A.util.removeClass(cmpTargetLine, 'drag-element-toggle-right-show');
    $A.util.addClass(cmpTargetLine, 'drag-element-toggle-right');
  },

});