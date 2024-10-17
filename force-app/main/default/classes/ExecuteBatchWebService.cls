/**
*@Author: Chendong
*@Date: 2021.04.26
*@Method1: dispatch batch by className
*@Method2: query jobStatus by className & second
*@Method3: stop job run status by className
*/
global class ExecuteBatchWebService {
    global ExecuteBatchWebService() {

    }

    global Class GetObjectResult {
        Webservice String resultMsg = ''; // Return error message 
        Webservice String resultStatus = ''; // Return dispatch status
        WebService String resultCode = ''; // Return status code apply to queryJobStatusByClassName
        WebService String resultJobStatus = ''; // Return custom status apply to queryJobStatusByClassName
    }

    // Send classname dispatch batchclass
    webservice static GetObjectResult executeBatchByParamPost(String className) {
        // Declare the inner class and use it
        GetObjectResult GetObjectResult = new GetObjectResult();
        // Define return error message
        String errMsg;
        // Determines whether the parameter is null
        if(String.isNotBlank(className)) {
            // Get className Str first className 
            String executeClassName = className.split(',')[0];
            System.debug('executeClassName: ' + executeClassName);
            // Converts the incoming string to a type
            Type specifiedClass = Type.forName(executeClassName);
            // Converts the instantiated type strongly to the specified type
            Database.Batchable<sObject> specifiedBatchClass = (Database.Batchable<sObject>)specifiedClass.newInstance();
            try {
                // Get execute batch id
                Id JobId = Database.executeBatch(specifiedBatchClass);
                // Fill return message
                GetObjectResult.resultMsg = '';
                // Fill return status
                GetObjectResult.resultStatus = 'Success';
                // Return inner class
                return GetObjectResult;
            } catch (Exception e) {
                // Catch exception message
                errMsg = e.getMessage();
                // Fill return error message
                GetObjectResult.resultMsg = errMsg;
                // Fill return status
                GetObjectResult.resultStatus = 'Failure';
                 // Return inner class
                return GetObjectResult;
            }

        } else {
            // Fill return error message
            GetObjectResult.resultMsg = 'Please check that the parameters are correct!';
            // Fill return status
            GetObjectResult.resultStatus = 'Failure';
            // Return inner class
            return GetObjectResult;
        }
    }

    // Send className query jobStatus
    webservice static GetObjectResult queryJobStatusByClassName(String className, Integer rangeTime) {
        // Declare the inner class and use it
        GetObjectResult GetObjectResult = new GetObjectResult();
        // Determines whether the parameter is null
        if(String.isNotBlank(className) && rangeTime > 0) {
            try {  
                // Query job status vlaue by param
                List<String> classList = className.split(',');
                // Define now dateTime
                DateTime startDateTime = Datetime.now();
                // Define now dateTime - rangeTime
                DateTime endDateTime = startDateTime.addSeconds(rangeTime * -1);
                Integer normalNum = 0; // 正常終了
                Integer warningNum = 0; // 警告終了
                Integer abnormalNum = 0; // 異常終了
                Integer disposeNum = 0; // 処理中
                Integer unLaunchNum = 0; // 未起動
                Integer endFlag = 1; // Final mark
                Integer commpletedEnd = 0; // End commpleted
                Integer unCommpletedEnd = 0; // End unCommpleted
                Integer launchStart = 0; // Start launch
                Integer unLaunchStart = 0; // Start unLaunch
                Map<String,AsyncApexJob> getLastCommpletedMap = new Map<String,AsyncApexJob>();
                Boolean lastFlag = false;
                for(String strClassName : classList) {
                    // Get data by getJobData()
                    List<AsyncApexJob> jobList = getJobData(strClassName, startDateTime, endDateTime);
                    System.debug('jobList: ' + jobList);
                    if(null != jobList && jobList.size() > 0) {
                        // Add status value
                        for (AsyncApexJob asyncJob : jobList) {
                            // Gets the last value in each large loop --- Key: className value: AsyncApexJob
                            if(asyncJob == jobList.get(jobList.size() - 1)) {
                                getLastCommpletedMap.put(strClassName, asyncJob);
                            }
                            // Deal with the first
                            if(endFlag == 1) { 
                                if(asyncJob.Status != null && asyncJob.Status != '') {
                                    launchStart++;
                                } else {
                                    unLaunchStart++;
                                }
                                endFlag++;
                            }
                            // Deal with the body 
                            if(asyncJob.Status == 'Completed' && asyncJob.NumberOfErrors == 0) { // 正常終了
                                normalNum++;
                            } else if(asyncJob.Status == 'Completed' && asyncJob.NumberOfErrors > 0) { // 警告終了
                                warningNum++;
                            } else if(asyncJob.Status == 'Failed' || asyncJob.Status == 'Aborted') { // 異常終了
                                abnormalNum++;
                            } else if(asyncJob.Status == 'Holding' || asyncJob.Status == 'Queued' || asyncJob.Status == 'Preparing' || asyncJob.Status == 'Processing') { // 処理中
                                disposeNum++;
                            } else if(asyncJob.Status == null || asyncJob.Status == '') { // 未起動
                                unLaunchNum++;
                            }
                            // Deal with the End
                            if(strClassName == classList.get(classList.size() - 1)) {
                                if(asyncJob.Status == 'Completed') { 
                                    commpletedEnd++;
                                } else {
                                    unCommpletedEnd++;
                                }
                            }
                        }
                    }
                }
                // Determine the population status and code values
                if((commpletedEnd > 0 && unCommpletedEnd == 0) && (normalNum >= 1 && warningNum == 0 && abnormalNum == 0 && disposeNum == 0 && unLaunchNum == 0)) { // 正常終了
                    GetObjectResult.resultJobStatus = '正常終了';
                    GetObjectResult.resultCode = '0';
                } else if((commpletedEnd > 0 && unCommpletedEnd == 0) && (normalNum >= 0 && warningNum >= 1 && abnormalNum == 0 && disposeNum == 0 && unLaunchNum == 0)) { // 警告終了
                    GetObjectResult.resultJobStatus = '警告終了';
                    GetObjectResult.resultCode = '1';
                } else if((commpletedEnd > 0 && unCommpletedEnd == 0) && (normalNum >= 0 && warningNum >= 0 && abnormalNum >= 1 && disposeNum == 0 && unLaunchNum == 0)) { // 異常終了
                    GetObjectResult.resultJobStatus = '異常終了';
                    GetObjectResult.resultCode = '9';
                } else if((commpletedEnd == 0 && unCommpletedEnd > 0) && (launchStart > 0 && unLaunchStart == 0)) { // 処理中
                    GetObjectResult.resultJobStatus = '処理中';
                    GetObjectResult.resultCode = '10';
                } else if((commpletedEnd == 0 && unCommpletedEnd > 0) && (launchStart == 0 && unLaunchStart > 0)) { // 未起動
                    GetObjectResult.resultJobStatus = '未起動';
                    GetObjectResult.resultCode = '11';
                }
                // Fill return message
                GetObjectResult.resultMsg = '';
                // Fill return status
                GetObjectResult.resultStatus = 'Success';
                // Return inner class
                return GetObjectResult;
            } catch (Exception e) {
                // Fill error message
                GetObjectResult.resultMsg = e.getMessage();
                // Fill return status
                GetObjectResult.resultStatus = 'Failure';
                // Return inner class
                return GetObjectResult;
            }
        } else {
            // Fill error message
            GetObjectResult.resultMsg = 'Please check that the parameters are correct!';
            // Fill return status
            GetObjectResult.resultStatus = 'Failure';
            // Return inner class
            return GetObjectResult;
        }
    }

    // Send className stop the batch method
    webservice static GetObjectResult stopExecuteBatchByClassName(String className) {
        // define return message 
        GetObjectResult GetObjectResult = new GetObjectResult();
        if(String.isNotBlank(className)) {
            // Get className list
            List<String> strClassList = className.split(',');
            try {
                for(String strClass : strClassList) {
                    // Get data by getStopJobData()
                    List<AsyncApexJob> stopJobList = getStopJobData(strClass);
                    // Dispatch number
                    Integer disposeCount = 0;
                    if(null != stopJobList && stopJobList.size() > 0) {
                        // add status value
                        for (AsyncApexJob stopAsyncJob : stopJobList) {
                            if(stopAsyncJob.Status == 'Holding' || stopAsyncJob.Status == 'Queued' || stopAsyncJob.Status == 'Preparing' || stopAsyncJob.Status == 'Processing') {
                                // stop batch
                                System.abortJob(stopAsyncJob.Id);
                                disposeCount++;
                            }
                        }
                        if(disposeCount > 0) { // Fill return status
                            GetObjectResult.resultStatus = 'Success';
                        } else { // Fill error message
                            GetObjectResult.resultStatus = 'Failure';
                            GetObjectResult.resultMsg = 'No batch can be stopped!';
                        }
                    }
                }
                // Return inner class
                return GetObjectResult;
            } catch (Exception e) {
                // Fill error message
                GetObjectResult.resultMsg = e.getMessage();
                // Fill return status
                GetObjectResult.resultStatus = 'Failure';
                // Return inner class
                return GetObjectResult;
            }
        } else {
            // Fill error message
            GetObjectResult.resultMsg = 'Please check that the parameters are correct!';
            // Fill return status
            GetObjectResult.resultStatus = 'Failure';
            // Return inner class
            return GetObjectResult;
        }
    }

    // Query asyncApexJob data By className endDateTime startDateTime
    global static List<AsyncApexJob> getJobData(String executeClassName, Datetime startDateTime, Datetime endDateTime) {
        List<AsyncApexJob> jobList = [ SELECT 
                                        Id, 
                                        JobType, 
                                        ApexClassId, 
                                        Status, 
                                        JobItemsProcessed, 
                                        TotalJobItems, 
                                        NumberOfErrors, 
                                        CompletedDate, 
                                        MethodName, 
                                        ExtendedStatus, 
                                        ParentJobId, 
                                        LastProcessed, 
                                        LastProcessedOffset 
                                        FROM AsyncApexJob 
                                        WHERE ApexClass.Name =: executeClassName
                                        AND CreatedDate >=: endDateTime
                                        AND CreatedDate <=: startDateTime ORDER BY CreatedDate DESC LIMIT 1 ];
        return jobList;
    }

    // Query asyncApexJob data By stopClassName
    global static List<AsyncApexJob> getStopJobData(String stopClassName) {
        List<AsyncApexJob> stopJobList = [ SELECT 
                                            Id, 
                                            JobType, 
                                            ApexClassId, 
                                            Status, 
                                            JobItemsProcessed, 
                                            TotalJobItems, 
                                            NumberOfErrors, 
                                            CompletedDate, 
                                            MethodName, 
                                            ExtendedStatus, 
                                            ParentJobId, 
                                            LastProcessed, 
                                            LastProcessedOffset 
                                           FROM AsyncApexJob 
                                           WHERE ApexClass.Name =: stopClassName 
                                         ];
        return stopJobList;
    }
}