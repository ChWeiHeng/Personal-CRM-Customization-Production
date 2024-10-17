({
    handleClick : function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    },
    init: function (cmp, event, helper) {
        cmp.set('v.mycolumns', [
            { label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
            {
                label: 'Confidence',
                fieldName: 'confidence',
                type: 'percent',
                cellAttributes: { iconName: { fieldName: 'trendIcon' },
                iconPosition: 'right' }
            },
            {
                label: 'Amount',
                fieldName: 'amount',
                type: 'currency',
                typeAttributes: { currencyCode: 'EUR'}
            },
            { label: 'Contact Email', fieldName: 'contact', type: 'email'},
            { label: 'Contact Phone', fieldName: 'phone', type: 'phone'}
        ]);

            cmp.set('v.mydata', [{
                    id: 'a',
                    opportunityName: 'Cloudhub',
                    confidence: 0.2,
                    amount: 25000,
                    contact: 'jrogers@cloudhub.com',
                    phone: '2352235235',
                    trendIcon: 'utility:down'
                },
                {
                    id: 'b',
                    opportunityName: 'Quip',
                    confidence: 0.78,
                    amount: 740000,
                    contact: 'quipy@quip.com',
                    phone: '2352235235',
                    trendIcon: 'utility:up'
            }]);
    },
    getSelectedName: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].opportunityName);
        }
    },
    cance11: function(cmp, event) {
        console.log("success");
        $A.util.removeClass(cmp.find('changeIt'), "slds-fade-in-open");
        $A.util.removeClass(cmp.find('changeZz'), "slds-backdrop_open");
    },
    save1: function(cmp, event) {
        console.log("success");
        $A.util.addClass(cmp.find('changeIt'),"slds-fade-in-open");
        $A.util.addClass(cmp.find('changeZz'),"slds-backdrop_open");
    },
})