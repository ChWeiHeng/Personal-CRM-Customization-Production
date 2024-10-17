public class RedirectController {

    // 常量定义
    private static final String CLIENT_ID = 'DO27YkXDvMbSlHcVVd17';
    private static final String SCOPE = 'user.read calendar calendar.read';
    private static final String REDIRECT_URI = 'https://jntrrxpro20191114-dev-ed--c.vf.force.com/apex/WorkLineCallbackPage';
    private static final String RESPONSE_TYPE = 'code';

    public RedirectController() {
        
    }

    public PageReference validateAndRedirect(){
        String state = generateRandomString(16); // 16 位长的随机字符串
        String nonce = generateRandomString(16); // 16 位长的随机字符串

        // 请求体参数
        String authorizationUrl = 'https://auth.worksmobile.com/oauth2/v2.0/authorize' +
                                  '?client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
                                  '&redirect_uri=' + EncodingUtil.urlEncode(REDIRECT_URI, 'UTF-8') +
                                  '&scope=' + EncodingUtil.urlEncode(SCOPE, 'UTF-8') +
                                  '&response_type=' + EncodingUtil.urlEncode(RESPONSE_TYPE, 'UTF-8') +
                                  '&state=' + EncodingUtil.urlEncode(state, 'UTF-8') +
                                  '&nonce=' + EncodingUtil.urlEncode(nonce, 'UTF-8');

        //Write your logic here and redirect
        PageReference retURL = new PageReference(authorizationUrl);
        retURL.setRedirect(true);
        return retURL;
   }

    // 生成指定长度的随机字符串
    public static String generateRandomString(Integer length) {
        String characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        String result = '';
        if (String.isEmpty(characters) || length <= 0) {
            throw new IllegalArgumentException('Invalid parameters');
        }
        for (Integer i = 0; i < length; i++) {
            Integer index = (Integer) (Math.random() * characters.length());
            result += characters.substring(index, index + 1);
        }
        return result;
    }
}