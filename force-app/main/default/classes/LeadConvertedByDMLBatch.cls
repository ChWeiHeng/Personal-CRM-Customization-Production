/**********************************************************************
 * 
 * LeadConvertedByDMLBatch
 * CreateBy Chen Dong
*************************************************************************/
global class LeadConvertedByDMLBatch implements Database.Batchable<sObject> , Database.Stateful{
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
	global LeadConvertedByDMLBatch() {
		this.query = 'SELECT Id, Name, LastName, FirstName, Company, Status, IsConverted, CustomAccount__c, Title, Country, State, City, Street, PostalCode, Description, LeadSource, Phone, MobilePhone, Fax, Email FROM Lead WHERE Name LIKE' + '\'%Test%' + '\'';
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
		Long startTimerTime = DateTime.now().getTime();
		Long finishTimerTime = DateTime.now().getTime();

		while ((finishTimerTime - startTimerTime) < 120000) {
		//delay for 12 seconds
			finishTimerTime = DateTime.now().getTime();
		}
		// 返回对应条件的潜在客户数据
        return Database.getQueryLocator(query);
    }

    // Batch.execute方法 实现具体操作
    global void execute(Database.BatchableContext BC, list<Lead> scope) {
    	// 将最开始得潜在客户数据与客户数据绑定起来验证
    	Map<Id,Id> leadWithAccountMap = new Map<Id,Id>();
    	// 筛选未转换过的潜在客户数据List
    	List<Lead> noConversionLeadList = new List<Lead>();
    	// 根据潜在客户条件遍历scope数据将潜在客户数据添加至noConversionLeadList
    	for (Lead lead : scope) {
    		// 若潜在客户存在已转换情况不会添加至noConversionLeadList
    		if(!lead.IsConverted) { // 切换正式环境时无需此条件
    			noConversionLeadList.add(lead);
    			leadWithAccountMap.put(lead.Id, lead.CustomAccount__c);
    		}
    	}

    	// 需要新建的Contact数据
    	List<Contact> contactList = new List<Contact>();

    	// 遍历noConversionLeadList将对应数据复制到联系人对象
    	for (Lead ld : noConversionLeadList) {
    		// 若操作时的客户Id没有发生改变，可以继续操作
    		if(ld.CustomAccount__c == leadWithAccountMap.get(ld.Id)) {
    			Contact contact = new Contact();
    			// 设置联系人绑定的客户信息
    			contact.AccountId = ld.CustomAccount__c;
    			contact.FirstName = ld.FirstName;
    			contact.LastName = ld.LastName;
    			contact.Title = ld.Title;
    			contact.MailingCountry = ld.Country;
    			contact.MailingState = ld.State;
    			contact.MailingCity = ld.City;
    			contact.MailingStreet = ld.Street;
    			contact.MailingPostalCode = ld.PostalCode;
    			contact.LeadSource = ld.LeadSource;
    			contact.Description = ld.Description;
    			contact.Phone = ld.Phone;
    			contact.MobilePhone = ld.MobilePhone;
    			contact.Fax = ld.Fax;
    			contact.Email = ld.Email;
    			contactList.add(contact);
    			allAmount++;
    		}
    	}
    	// 操作开始时间
    	startDatetime = Datetime.now();
    	// 插入联系人数据返回状态
    	Database.SaveResult[] saveResults = Database.insert(contactList,false);
    	System.debug('数据转换情况: ' + saveResults);
    	// 操作结束时间
    	endDatetime = Datetime.now();

    	// 查询所有客户数据
		Map<Id,Account> allAccountMap = new Map<Id,Account>([ SELECT Id, Name From Account ]);
		// 查询所有联系人数据
		Map<Id,Contact> allContactMap = new Map<Id,Contact>([ SELECT Id, Name, AccountId From Contact ]);

    	// 遍历返回状态数据
    	for (Database.SaveResult result : saveResults) {
    		if(result.isSuccess()) {
    			successStatus += '数据名为: ' + allContactMap.get(result.getId()).Name + '创建成功并绑定到名为:' + allAccountMap.get(allContactMap.get(result.getId()).AccountId).Name + '的客户数据下' + '<br>';
    			successfullyNumber ++;
    			System.debug('插入数据成功: ' + result.getId());
    		} else {
    			failStatus += '由于本次操作只返回成功后的Id,若数据Id为: ' + result.getId() + '时，则表示创建失败!' + '<br>';
    			failedNumber ++;
    			System.debug('插入数据失败: ' + result.getId());
    		}
    	}

    }

    // Batch运行完毕最终执行方法
    global void finish(Database.BatchableContext bc) {
    	System.debug('This is Batch Finish Method');
    	// 定义拼接开始结束时间、处理件数的字符串
    	String resultText = '';
    	// 为日志字符串拼接数据
    	resultText = '任务开始时间为: ' + startDatetime.format('YYYY-MM-dd  HH:mm:ss') + '<br>' + '任务结束时间为: ' + endDatetime.format('YYYY-MM-dd  HH:mm:ss') + '<br>' + '处理总件数为: ' + allAmount + '<br>' + '成功处理件数为: ' + successfullyNumber + '<br>' + '失败处理件数为： ' + failedNumber + '<br>';
        // 创建邮件模板对象
		Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
		// 设置当前用户
		message.setTargetObjectId(UserInfo.getUserId());
		// 设置
		message.setSaveAsActivity(false);
		// 设置发送邮箱地址
		message.setToAddresses(new String[]{'18753621539@163.com'});
		// 设置邮件主题
		message.subject = '潜在客户数据转换情况';
		// 无成功数据情况下
		successStatus = successStatus == null ? '无转换成功数据' : successStatus;
		// 无失败数据情况下
		failStatus = failStatus == null ? '无转换失败数据' : failStatus;
		// 设置邮件内容
		message.setHtmlBody(successStatus + '<br>' + failStatus + '<br>' + resultText);
		Messaging.SendEmailResult[] results = Messaging.sendEmail( new Messaging.SingleEmailMessage[] { message } );
		// // 处理邮件
		// Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
		// // 发送邮件返回状态信息
		// Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
		for (Messaging.SendEmailResult mess : results) {
			// 当返回状态为Success
			if(mess.isSuccess()) {
				System.debug('邮件发送成功!');
			} else { // 当返回状态为Fail
				System.debug('邮件发送失败!');
			}
		}
		Database.executeBatch(new SoapDispatchBatch());
    }

}