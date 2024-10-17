global class Schedule_Batch implements Schedulable {
  global void execute(SchedulableContext sc) {            
    //check if there are 5 active batch jobs
    if([Select count() FROM AsyncApexJob WHERE JobType='BatchApex' AND(Status = 'Processing' OR Status = 'Preparing')]<5){
    	System.debug('正在执行的批处理数小于5');
    }else{
        //schedule this same class again in 30 minutes
        Schedule_Batch bagain = new Schedule_Batch();
        Datetime dt = Datetime.now() + (0.024305); // i.e. 30 mins
        String timeForScheduler = dt.format('s m H d M \'?\' yyyy');
        Id schedId = system.Schedule('CFP_TaskBatch_Retry'+timeForScheduler,timeForScheduler,bagain);
    }
  } 
}