public with sharing class QceeSendEmailTemplateController {
    private final List<Opportunity> opportunity;

    public QceeSendEmailTemplateController() {
        opportunity = [ SELECT Id, Name FROM Opportunity ];
    }

    public List<Opportunity> getOpportunitys() {
        System.debug('$$$ opportunity: ' + opportunity);
		return opportunity;
	}
}