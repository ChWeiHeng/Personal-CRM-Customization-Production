global with sharing class SoapDispatchBatchVim implements Database.Batchable<sObject> , Database.Stateful{
    // 条件sql
	public String query;
	// 成功状态值
	public String successStatus;
	// 失败状态值
	public String failStatus;
	// 开始时间
	public Datetime startDatetime;
	// 结束时间
	public Datetime endDatetime;
	// 总处理数据件数
	public Integer allAmount;
	// 成功处理件数
	public Integer successfullyNumber;
	// 失败处理件数
	public Integer failedNumber;

    // 构造方法
	global SoapDispatchBatchVim(String sql) {
        // this.query = 'SELECT Id, Name, LastName, FirstName, Company, Status, IsConverted, CustomAccount__c, Title, Country, State, City, Street, PostalCode, Description, LeadSource, Phone, MobilePhone, Fax, Email FROM Lead';
        this.query = sql;
        this.successStatus = '';
		this.failStatus = '';
		this.startDatetime = Datetime.now();
		this.endDatetime = Datetime.now();
		this.allAmount = 0;
		this.successfullyNumber = 0;
		this.failedNumber = 0;
	}

    // 构造方法
	global SoapDispatchBatchVim() {
        this.query = 'SELECT Id, Name FROM Lead';
        this.successStatus = '';
		this.failStatus = '';
		this.startDatetime = Datetime.now();
		this.endDatetime = Datetime.now();
		this.allAmount = 0;
		this.successfullyNumber = 0;
		this.failedNumber = 0;
	}

	// Batch.Start()方法 返回查询结果
	global Database.QueryLocator start(Database.BatchableContext bc) {
		// Long startTimerTime = DateTime.now().getTime();
		// Long finishTimerTime = DateTime.now().getTime();

		// while ((finishTimerTime - startTimerTime) < 120000) {
		// //delay for 12 seconds
		// 	finishTimerTime = DateTime.now().getTime();
		// }
		// 返回对应条件的潜在客户数据
        return Database.getQueryLocator(query);
    }

    // Batch.execute方法 实现具体操作
    global void execute(Database.BatchableContext BC, list<Lead> scope) {
        System.debug('dispatch 123456789');
        List<Account> insAccountList = new List<Account>();
    	for(Integer i = 1; i <= 500; i++) {
            System.debug('dispatch 123456789');
            Account acc = new Account();
            acc.Id = i + 'account';
            insAccountList.add(acc);
        }
        insert insAccountList;
    }

    // Batch运行完毕最终执行方法
    global void finish(Database.BatchableContext bc){
		
    }
}