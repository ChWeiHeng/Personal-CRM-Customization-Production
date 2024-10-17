global class QiChaChaQueryDataHelper {

	@future(callout=true)
    public static void QueryCompanyData(String AccName) {

    	String appkey = '0b2bd9e51d01484a8446910e1dd816a8'; // 接口
		String seckey = '1BAAF1A233E2E35EE9F167F61F777AE7'; // 密钥

		Timezone tz = Timezone.getTimeZone('Asia/Shanghai');

		Datetime nowdate = System.now();

    	Long nowTime = nowdate.getTime() / 1000; // 获取当前Unix时间戳

    	System.debug('公司名: ' + AccName);
    	System.debug('当前时间: ' + nowdate);
    	System.debug('当前时间戳: ' + nowTime);

    	String body = null;

    	String requestInput = appkey + nowTime + seckey;

    	System.debug('时间戳: ' + requestInput);

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
			req.setEndpoint('http://api.qichacha.com/ECIV4/Search?key=' + appkey + '&keyword=' + AccName);
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

	     	List<Object> ObjectList = (List<Object>)responseResult.get('Result');

	     	for (Object obj : ObjectList) {
	     		Map<String, Object> params = (Map<String, Object>)obj;

	     		String KeyNo = getStringByObject(params.get('KeyNo')); // 企查查内部KeyNo
				String Name = getStringByObject(params.get('Name')); // 公司名称
		     	String OperName = getStringByObject(params.get('OperName')); // 公司法人名称
		     	String StartDate = getStringByObject(params.get('StartDate')); // 公司成立日期
		     	String Status = getStringByObject(params.get('Status')); // 企业状态
		     	String No = getStringByObject(params.get('No')); // 注册号
		     	String CreditCode = getStringByObject(params.get('CreditCode')); // 统一社会信用代码

		     	System.debug('企查查内部KeyNo: ' + KeyNo);
		     	System.debug('公司名称: ' + Name);
		     	System.debug('公司法人名称: ' + OperName);
		     	System.debug('公司成立日期: ' + StartDate);
		     	System.debug('企业状态: ' + Status);
		     	System.debug('注册号: ' + No);
		     	System.debug('统一社会信用代码: ' + CreditCode);
	     	}

    	} catch(Exception e) {
    		System.debug('错误发生在' + e.getLineNumber() + '行' + '原因为: ' + e.getMessage());
    	}

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