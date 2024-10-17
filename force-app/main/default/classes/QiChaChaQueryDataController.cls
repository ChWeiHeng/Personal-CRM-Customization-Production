public class QiChaChaQueryDataController {
	
	public String AccName {get;set;} // 前台获取公司名称
	public String AccId {get;set;} // 客户记录ID
	public Account acc {get;set;} // 客户对象
	public List<ComPanyInformation__c> ComPanyInformationList {get;set;} // 企查查查询公司信息

	public QiChaChaQueryDataController(ApexPages.StandardController standardController) {
        AccId = ApexPages.currentPage().getParameters().get('Id');
        List<Account> accList = [ Select Id, Name FROM Account WHERE Id =: AccId ];
        for (Account acc : accList) {
        	if(AccId == acc.Id) {
        		AccName = acc.Name;
        	}
        }
    }

    public void NewAccount() {
    	// 当输入公司名称不为空时开始Search数据
    	if(null != AccName || '' != AccName) {
    		// 调用企查查接口 查询企业数据
    		// QiChaChaQueryDataHelper.QueryCompanyData(AccName);
    		String appkey = '0dd2c58ac4374a24aded52081944a423'; // 接口
			String seckey = 'EDAACB2DE99D52507D13C38DF0E3E8D5'; // 密钥

			Timezone tz = Timezone.getTimeZone('Asia/Shanghai');

			Datetime nowdate = System.now();

	    	Long nowTime = nowdate.getTime() / 1000; // 获取当前Unix时间戳

	    	System.debug('公司名: ' + AccName);
	    	System.debug('当前时间: ' + nowdate);
	    	System.debug('当前时间戳: ' + nowTime);

	    	String body = null;

	    	String requestInput = appkey + nowTime + seckey;

	    	System.debug('拼接完成的Token: ' + requestInput);

			Blob requestBlob = Blob.valueOf(requestInput);
			Blob hash = Crypto.generateDigest('MD5', requestBlob);
			//Need to convert into hex to generate the equivalent of md5(string) method of PHP.
			String requestSignature = EncodingUtil.convertToHex(hash);
			String tok = requestSignature.toUpperCase();
			String timespan = String.valueOf(nowTime);

			System.debug('加密转大写: ' + tok);
			System.debug('转字符串时间戳: ' + timespan);
	    	try {

	    		http h = new Http();
				HttpRequest req = new HttpRequest();
				//For security purpose, actual have been replaced with dashes
				req.setEndpoint('http://api.qichacha.com/ECIV4/Search?key=' + appkey + '&keyword=' + AccName + '&pageSize=' + 100);
				req.setMethod('GET');
				req.setHeader('Token', tok);
				req.setHeader('Timespan', timespan);
		    	
		        System.debug('请求request: ' + req);
		        System.debug('请求requestBody: ' + req.getBody());
				HttpResponse res = h.send(req);
				System.debug('返回结果: ' + res);
				System.debug('返回状态: ' + res.getStatus());
				System.debug('返回数据: ' + res.getBody());
	    		
				Map<String, Object> responseResult = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());

				System.debug('responseResult: ' + responseResult);

		     	List<Object> ObjectList = (List<Object>)responseResult.get('Result');

		     	System.debug('ObjectList: ' + ObjectList);

		     	ComPanyInformationList = new List<ComPanyInformation__c>();

				if (!ObjectList.isEmpty()) {
					for (Object obj : ObjectList) {
						Map<String, Object> params = (Map<String, Object>)obj;
						System.debug('params: ' + params);
						ComPanyInformation__c cpInformation = new ComPanyInformation__c();
   
						cpInformation.QiChaChaKeyNo__c = getStringByObject(params.get('KeyNo')); // 企查查内部KeyNo
					   cpInformation.QiChaChaComPanyName__c = getStringByObject(params.get('Name')); // 公司名称
						cpInformation.QiChaChaOperName__c = getStringByObject(params.get('OperName')); // 公司法人名称
						cpInformation.QiChaChaStartDate__c = getStringByObject(params.get('StartDate')); // 公司成立日期
						cpInformation.QiChaChaStatus__c = getStringByObject(params.get('Status')); // 企业状态
						cpInformation.QiChaChaKeyNo__c = getStringByObject(params.get('No')); // 注册号
						cpInformation.QiChaChaCreditCode__c = getStringByObject(params.get('CreditCode')); // 统一社会信用代码
						cpInformation.QiChaChaScope__c  = getStringByObject(params.get('Scope'));
   
						System.debug('cpInformation: ' + cpInformation);
						if(null != cpInformation) {
							ComPanyInformationList.add(cpInformation);
						}
					}
   
					System.debug('ComPanyInformationList: ' + ComPanyInformationList);
				}

	    	} catch(Exception e) {
	    		System.debug('错误发生在' + e.getLineNumber() + '行' + '原因为: ' + e.getMessage());
	    	}
    	}

    }

    public void accurateSearch() {

    	System.debug('查询并保存');

    }

    public PageReference cancel() {

    	PageReference pageRef = new PageReference('/lightning/r/Account/' + AccId + '/view');
        pageRef.setRedirect(true);
        return pageRef;

    }

    //根据Object获取String
    public Static String getStringByObject(Object obj){
        if(!String.isBlank(String.valueOf(obj))){
            return String.valueOf(obj).trim();
        }else{
            return null;
        }
    }
    
}