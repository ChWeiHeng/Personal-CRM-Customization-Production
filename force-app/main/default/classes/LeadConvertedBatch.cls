/**********************************************************************
 * 
 * LeadConvertedBatch
*************************************************************************/
global class LeadConvertedBatch implements Database.Batchable<sObject> , Database.Stateful{
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
	// 当潜在客户数据转换过程中客户发生改变时Message
	public String alertMessage;

    // 构造方法
	global LeadConvertedBatch() {
        // CustomAccount__c字段作为关联客户的自定义字段在Lead中
		this.query = 'SELECT Id, Name, LastName, FirstName, Company, Status, IsConverted, CustomAccount__c FROM Lead WHERE Name LIKE' + '\'%Test%' + '\'';
		this.successStatus = '';
		this.failStatus = '';
		this.startDatetime = Datetime.now();
		this.endDatetime = Datetime.now();
		this.allAmount = 0;
		this.successfullyNumber = 0;
		this.failedNumber = 0;
		this.alertMessage = '';
	}

	// Batch.Start()方法 返回查询结果
	global Database.QueryLocator start(Database.BatchableContext bc) {
		// 返回对应条件的潜在客户数据
        return Database.getQueryLocator(query);
    }

    // Batch.execute方法 具体操作
    global void execute(Database.BatchableContext BC, List<Lead> scope) {
    	// 筛选未转换过的潜在客户数据List
    	List<Lead> noConversionLeadList = new List<Lead>();
    	// 绑定潜在客户数据及客户数据Id后期做客户是否更换得比对
    	Map<Id,Id> leadWithAccountMap = new Map<Id,Id>();
    	// 根据潜在客户条件遍历scope数据将潜在客户数据添加至noConversionLeadList
    	for (Lead lead : scope) {
    		// 若潜在客户存在已转换情况不会添加至noConversionLeadList
    		if(!lead.IsConverted) {
    			noConversionLeadList.add(lead);
    			leadWithAccountMap.put(lead.Id, lead.CustomAccount__c);
    		}
    	}
    	// 存放所有潜在客户转换数据
    	List<Database.LeadConvert> leadConvertList = new List<Database.LeadConvert>();
    	// 遍历所有未转换潜在客户数据 设置潜在客户转换对象数据
    	for (Lead newlead : noConversionLeadList) {
    		if(newlead.CustomAccount__c == leadWithAccountMap.get(newlead.Id)) { // 当潜在客户数据准备转换时客户值不发生改变时
    			// 获取潜在客户转换完毕后的状态值
	    		LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted = true LIMIT 1];
	    		// 潜在客户转换对象
	    		Database.LeadConvert lc = new Database.LeadConvert();
	    		// 设置需要转换的潜在客户对象Id
	    		lc.setLeadId(newlead.Id);
	    		// 设置转换的潜在客户对象的状态
	    		lc.setConvertedStatus(convertStatus.MasterLabel);
	    		// 设置要合并的客户Id
	    		lc.setAccountId(newlead.CustomAccount__c);
	    		// 设置是否需要创建业务机会
	    		lc.setDoNotCreateOpportunity(true);
	    		leadConvertList.add(lc);
    		} else { // 当潜在客户数据准备转换时客户值发生改变时
    			alertMessage += '名为: ' + newlead.Name + '的潜在客户数据转换失败, 客户Id更新为: ' + newlead.CustomAccount__c + '<br>';
    		}
    	}
    	// 需要转换的潜在客户List不为空时
    	if(!leadConvertList.isEmpty()) {
    		// 转换潜在客户数据一次只能处理一百个，根据总数/100循环执行
    		for (Integer i = 0; i < leadConvertList.size()/100; i++) {
    			// 存放每一次要处理的潜在客户数据
    			List<Database.LeadConvert> tempList = new List<Database.LeadConvert>();
    			// 处理潜在客户数据的起始位数
    			Integer startIndex = i * 100;
    			// 处理潜在客户数据的结束位数
    			Integer endIndex = ((startIndex + 100) < leadConvertList.size()) ? startIndex + 100 : leadConvertList.size();
    			// 转换潜在客户对象
    			for (Integer j = startIndex; j < endIndex; j++) {
    				tempList.add(leadConvertList[j]);
    			}

    			// 处理开始之前时间
    			startDatetime = Datetime.now();

    			// 执行转换方法 convertLead(Object,Boolead) 若Boolead指定false 则出现错误时不会发生异常而是返回对象记录失败原因 设置为true则反之
    			// convertLead 方法最多接受100个LeadConvert对象
    			Database.LeadConvertResult[] lcrList = Database.convertLead(tempList, false);
    			System.debug('lcrList转换完成情况: ' + lcrList);

    			// 转换结束时间
    			endDatetime = Datetime.now();

    			// 根据实际要求 返回日志是否需要显示客户、潜在客户或联系人数据
    			// 查询所有客户数据
    			Map<Id,Account> allAccountMap = new Map<Id,Account>([ SELECT Id, Name From Account ]);
    			// 查询所有联系人数据
    			Map<Id,Contact> allContactMap = new Map<Id,Contact>([ SELECT Id, Name From Contact ]);
    			// 查询所有潜在客户数据
    			Map<Id,Lead> allLeadMap = new Map<Id,Lead>([ SELECT Id, Name From Lead ]);

        		// 查看成功或失败的转换数据并发送邮件
    			for (Database.LeadConvertResult lcr : lcrList) {
    				// 当返回记录表示成功状态时，将对应数据拼接到successStatus
    				if(lcr.isSuccess()) {
    					successStatus += '名为: ' + allLeadMap.get(lcr.getLeadId()).Name + '的潜在客户数据已成功转换为名为: ' + allContactMap.get(lcr.getContactId()).Name + '的联系人数据在名为: ' + allAccountMap.get(lcr.getAccountId()).Name + '的客户下!' + '<br>'; 
    					successfullyNumber ++;
    				} else {// 当返回记录表示失败状态时，将对应数据拼接到字符串failStatus
    					failStatus += '名为: ' + allLeadMap.get(lcr.getLeadId()).Name + '的潜在客户数据转换失败,请查看原因:' + lcr.getErrors() + '<br>';
    					failedNumber ++;
    				}
    				allAmount ++;
    			}
    		}

    	} else {
    		System.debug('无需要转换的潜在客户对象数据，请检查数据!');
    	}

    }

    // Batch运行完毕最终执行方法
    global void finish(Database.BatchableContext bc){
    	// 定义拼接开始结束时间、处理件数的字符串
    	String resultText = '';
    	// 为日志字符串拼接数据
    	resultText = '任务开始时间为: ' + startDatetime.format('YYYY-MM-dd  HH:mm:ss') + '<br>' + '任务结束时间为: ' + endDatetime.format('YYYY-MM-dd  HH:mm:ss') + '<br>' + '处理总件数为: ' + allAmount + '<br>' + '成功处理件数为: ' + successfullyNumber + '<br>' + '失败处理件数为： ' + failedNumber + '<br>';
        // 创建邮件模板对象
		Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
		// 设置发送邮箱地址
		message.setToAddresses(new String[]{'18753621539@163.com'});
		// 设置邮件主题
		message.subject = '潜在客户数据转换情况';
		// 无成功数据情况下
		successStatus = successStatus == null ? '无转换成功数据' : successStatus;
		// 无失败数据情况下
		failStatus = failStatus == null ? '无转换失败数据' : failStatus;
		// 存在因客户数据改变未转换数据时
		alertMessage = alertMessage == null ? '无因客户数据改变未转换数据' : alertMessage;
		// 设置邮件内容
		message.setHtmlBody(successStatus + '<br>' + failStatus + '<br>' + alertMessage + '<br>' + resultText);
		// 处理邮件
		Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
		// 发送邮件返回状态信息
		Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
		for (Messaging.SendEmailResult mess : results) {
			// 当返回状态为Success
			if(mess.isSuccess()) {
				System.debug('邮件发送成功!');
			} else {// 当返回状态为Fail
				System.debug('邮件发送失败!');
			}
		}
    }

}