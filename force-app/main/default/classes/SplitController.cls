public class SplitController {
	
    public static Map<Id,String> splitStr(Map<Id,String> strMap, Integer num) {
        Map<Id,String> newStrMap = new Map<Id,String>();
        Integer count;
        for (Id id : strMap.keySet()) {
            count = 0;
            String str;
            List<String> strList = new List<String>();
            if(null != strMap.get(id)) {
                str = strMap.get(id);
                String olStr = '';
                //String newStr = '';
                String lastStr = '';
                for (Integer i = 1;i <= str.length();i++) {
                    olStr += str.substring(count, i);
                    System.debug('olStr1: ' + olStr);
                    //System.debug('newStr1: ' + newStr);
                    System.debug('olStr1.length(): ' + olStr.length());
                    System.debug('i: ' + i);
                    System.debug('lastStr1: ' + lastStr);
                    if(olStr.length() == num) {
                        strList.add(olStr);
                        olStr = '';
                    }
                    //if(olStr.length() - i <= num) {
                        //newStr = olStr;
                    //}
                    count ++;
                }
				System.debug('olStr2: ' + olStr);
                //System.debug('newStr2: ' + newStr);
                strList.add(olStr);
                System.debug('strList' + strList);

                for (Integer i = 0;i < strList.size();i++) {
                    if(strList.size() - 1 == i) {
                        lastStr += strList[i];
                    } else {
                        lastStr += strList[i] + '<br>';
                    }
                }
                newStrMap.put(id, lastStr);
            }
        }

        return newStrMap;
    }
    
}