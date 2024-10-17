({
    init: function(cmp, evt, hlp) {
        var myPageRef = cmp.get("v.pageReference");
        var name = myPageRef && myPageRef.state ? myPageRef.state.c__name : "World";
        cmp.set("v.name", name);
    },
    handlePageChange: function(cmp, evt, hlp) {
        var myPageRef = cmp.get("v.pageReference");
        var name = myPageRef && myPageRef.state ? myPageRef.state.c__name : "World";
        cmp.set("v.name", name);
    }
})