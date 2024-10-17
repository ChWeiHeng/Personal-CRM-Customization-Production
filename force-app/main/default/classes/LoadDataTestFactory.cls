public class LoadDataTestFactory {
	public static Holiday createHoliday () {
        Holiday hol = new Holiday();
        hol.Name='Test holiday';
        hol.activitydate = Date.newInstance(Date.today().year(), 12, 31);
        insert hol;
        return hol;
    }

    public static List<User> createUsers () {
        String orgId = UserInfo.getOrganizationId();
        String dateString = String.valueOf(Datetime.now())
            .replace(' ', '')
            .replace(':', '')
            .replace('-', '');
        String randomIntString = String.valueOf(Crypto.getRandomInteger());
        Profile p = [
            SELECT Id, Name
            FROM Profile
            WHERE
                UserType = 'Standard'
                AND PermissionsCustomizeApplication = true
        ][0];
        List<User> returnUsers = new List<User>();
        User u = new User(
            UserName = 'test@' + orgId + dateString + randomIntString + '.org',
            Email = 'test@' + orgId + dateString + randomIntString + '.org',
            LastName = 'test',
            Alias = 'test',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'ISO-8859-1',
            LanguageLocaleKey = 'en_US',
            ProfileId = p.Id,
            UserPermissionsKnowledgeUser = true
        );
        returnUsers.add(u);
        insert returnUsers;
        return returnUsers;
    }

    public static List<Account> loadAccounts () {
        // The record type Id is replaced with the RecordTypeId in the personal environment
        List<Account> loadAccounts = new List<Account>();
        Account acc1 = new Account(
            Name = 'Test Account 1.0',
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('SingleRecordType').getRecordTypeId()
        );
        loadAccounts.add(acc1);
       // The record type Id is replaced with the RecordTypeId in the personal environment
        Account acc2 = new Account(
            Name = 'Test Account 2.0',
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('SingleRecordType').getRecordTypeId()
        );
        loadAccounts.add(acc2);
        // The record type Id is replaced with the RecordTypeId in the personal environment
        Account acc3 = new Account(
            Name = 'Test Account 3.0',
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('SingleRecordType').getRecordTypeId()
        );
        loadAccounts.add(acc3);
        insert loadAccounts;
        return loadAccounts;
    }

    public static List<Contact> loadContacts () {
        Id techRecId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Technician').getRecordTypeId();
        List<Contact> loadContacts = new List<Contact>();
        List<Account> queryAccounts = [ SELECT Id, Name FROM Account LIMIT 3 ];
        Contact contact1 = new Contact(
            AccountId = queryAccounts[0].ID,
            FirstName = 'test1',
            LastName = 'test1',
            email = 'test@dcit1.com',
            birthdate = Date.newInstance(1992, 04, 12),
            Status__c = 'Active',
            RecordTypeId = techRecId
        );
        loadContacts.add(contact1);
        Contact contact2 = new Contact(
            AccountId = queryAccounts[1].ID,
            FirstName = 'test2',
            LastName = 'test2',
            email = 'test@dcit2.com',
            birthdate = Date.newInstance(1993, 04, 12),
            Status__c = 'Active',
            RecordTypeId = techRecId
        );
        loadContacts.add(contact2);
        Contact contact3 = new Contact(
            AccountId = queryAccounts[1].ID,
            FirstName = 'test3',
            LastName = 'test3',
            email = 'test@dcit3.com',
            birthdate = Date.newInstance(1994, 04, 12),
            Status__c = 'Active',
            RecordTypeId = techRecId
        );
        loadContacts.add(contact3);
        insert loadContacts;
        return loadContacts;
    }

    public static List<Certification__c> loadCertifications () {
        List<Certification__c> loadCertifications = new List<Certification__c>();
        Certification__c certification1 = new Certification__c(
            Name = 'Certification Test Data 1.0'
        );
        loadCertifications.add(certification1);
        Certification__c certification2 = new Certification__c(
            Name = 'Certification Test Data 2.0'
        );
        loadCertifications.add(certification2);
        Certification__c certification3 = new Certification__c(
            Name = 'Certification Test Data 3.0'
        );
        loadCertifications.add(certification3);
        insert loadCertifications;
        return loadCertifications;
    }

    public static List<Course__c> loadCourses () {
        List<Course__c> loadCourses = new List<Course__c>();
        Course__c course1 = new Course__c(
            Name = 'Course Test Data 1.0',
            Status__c = 'Active'
        );
        loadCourses.add(course1);
        Course__c course2 = new Course__c(
            Name = 'Course Test Data 2.0',
            Status__c = 'Active'
        );
        loadCourses.add(course2);
        Course__c course3 = new Course__c(
            Name = 'Course Test Data 3.0',
            Status__c = 'Active'
        );
        loadCourses.add(course3);
        insert loadCourses;
        return loadCourses;
    }

    public static List<Course_Delivery__c> loadCourseDeliveries () {
        List<Course__c> queryCourseData = [ SELECT Id, Name FROM Course__c LIMIT 3 ];
        List<Course_Delivery__c> loadCourseDeliverys = new List<Course_Delivery__c>();
        Course_Delivery__c courseDel1 = new Course_Delivery__c(
            Name = 'Course Delivery Test Data 1.0',
            Status__c = 'Scheduled',
            Course__c = queryCourseData[0].Id
        );
        loadCourseDeliverys.add(courseDel1);
        Course_Delivery__c courseDel2 = new Course_Delivery__c(
            Name = 'Course Delivery Test Data 2.0',
            Status__c = 'Scheduled',
            Course__c = queryCourseData[1].Id
        );
        loadCourseDeliverys.add(courseDel2);
        Course_Delivery__c courseDel3 = new Course_Delivery__c(
            Name = 'Course Delivery Test Data 3.0',
            Status__c = 'Scheduled',
            Course__c = queryCourseData[2].Id
        );
        loadCourseDeliverys.add(courseDel3);
        insert loadCourseDeliverys;
        return loadCourseDeliverys;
    }

    public static List<Course_Attendee__c> loadCourseAttendees () {
        List<Course_Delivery__c> loadCourseDeliverys = [ SELECT Id, Name FROM Course_Delivery__c ];
        System.debug('###### loadCourseDeliverys: ' + loadCourseDeliverys);
        Student__c studentObj = new Student__c();
        studentObj.Name = 'Test Student 1.0';
        insert studentObj;
        List<Course_Attendee__c> returnCourseAttendees = new List<Course_Attendee__c>();
        Course_Attendee__c courseAttendee1 = new Course_Attendee__c(
            Name = 'Course Attendees Test Data 1.0',
            Status__c = 'Retired',
            Student__c = studentObj.Id,
            Course_Delivery__c = loadCourseDeliverys[0].Id
        );
        returnCourseAttendees.add(courseAttendee1);
        Course_Attendee__c courseAttendee2 = new Course_Attendee__c(
            Name = 'Course Attendees Test Data 2.0',
            Status__c = 'Retired',
            Student__c = studentObj.Id,
            Course_Delivery__c = loadCourseDeliverys[1].Id
        );
        returnCourseAttendees.add(courseAttendee2);
        Course_Attendee__c courseAttendee3 = new Course_Attendee__c(
            Name = 'Course Attendees Test Data 3.0',
            Status__c = 'Retired',
            Student__c = studentObj.Id,
            Course_Delivery__c = loadCourseDeliverys[2].Id
        );
        returnCourseAttendees.add(courseAttendee3);
        insert returnCourseAttendees;

        List<Contact> updateContacts = [ SELECT Id, Name, Course_Attendees__c FROM Contact ];
        updateContacts[0].Course_Attendees__c = returnCourseAttendees[0].Id;
        updateContacts[1].Course_Attendees__c = returnCourseAttendees[1].Id;
        updateContacts[2].Course_Attendees__c = returnCourseAttendees[2].Id;
        update updateContacts;

        return returnCourseAttendees;
    }
}