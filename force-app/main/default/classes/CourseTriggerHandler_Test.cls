@isTest
public with sharing class CourseTriggerHandler_Test {
    @isTest
    public static void UnitTest() {
        // Course Sobject
        List<Course__c> courseList = new List<Course__c>();
        Course__c course1 = new Course__c(
            Name = '[107] Introduction to Programming',                        // Course Name
            Course_Description__c = 'Learn the basics of programming with OOP',  // Course Description
            Status__c = 'Active',                                               // Status
            Duration__c = 5                                                   // Duration
        );
        courseList.add(course1);

        Course__c course2 = new Course__c(
            Name = '[105] Introduction to Programming',                        // Course Name
            Course_Description__c = 'Learn the basics of programming with OOP',  // Course Description
            Status__c = 'Active',                                               // Status
            Duration__c = 5                                                   // Duration
        );
        courseList.add(course2);
        insert courseList;

        // Course_Delivery__c Sobject
        List<Course_Delivery__c> courseDeliveryList = new List<Course_Delivery__c>();
        Course_Delivery__c course_delivery1 = new Course_Delivery__c(
            Name = 'Course Delivery Test Data 1.0',    // Course Delivery Name
            Start_Date__c = Date.newInstance(2022, 10, 21),  // Start Date
            Status__c = 'Scheduled',                     // Status
            Course__c = courseList[0].Id                     // Course
        );
        courseDeliveryList.add(course_delivery1);

        Course_Delivery__c course_delivery2 = new Course_Delivery__c(
            Name = 'Course Delivery Test Data 2.0',    // Course Delivery Name
            Start_Date__c = Date.newInstance(2022, 10, 23),  // Start Date
            Status__c = 'Scheduled',                     // Status
            Course__c = courseList[1].Id                      // Course
        );
        courseDeliveryList.add(course_delivery2);
        insert courseDeliveryList;

        // Course_Attendees__c
        // Course_Attendees__c course_attendees1 = new Course_Attendees__c(
        //     Name = 'Course Attendees Test Data op1.0',
        //     Status__c = 'Enrolled',
        //     Course_Delivery__c = courseDeliveryList[0].Id
        // );
        // insert course_attendees1;

        courseList[0].Status__c = 'Retired';
        courseList[1].Status__c = 'Retired';
        update courseList;
    }
}