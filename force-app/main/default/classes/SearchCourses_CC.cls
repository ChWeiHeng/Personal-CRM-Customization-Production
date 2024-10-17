public with sharing class SearchCourses_CC {

     /**
     *  This controller is used by both the SearchCoursesPage and ListCourseDeliveriesPage
     *  VF pages. Users will select courses using the checkboxes and then click
     *  to see the upcoming course deliveries for those courses.
     */

    // Represents the main course list
    public List<CourseWrapper> courseList {
        get {
            if (courseList == null) {
                courseList = new List<CourseWrapper>();
                for (Course__c course : [SELECT Name, Certification__r.Name, Duration__c, Status__c
                                           FROM Course__c]) {
                    courseList.add(new CourseWrapper(course));
                }
            }
            return courseList;
        }
        set;
    }

    // Contains only the course selected
    public Map<Id, CourseWrapper> selectedCourses {
        get {
            if (selectedCourses == null) {
                selectedCourses = new Map<Id, CourseWrapper>();
            }
            return selectedCourses;
        }
        set;
    }

    // Action that is triggered from the "See Upcoming Course Deliveries" button
    public PageReference listDeliveries() {

        // First clear out any previously selected courses
        selectedCourses.clear();

        // Add the newly selected courses to the map
        for (CourseWrapper cw : courseList) {
            if (cw.checked) {
                selectedCourses.put(cw.course.Id, cw);
            }
        }

        /** TODO #1: Write an If-else statement that implements the following algorithm:
         *             -- If the size of the selectedCourses property is greater than 0
         *                -- return Page.ListCourseDeliveriesPage
         *             -- else:
         *                -- call the addMessage method of the ApexPages class passing in
         *                   a newly constructed instance of the ApexPages.message class.
         *                   The ApexPages.Message class constructor should be passed
         *                   two parameters:
         *                   -- the enumerated value ApexPages.Severity.ERROR
         *                   -- the String 'Please select at least one Course'
         *                   -- return null
         */
        if (selectedCourses.size() > 0) {
            return Page.ListCourseDeliveriesPage;
        } else {
            ApexPages.addMessage(new ApexPages.message(ApexPages.Severity.ERROR, 'Please select at least one Course'));
            return null;
        }

    }

    // List of all course Deliveries
    public List<Course_Delivery__c> deliveries {
        get {
            if (deliveries == null) {
                deliveries = new List<Course_Delivery__c>([
                                     SELECT Name, Course__r.Name, Instructor__r.Name, Location__c, Start_Date__c, Status__c
                                       FROM Course_Delivery__c
                                      WHERE Course__c IN :selectedCourses.keySet()
                                        AND Status__c != 'Cancelled' and Start_Date__c >= TODAY
                                   ORDER BY Start_Date__c]);
            }
            List<Course_Delivery__c> course_deliverys = [ SELECT Id, Name, Course__r.Name, Instructor__r.Name, Location__c, Start_Date__c, Status__c FROM Course_Delivery__c WHERE Course__c IN :selectedCourses.keySet() ORDER BY Start_Date__c ];
            if (course_deliverys != null && course_deliverys.size() > 0) {
                Map<String,List<Course_Delivery__c>> courseDeliveryEnrooledMap = new Map<String,List<Course_Delivery__c>>();
                Map<String,List<Course_Delivery__c>> courseDeliveryScheduledMap = new Map<String,List<Course_Delivery__c>>();
                for (Course_Delivery__c course_d : course_deliverys) {
                    String dropKey = 'Enrooled Temp Course Deliverys: ';
                    List<Course_Delivery__c> tempDeliverys = new List<Course_Delivery__c>();
                    if (course_d.Start_Date__c >= Date.today().addMonths(7).addDays(1)) {
                        if (course_d.Status__c == 'Enrolled') {
                            dropKey += 'Enrolled: ' + course_d.Id + ', ';
                            tempDeliverys.add(course_d);
                        } else if (course_d.Status__c == 'Scheduled') {
                            dropKey += 'Scheduled: ' + course_d.Id + ', ';
                            tempDeliverys.add(course_d);
                        }
                        courseDeliveryEnrooledMap.put(dropKey, tempDeliverys);
                    } else {
                        if (course_d.Status__c == 'Retired') {
                            dropKey += 'Retired: ' + course_d.Id + ', ';
                            tempDeliverys.add(course_d);
                        } else if (course_d.Status__c == 'Canceled') {
                            dropKey += 'Canceled: ' + course_d.Id + ', ';
                            tempDeliverys.add(course_d);
                        }
                        courseDeliveryScheduledMap.put(dropKey, tempDeliverys);
                    }
                }
                System.debug('###### courseDeliveryEnrooledMap: ' + courseDeliveryEnrooledMap);
                System.debug('###### courseDeliveryScheduledMap: ' + courseDeliveryScheduledMap);
            }
            return deliveries;
        }
        set;
    }

    // Action that is fired from the ListCourseDeliveriesPage page to return to do a "New Search"
    public PageReference newSearch() {
        PageReference newPage = Page.SearchCoursesPage;
        newPage.setRedirect(true);
        return newPage;
    }

    // Wrapper class
    public class CourseWrapper {
        public Course__c course {get; set;}
        public Boolean checked {get; set;}

        public CourseWrapper(Course__c c) {
            course = c;
            checked = false;
        }
    }

}