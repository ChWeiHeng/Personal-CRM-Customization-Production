({
  // navigation to search detail
  navigateToSearchResult: function(component, event, helper) {
    var searchParam = component.get("v.searchText");
    if(searchParam != '' && searchParam != undefined) {
      var navService = component.find("navService");
      var pageReference = {
        type: "comm__namedPage",
        attributes: {
          pageName: "search-result"    
        },
        state: {
          c__searchText: searchParam
        }
      };
      component.set("v.pageReference", pageReference);
      sessionStorage.setItem('searchText', JSON.stringify(pageReference.state));
      // Uses the pageReference definition in the init handler
      navService.navigate(pageReference);
    } else {
      return;
    }
  },
});