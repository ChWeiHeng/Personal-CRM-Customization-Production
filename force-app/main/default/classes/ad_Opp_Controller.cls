public class ad_Opp_Controller {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityList() {
        return [ Select Id, StageName from Opportunity ];
    }
}