public class moniBingFa {
	@future
    public static void  bingfafuc(){
        try{
            for(Integer i=1; i <5; i++){
                WeChat__c wechat = new WeChat__c();
                wechat.Name = 'xxxxx';
                insert wechat;
            }
            
        }catch(Exception e){
            WeChat__c wechat = new WeChat__c();
            wechat.Name = 'Fail';
            insert wechat;
        }
    }
}