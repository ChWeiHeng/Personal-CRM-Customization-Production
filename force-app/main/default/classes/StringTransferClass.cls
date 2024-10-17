/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 04-25-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public Class StringTransferClass{
    
    /** インスタンス */
    private static final StringTransferClass instance = new StringTransferClass();
    
    /** 16進制・置換 Map */
    private Map<String, Integer> hexadecimalToDecimalMap;
    
    /** 半角カナ・置換 Map */
    private Map<String, String> replaceMap;
    
    /** 半角カナ・置換 Map Unicode */
    private Map<String, String> replaceHexadecimalMap;

    /**
     * コンストラクタ
     */
    private StringTransferClass() {

        // 16 進数表記　→　10 進数表記置換 Map 作成
        hexadecimalToDecimalMap = new Map<String, Integer>();
        hexadecimalToDecimalMap.put('0', 0);
        hexadecimalToDecimalMap.put('1', 1);
        hexadecimalToDecimalMap.put('2', 2);
        hexadecimalToDecimalMap.put('3', 3);
        hexadecimalToDecimalMap.put('4', 4);
        hexadecimalToDecimalMap.put('5', 5);
        hexadecimalToDecimalMap.put('6', 6);
        hexadecimalToDecimalMap.put('7', 7);
        hexadecimalToDecimalMap.put('8', 8);
        hexadecimalToDecimalMap.put('9', 9);
        hexadecimalToDecimalMap.put('A', 10);
        hexadecimalToDecimalMap.put('B', 11);
        hexadecimalToDecimalMap.put('C', 12);
        hexadecimalToDecimalMap.put('D', 13);
        hexadecimalToDecimalMap.put('E', 14);
        hexadecimalToDecimalMap.put('F', 15);

        //変換表作成
        replaceHexadecimalMap = new Map<String, String>();
        //全角カタカナ対応
        replaceHexadecimalMap.put('30A1', 'FF71');  //アーオァーォ->ｱｲｳｴｵ
        replaceHexadecimalMap.put('30A2', 'FF71');  
        replaceHexadecimalMap.put('30A3', 'FF72');  
        replaceHexadecimalMap.put('30A4', 'FF72');
        replaceHexadecimalMap.put('30A5', 'FF73');
        replaceHexadecimalMap.put('30A6', 'FF73');
        replaceHexadecimalMap.put('30A7', 'FF74');
        replaceHexadecimalMap.put('30A8', 'FF74');
        replaceHexadecimalMap.put('30A9', 'FF75');
        replaceHexadecimalMap.put('30AA', 'FF75');
        replaceHexadecimalMap.put('30AB', 'FF76');  // カ行
        replaceHexadecimalMap.put('30AC','FF76,FF9E'); 
        replaceHexadecimalMap.put('30AD', 'FF77');
        replaceHexadecimalMap.put('30AE','FF77,FF9E');
        replaceHexadecimalMap.put('30AF', 'FF78');
        replaceHexadecimalMap.put('30B0','FF78,FF9E');
        replaceHexadecimalMap.put('30B1', 'FF79');
        replaceHexadecimalMap.put('30B2','FF79,FF9E');
        replaceHexadecimalMap.put('30B3', 'FF7A');
        replaceHexadecimalMap.put('30B4','FF7A,FF9E');
        replaceHexadecimalMap.put('30B5', 'FF7B');  // サ行
        replaceHexadecimalMap.put('30B6','FF7B,FF9E'); 
        replaceHexadecimalMap.put('30B7', 'FF7C');
        replaceHexadecimalMap.put('30B8','FF7C,FF9E');
        replaceHexadecimalMap.put('30B9', 'FF7D');
        replaceHexadecimalMap.put('30BA','FF7D,FF9E');
        replaceHexadecimalMap.put('30BB', 'FF7E');
        replaceHexadecimalMap.put('30BC','FF7E,FF9E');
        replaceHexadecimalMap.put('30BD', 'FF7F');
        replaceHexadecimalMap.put('30BE','FF7F,FF9E');
        replaceHexadecimalMap.put('30BF', 'FF80');  // タ行
        replaceHexadecimalMap.put('30C0','FF80,FF9E'); 
        replaceHexadecimalMap.put('30C1', 'FF81');
        replaceHexadecimalMap.put('30C2','FF81,FF9E');
        replaceHexadecimalMap.put('30C3', 'FF82');  //っｰ>ﾂ
        replaceHexadecimalMap.put('30C4', 'FF82');
        replaceHexadecimalMap.put('30C5','FF82,FF9E');
        replaceHexadecimalMap.put('30C6', 'FF83');
        replaceHexadecimalMap.put('30C7','FF83,FF9E');
        replaceHexadecimalMap.put('30C8', 'FF84');
        replaceHexadecimalMap.put('30C9','FF84,FF9E');
        replaceHexadecimalMap.put('30CA', 'FF85'); //ナ行
        replaceHexadecimalMap.put('30CB', 'FF86');
        replaceHexadecimalMap.put('30CC', 'FF87');
        replaceHexadecimalMap.put('30CD', 'FF88');
        replaceHexadecimalMap.put('30CE', 'FF89');
        replaceHexadecimalMap.put('30CF', 'FF8A'); //ハ行
        replaceHexadecimalMap.put('30D0','FF8A,FF9E'); 
        replaceHexadecimalMap.put('30D1','FF8A,FF9F');  
        replaceHexadecimalMap.put('30D2', 'FF8B');   
        replaceHexadecimalMap.put('30D3','FF8B,FF9E');
        replaceHexadecimalMap.put('30D4','FF8B,FF9F');
        replaceHexadecimalMap.put('30D5', 'FF8C');
        replaceHexadecimalMap.put('30D6','FF8C,FF9E');
        replaceHexadecimalMap.put('30D7','FF8C,FF9F');
        replaceHexadecimalMap.put('30D8', 'FF8D');
        replaceHexadecimalMap.put('30D9','FF8D,FF9E');
        replaceHexadecimalMap.put('30DA','FF8D,FF9F');
        replaceHexadecimalMap.put('30DB', 'FF8E');
        replaceHexadecimalMap.put('30DC','FF8E,FF9E');
        replaceHexadecimalMap.put('30DD','FF8E,FF9F');
        replaceHexadecimalMap.put('30DE', 'FF8F'); //マ行
        replaceHexadecimalMap.put('30DF', 'FF90');
        replaceHexadecimalMap.put('30E0', 'FF91');
        replaceHexadecimalMap.put('30E1', 'FF92');
        replaceHexadecimalMap.put('30E2', 'FF93');
        replaceHexadecimalMap.put('30E3', 'FF94');  //ヤ行＋ャュョー＞ﾔﾕﾖ
        replaceHexadecimalMap.put('30E4', 'FF94');
        replaceHexadecimalMap.put('30E5', 'FF95');
        replaceHexadecimalMap.put('30E6', 'FF95');
        replaceHexadecimalMap.put('30E7', 'FF96');
        replaceHexadecimalMap.put('30E8', 'FF96');
        replaceHexadecimalMap.put('30E9', 'FF97');  //ラ行
        replaceHexadecimalMap.put('30EA', 'FF98');
        replaceHexadecimalMap.put('30EB', 'FF99');
        replaceHexadecimalMap.put('30EC', 'FF9A');
        replaceHexadecimalMap.put('30ED', 'FF9B');
        replaceHexadecimalMap.put('30EE', 'FF9C');  //ワヮ
        replaceHexadecimalMap.put('30EF', 'FF9C');
        replaceHexadecimalMap.put('30F0', 'FF72');  //ヰ-ｲ
        replaceHexadecimalMap.put('30F1', 'FF74');  //ヱ-ｴ
        replaceHexadecimalMap.put('30F2', 'FF66');  //ヲ
        replaceHexadecimalMap.put('30F3', 'FF9D');  //ン
        replaceHexadecimalMap.put('30F4','FF73,FF9E');    //ヴ
        replaceHexadecimalMap.put('30F5', 'FF76');  //ヵ
        replaceHexadecimalMap.put('30F6', 'FF79');  //ヶ
        replaceHexadecimalMap.put('3002', 'FF61');  //｡
        replaceHexadecimalMap.put('300C', 'FF62');  //｢
        replaceHexadecimalMap.put('300D', 'FF63');  //｣
        replaceHexadecimalMap.put('3001', 'FF64');  //､
        replaceHexadecimalMap.put('30FB', 'FF65');  //･
        replaceHexadecimalMap.put('30FC', 'FF70');  //-ｰ>-
        //半角小文字対応
        replaceHexadecimalMap.put('FF67', 'FF71');  //ｧｰ>ｱ
        replaceHexadecimalMap.put('FF68', 'FF72');  //ｨｰ>ｲ
        replaceHexadecimalMap.put('FF69', 'FF73');  //ｩｰ>ｳ
        replaceHexadecimalMap.put('FF6A', 'FF74');  //ｪｰ>ｴ
        replaceHexadecimalMap.put('FF6B', 'FF75');  //ｫｰ>ｵ
        replaceHexadecimalMap.put('FF6C', 'FF94');  //ｬｰ>ﾔ
        replaceHexadecimalMap.put('FF6D', 'FF95');  //ｭｰ>ﾕ
        replaceHexadecimalMap.put('FF6E', 'FF96');  //ｮｰ>ﾖ
        replaceHexadecimalMap.put('FF6F', 'FF82');  //ｯｰ>ﾂ
        replaceMap= new Map<String, String>();
        for(String key : replaceHexadecimalMap.keySet()) {
            replaceMap.put(unicodeToString(key.split(',', 0)), unicodeToString(replaceHexadecimalMap.get(key).split(',', 0)));
        }

    }

    /**
     * Unicode を文字列に変換する
     * @param unicodes unicode 配列
     * @return 文字列
     */
    public String unicodeToString(String[] unicodes) {
        List<Integer> chars = new List<Integer>();
        for(String unicode : unicodes) {
            Integer c = 0;
            for(Double i=0, len=unicode.length(); i<len; i++) {
                c += (Math.pow(16, (len - i - 1)).intValue() * hexadecimalToDecimalMap.get(unicode.substring(i.intValue(), i.intValue()+1)));
            }
            chars.add(c);
        }
        return String.fromCharArray(chars);
    }

    /**
     * 20220120 RD)奚 BI-1237 対応
     * 変換表の全角カナ小文字から半角カナ小文字に切り替える
     */
    public void parseLowerKanaMap() {
        //全角カナ小文字から半角カナ小文字に変換
        replaceHexadecimalMap.put('30A1', 'FF67'); //ァｰ>ｧ
        replaceHexadecimalMap.put('30A3', 'FF68'); //ィｰ>ｨ
        replaceHexadecimalMap.put('30A5', 'FF69'); //ゥｰ>ｩ
        replaceHexadecimalMap.put('30A7', 'FF6A'); //ェｰ>ｪ
        replaceHexadecimalMap.put('30A9', 'FF6B'); //ォｰ>ｫ
        replaceHexadecimalMap.put('30C3', 'FF6F'); //ッｰ>ｯ
        replaceHexadecimalMap.put('30E3', 'FF6C'); //ャｰ>ｬ
        replaceHexadecimalMap.put('30E5', 'FF6D'); //ュｰ>ｭ
        replaceHexadecimalMap.put('30E7', 'FF6E'); //ョｰ>ｮ
        
        //半角カナ小文字はそのまま変換しない(ｧ-ｮ)
        replaceHexadecimalMap.put('FF67','FF67');
        replaceHexadecimalMap.put('FF68','FF68');
        replaceHexadecimalMap.put('FF69','FF69');
        replaceHexadecimalMap.put('FF6A','FF6A');
        replaceHexadecimalMap.put('FF6B','FF6B');
        replaceHexadecimalMap.put('FF6C','FF6C');
        replaceHexadecimalMap.put('FF6D','FF6D');
        replaceHexadecimalMap.put('FF6E','FF6E');
        replaceHexadecimalMap.put('FF6F','FF6F');
        
        for(String key : replaceHexadecimalMap.keySet()) {
            replaceMap.put(unicodeToString(key.split(',', 0)), unicodeToString(replaceHexadecimalMap.get(key).split(',', 0)));
        }
    }

    /**
     * 置換が必要か判定する
     * @param s 文字列
     * @return true: 必要／false: 不必要
     */
    public Boolean isReplace(String s) {
        return !Pattern.matches('^[ｱ-ﾟ]{1,}$', s);
    }
    
    /**
     * 半角カナへ置換
     * @param s 文字列
     * @return 置換文字列
     */
    public String replace(String s) {
        if(s == null || s == '') return s;
        
        //全角スペース
        if(s.contains('　')){
            s = s.replaceAll('　', '');
        }
        
        //半角スペース
        if(s.contains(' ')){
            s = s.replaceAll(' ', '');
        }

        // 半角カナ
        if(!isReplace(s)) return s;
        for(String key : replaceMap.keySet()) {
            s = s.replaceAll(key, replaceMap.get(key));
        }
        return s;
    }

    /**
     * インスタンス取得
     * @return インスタンス
     */
    public static StringTransferClass getInstance() {
        return StringTransferClass.instance;
    }
}