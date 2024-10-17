public with sharing class TechnicianStatus_CX {

    /**
     *  This Extension Controller is used to extend
     *  the functionality of the TechnicianStatusExtended
     *  page. It includes multiple methods used to redirect
     *  users to Contact edit pages. It also includes an
     *  attendeeList string which is built when a user
     *  hovers over one of the Course Delivery Dates
     *  listed in the Course Listing table.
     */

    private final Contact contact;
    private ApexPages.StandardController sController;

    // Constructor used to get the Account record
    public TechnicianStatus_CX(ApexPages.StandardController stdController) {
        sController = stdController;
        this.contact = (Contact)stdController.getRecord();
    }

    // This method returns the results from the call to the edit action
    // on the StandardController which returns a PageReference associated
    // with the Contacts standard edit page. It is basically the same
    // thing as calling the edit action on the Visualforce page, except
    // we are doing the call in the Apex code. The advantage to doing it
    // this way, is we could also do additional things here in the code
    // before we returned the PageReference.
    public PageReference editContact2() {
        return sController.edit();
    }

    // This method redirects the user to the edit page by creating
    // a PageReference and specifying the partial URL; It also
    // includes the retURL parameter in the URL so that if the user
    // cancels from the Edit page, they will be redirected back
    // to the TechnicianStatus page and not the Home page
    public PageReference editContact3() {
        // Test to navigation to out url
        String retUrl = '/apex/TechnicianStatusPage?id=' + contact.Id;
        return new PageReference('/' + contact.Id + '/e' + '?retURL=' + retUrl);
    }

    // List of Course Attendees associated with the Course Delivery Date that the user hovers over
    public String getAttendeeList() {
        String cdId = ApexPages.currentPage().getParameters().get('courseDeliveryId');
        return buildAttendeeList(cdId);
    }

    public String buildAttendeeList(String cdId) {
        String retString;
        if (!String.isBlank(cdId)) {
            Integer count = 0;
            List<Course_Attendee__c> courseAttendees = new List<Course_Attendee__c>([
                                          SELECT Student__r.Name
                                            FROM Course_Attendee__c
                                           WHERE Course_Delivery__c = :cdId]);
            for (Course_Attendee__c ca : courseAttendees) {
                if (count == 0) {
                    retString = 'Attendees: ';
                    count++;
                }
                if (ca.Student__r.Name != null) {
                    if (count < courseAttendees.size()) {
                        retString = retString + ca.Student__r.Name + ', ';
                    } else {
                        retString = retString + ca.Student__r.Name;
                    }
                    count++;
                } else {
                    List<Course_Attendee__c> courseAttendees2 = getRelatedCourseAttendees(cdId);
                    if (count < courseAttendees2.size()) {
                        retString = retString + ca.Student__r.Name + ', ';
                    } else {
                        retString = retString + ca.Student__r.Name;
                    }
                }
            }
        }
        return retString;
    }

    public static List<Course_Attendee__c> getRelatedCourseAttendees (String paramId) {
        List<Course_Attendee__c> final_return_course_attendee = new List<Course_Attendee__c>();
        if (String.isNotBlank(paramId)) {
            List<Course_Attendee__c> returnCourseList = [ SELECT Id, Name, Student__c, Student__r.Name FROM Course_Attendee__c WHERE Course_Delivery__c = :paramId ];
            if (returnCourseList != null && returnCourseList.size() > 0) {
                Map<String,List<Course_Attendee__c>> cd2CourseAttendeeMap = new Map<String,List<Course_Attendee__c>>();
                String keyNum = 'Crat Provious Number: ';
                List<Course_Attendee__c> insCourseAttendeeList = new List<Course_Attendee__c>();
                for (Course_Attendee__c course_attendee : returnCourseList) {
                    if (course_attendee.Student__c != null && course_attendee.Student__r.Name == 'Course Attendees Provious Stu') {
                        keyNum += course_attendee.Id + ' ,';
                        insCourseAttendeeList.add(course_attendee);
                    }
                }
                cd2CourseAttendeeMap.put(keyNum, insCourseAttendeeList);

                List<Course_Attendee__c> active_course_attendeeList = new List<Course_Attendee__c>();
                List<Course_Attendee__c> unactive_course_attendeeList = new List<Course_Attendee__c>();
                List<Course_Attendee__c> other_course_attendeeList = new List<Course_Attendee__c>();
                for (String key : cd2CourseAttendeeMap.keySet()) {
                    Date ruleSpecialDate = Date.today().addMonths(12).addDays(1);
                    for (Course_Attendee__c course_attden : cd2CourseAttendeeMap.get(key)) {
                        if (course_attden.Status__c == 'Active') {
                            if (course_attden.Completion_Date__c.addMonths(12) > ruleSpecialDate) {
                                active_course_attendeeList.add(course_attden);
                            } else {
                                other_course_attendeeList.add(course_attden);
                            }
                        } else if (course_attden.Status__c == 'UnActive') {
                            if (course_attden.Completion_Date__c.addMonths(12) == ruleSpecialDate) {
                                unactive_course_attendeeList.add(course_attden);
                            } else {
                                other_course_attendeeList.add(course_attden);
                            }
                        } else {
                            other_course_attendeeList.add(course_attden);
                        }
                    }
                }
                final_return_course_attendee.addAll(active_course_attendeeList);
                final_return_course_attendee.addAll(unactive_course_attendeeList);
                final_return_course_attendee.addAll(other_course_attendeeList);
            }
        }
        return final_return_course_attendee;
    }
}