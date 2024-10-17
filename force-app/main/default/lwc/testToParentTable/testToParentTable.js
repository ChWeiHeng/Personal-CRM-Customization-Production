import { LightningElement, api, track } from "lwc";
import testSaveDatetimeValueToOrg from '@salesforce/apex/TestToParentTableController.testSaveDatetimeValueToOrg';

export default class TestToParentTable extends LightningElement {
  @track headers = [
    { label: "Opportunity Name", key: "oppName" },
    { label: "Account Name", key: "accName" },
    { label: "Close Date", key: "closeDate" },
    { label: "Stage", key: "stage" },
    { label: "Confidence", key: "confidence" },
    { label: "Amount", key: "amount" },
    { label: "Contact", key: "contact" },
  ];

  @track recordName = [
    {
      No: "1",
      itemName1: "Cloudhub1 + Anypoint Connectors",
      itemName2: "Cloudhub1",
      itemName3: "3/14/2015",
      itemName4: "Prospecting1",
      itemName5: "10%",
      itemName6: "$25k",
      itemName7: "jrogers@cloudhub1.com",
    },
    {
      No: "2",
      itemName1: "Cloudhub2 + Anypoint Connectors",
      itemName2: "Cloudhub2",
      itemName3: "4/14/2015",
      itemName4: "Prospecting2",
      itemName5: "20%",
      itemName6: "$26k",
      itemName7: "jrogers@cloudhub2.com",
    },
    {
      No: "3",
      itemName1: "Cloudhub3 + Anypoint Connectors",
      itemName2: "Cloudhub3",
      itemName3: "5/14/2015",
      itemName4: "Prospecting3",
      itemName5: "30%",
      itemName6: "$27k",
      itemName7: "jrogers@cloudhub3.com",
    },
    {
      No: "4",
      itemName1: "Cloudhub4 + Anypoint Connectors",
      itemName2: "Cloudhub4",
      itemName3: "6/14/2015",
      itemName4: "Prospecting4",
      itemName5: "40%",
      itemName6: "$28k",
      itemName7: "jrogers@cloudhub4.com",
    },
    {
      No: "5",
      itemName1: "Cloudhub5 + Anypoint Connectors",
      itemName2: "Cloudhub5",
      itemName3: "7/14/2015",
      itemName4: "Prospecting5",
      itemName5: "50%",
      itemName6: "$29k",
      itemName7: "jrogers@cloudhub5.com",
    },
    {
      No: "6",
      itemName1: "Cloudhub6 + Anypoint Connectors",
      itemName2: "Cloudhub6",
      itemName3: "8/14/2015",
      itemName4: "Prospecting6",
      itemName5: "60%",
      itemName6: "$30k",
      itemName7: "jrogers@cloudhub6.com",
    },
    {
      No: "7",
      itemName1: "Cloudhub7 + Anypoint Connectors",
      itemName2: "Cloudhub7",
      itemName3: "9/14/2015",
      itemName4: "Prospecting7",
      itemName5: "70%",
      itemName6: "$31k",
      itemName7: "jrogers@cloudhub7.com",
    },
  ];

  @track temporyDateHeader = [
    {
      Working_Date: "2023-5-10",
    },
    {
      Working_Date: "2023-5-11",
    },
  ];

  @track temporyData = [
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1720(キャラバン)",
      Car_Name: "10号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5s&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boW" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5sQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "织田",
          Car_Driver_Id: "a060T000002XL02QAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1711(キャラバン)",
      Car_Name: "1号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6Xw5&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bns" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6Xw5QAF",
      Car_Drivers: [
        {
          Car_Driver_Name: "中島",
          Car_Driver_Id: "a060T000002XKnhQAG",
        },
        {
          Car_Driver_Name: "由美",
          Car_Driver_Id: "a060T000002YINxQAO",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1712(商用車)",
      Car_Name: "2号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b4L&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bnx" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b4LQAR",
      Car_Drivers: [
        {
          Car_Driver_Name: "藤原",
          Car_Driver_Id: "a060T000002XKqfQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1713(商用車)",
      Car_Name: "3号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5J&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bo2" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5JQAR",
      Car_Drivers: [
        {
          Car_Driver_Name: "在原",
          Car_Driver_Id: "a060T000002XKzCQAW",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1714(キャラバン)",
      Car_Name: "4号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5O&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bo7" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5OQAR",
      Car_Drivers: [
        {
          Car_Driver_Name: "北条",
          Car_Driver_Id: "a060T000002XKzHQAW",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1715(商用車)",
      Car_Name: "5号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5T&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001blE" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5TQAR",
      Car_Drivers: [
        {
          Car_Driver_Name: "大伴",
          Car_Driver_Id: "a060T000002XKziQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1716(キャラバン)",
      Car_Name: "6号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5Y&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boC" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5YQAR",
      Car_Drivers: [
        {
          Car_Driver_Name: "朝仓",
          Car_Driver_Id: "a060T000002XKzZQAW",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1717(キャラバン)",
      Car_Name: "7号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5d&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boH" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5dQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "高丘",
          Car_Driver_Id: "a060T000002XKznQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1718(キャラバン)",
      Car_Name: "8号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5i&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boM" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5iQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "中臣",
          Car_Driver_Id: "a060T000002XKzsQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1719(キャラバン)",
      Car_Name: "9号車",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5n&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boR" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5nQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "安倍",
          Car_Driver_Id: "a060T000002XKzxQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1722(小型車)",
      Car_Name: "協力案者",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b62&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bog" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b62QAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "高冈",
          Car_Driver_Id: "a060T000002XL0CQAW",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1721(マイクロバス台)",
      Car_Name: "協力業者",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5x&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bob" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5xQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "华冈",
          Car_Driver_Id: "a060T000002XL07QAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1724(家庭用車)",
      Car_Name: "協力乘者",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b67&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001bov" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b67QAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "松平",
          Car_Driver_Id: "a060T000002XL0iQAG",
        },
      ],
    },
    {
      Project_WorkingDates: null,
      Project_RecordTypes: null,
      Project_Date: null,
      Car_No_With_Type: "1723(ワゴン)",
      Car_Name: "協力卖者",
      Car_Image:
        '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5o&amp;feoid=00N0T00000DP0mC&amp;refid=0EM0T0000001boq" alt="image.png"alt="image.png"></img></p>',
      Car_Id: "a000T00000H6b5oQAB",
      Car_Drivers: [
        {
          Car_Driver_Name: "小早川",
          Car_Driver_Id: "a060T000002XL0dQAG",
        },
      ],
    },
  ];

  @track temporyDetailData = [
    {
      Project_Working_Date: "2023-5-10",
      Project_RecordTypes: [
        {
          RecordType_Name: "1件目",
          RecordType_OneCheck: true,
          RecordType_TwoCheck: false,
          RecordType_ThreeCheck: false,
          RecordType_FourCheck: false,
        },
        {
          RecordType_Name: "2件目",
          RecordType_OneCheck: false,
          RecordType_TwoCheck: true,
          RecordType_ThreeCheck: false,
          RecordType_FourCheck: false,
        },
        {
          RecordType_Name: "3件目",
          RecordType_OneCheck: false,
          RecordType_TwoCheck: false,
          RecordType_ThreeCheck: true,
          RecordType_FourCheck: false,
        },
        {
          RecordType_Name: "夜勤",
          RecordType_OneCheck: false,
          RecordType_TwoCheck: false,
          RecordType_ThreeCheck: false,
          RecordType_FourCheck: true,
        },
      ],
      DispatchCarColDatas: [
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1720(キャラバン)",
          Car_Name: "10号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5s&feoid=00N0T00000DP0mC&refid=0EM0T0000001boW" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5sQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "织田",
              Car_Driver_Id: "a060T000002XL02QAG",
            },
          ],
        },
        {
          Project_WorkingDates: [
            {
              Project_Urbantowns_Villages: "北海道帯広市上清川町28番26号",
              Project_Sales_Representative: "斋藤",
              Project_RecordType: "1件目",
              Project_Name: "テストケース1",
              Project_Date: "2023-05-10",
              Project_Contact_Name: "德川",
              Project_Company_Dep_Worksite_Start_Time: "2023-08-17 11:38:45",
              Project_Car_Name: "1号車",
              Project_Car_Id: "a000T00000H6Xw5QAF",
              RecordType_OneCheck: true,
              RecordType_TwoCheck: false,
              RecordType_ThreeCheck: false,
              RecordType_FourCheck: false,
              dateInput: false,
              Project_Unique_Key: "1件目_1号車_2023-05-10"
            },
            {
              Project_Urbantowns_Villages: "北海道帯広市上清川町28番26号",
              Project_Sales_Representative: "斋藤",
              Project_RecordType: "2件目",
              Project_Name: "テストケース1",
              Project_Date: "2023-05-10",
              Project_Contact_Name: "德川",
              Project_Company_Dep_Worksite_Start_Time: "2023-08-17 11:38:45",
              Project_Car_Name: "1号車",
              Project_Car_Id: "a000T00000H6Xw5QAF",
              RecordType_OneCheck: false,
              RecordType_TwoCheck: true,
              RecordType_ThreeCheck: false,
              RecordType_FourCheck: false,
              dateInput: false,
              Project_Unique_Key: "2件目_1号車_2023-05-10"
            },
            {
              Project_Urbantowns_Villages: "北海道帯広市上清川町28番26号",
              Project_Sales_Representative: "斋藤",
              Project_RecordType: "3件目",
              Project_Name: "テストケース1",
              Project_Date: "2023-05-10",
              Project_Contact_Name: "德川",
              Project_Company_Dep_Worksite_Start_Time: "2023-08-17 11:38:45",
              Project_Car_Name: "1号車",
              Project_Car_Id: "a000T00000H6Xw5QAF",
              RecordType_OneCheck: false,
              RecordType_TwoCheck: false,
              RecordType_ThreeCheck: true,
              RecordType_FourCheck: false,
              dateInput: false,
              Project_Unique_Key: "3件目_1号車_2023-05-10"
            },
          ],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1711(キャラバン)",
          Car_Name: "1号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6Xw5&feoid=00N0T00000DP0mC&refid=0EM0T0000001bns" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6Xw5QAF",
          Car_Drivers: [
            {
              Car_Driver_Name: "中島",
              Car_Driver_Id: "a060T000002XKnhQAG",
            },
            {
              Car_Driver_Name: "由美",
              Car_Driver_Id: "a060T000002YINxQAO",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1712(商用車)",
          Car_Name: "2号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b4L&feoid=00N0T00000DP0mC&refid=0EM0T0000001bnx" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b4LQAR",
          Car_Drivers: [
            {
              Car_Driver_Name: "藤原",
              Car_Driver_Id: "a060T000002XKqfQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1713(商用車)",
          Car_Name: "3号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5J&feoid=00N0T00000DP0mC&refid=0EM0T0000001bo2" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5JQAR",
          Car_Drivers: [
            {
              Car_Driver_Name: "在原",
              Car_Driver_Id: "a060T000002XKzCQAW",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1714(キャラバン)",
          Car_Name: "4号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5O&feoid=00N0T00000DP0mC&refid=0EM0T0000001bo7" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5OQAR",
          Car_Drivers: [
            {
              Car_Driver_Name: "北条",
              Car_Driver_Id: "a060T000002XKzHQAW",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1715(商用車)",
          Car_Name: "5号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5T&feoid=00N0T00000DP0mC&refid=0EM0T0000001blE" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5TQAR",
          Car_Drivers: [
            {
              Car_Driver_Name: "大伴",
              Car_Driver_Id: "a060T000002XKziQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [
            {
              Project_Urbantowns_Villages: "北海道帯広市上清川町28番26号",
              Project_Sales_Representative: "斋藤",
              Project_RecordType: "1件目",
              Project_Name: "テストケース1",
              Project_Date: "2023-05-10",
              Project_Contact_Name: "德川",
              Project_Company_Dep_Worksite_Start_Time: "2023-08-17 11:38:45",
              Project_Car_Name: "6号車",
              Project_Car_Id: "a000T00000H6b5YQAR",
              RecordType_OneCheck: true,
              RecordType_TwoCheck: false,
              RecordType_ThreeCheck: false,
              RecordType_FourCheck: false,
              dateInput: false,
              Project_Unique_Key: "1件目_6号車_2023-05-10"
            },
            {
              Project_Urbantowns_Villages: "北海道帯広市上清川町28番26号",
              Project_Sales_Representative: "斋藤",
              Project_RecordType: "夜勤",
              Project_Name: "テストケース1",
              Project_Date: "2023-05-10",
              Project_Contact_Name: "德川",
              Project_Company_Dep_Worksite_Start_Time: "2023-08-17 11:38:45",
              Project_Car_Name: "1号車",
              Project_Car_Id: "a000T00000H6Xw5QAF",
              RecordType_OneCheck: false,
              RecordType_TwoCheck: false,
              RecordType_ThreeCheck: false,
              RecordType_FourCheck: true,
              dateInput: false,
              Project_Unique_Key: "夜勤_6号車_2023-05-10"
            },
          ],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1716(キャラバン)",
          Car_Name: "6号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5Y&feoid=00N0T00000DP0mC&refid=0EM0T0000001boC" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5YQAR",
          Car_Drivers: [
            {
              Car_Driver_Name: "朝仓",
              Car_Driver_Id: "a060T000002XKzZQAW",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1717(キャラバン)",
          Car_Name: "7号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5d&feoid=00N0T00000DP0mC&refid=0EM0T0000001boH" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5dQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "高丘",
              Car_Driver_Id: "a060T000002XKznQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1718(キャラバン)",
          Car_Name: "8号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5i&feoid=00N0T00000DP0mC&refid=0EM0T0000001boM" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5iQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "中臣",
              Car_Driver_Id: "a060T000002XKzsQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1719(キャラバン)",
          Car_Name: "9号車",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5n&feoid=00N0T00000DP0mC&refid=0EM0T0000001boR" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5nQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "安倍",
              Car_Driver_Id: "a060T000002XKzxQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1722(小型車)",
          Car_Name: "協力案者",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b62&feoid=00N0T00000DP0mC&refid=0EM0T0000001bog" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b62QAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "高冈",
              Car_Driver_Id: "a060T000002XL0CQAW",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1721(マイクロバス台)",
          Car_Name: "協力業者",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5x&feoid=00N0T00000DP0mC&refid=0EM0T0000001bob" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5xQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "华冈",
              Car_Driver_Id: "a060T000002XL07QAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1724(家庭用車)",
          Car_Name: "協力乘者",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b67&feoid=00N0T00000DP0mC&refid=0EM0T0000001bov" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b67QAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "松平",
              Car_Driver_Id: "a060T000002XL0iQAG",
            },
          ],
        },
        {
          Project_WorkingDates: [],
          Project_RecordTypes: [
            {
              RecordType_Name: "1件目",
            },
            {
              RecordType_Name: "2件目",
            },
            {
              RecordType_Name: "3件目",
            },
            {
              RecordType_Name: "夜勤",
            },
          ],
          Project_Date: "2023-05-10",
          Car_No_With_Type: "1723(ワゴン)",
          Car_Name: "協力卖者",
          Car_Image:
            '<p><img src="https://kanto-kucho--uedev01.sandbox.file.force.com/servlet/rtaImage?eid=a000T00000H6b5o&feoid=00N0T00000DP0mC&refid=0EM0T0000001boq" alt="image.png"></img></p>',
          Car_Id: "a000T00000H6b5oQAB",
          Car_Drivers: [
            {
              Car_Driver_Name: "小早川",
              Car_Driver_Id: "a060T000002XL0dQAG",
            },
          ],
        },
      ],
    },
  ];

  @api index;
  @api item;
  @track selectedItem = null;

  connectedCallback() {
    // console.log(JSON.stringify(this.temporyData));

    this.temporyDetailData.forEach(function(item, index) {
        item.DispatchCarColDatas.forEach(function(subItem, subIndex) {
            // 转换日期 => 具体时间 Step 1
            subItem.Project_WorkingDates = this.parseDatetime(subItem.Project_WorkingDates);
        }, this);
    }, this);
  }
  
  // 转换日期 => 具体时间 Step 2
  parseDatetime(workingDatesArr) {
    console.log('$$$$$$ workingDatesArr: ' + JSON.stringify(workingDatesArr));
    let temporyArrs = [];
    workingDatesArr.forEach(function(item, index) {
        let dateObject = new Date(item.Project_Company_Dep_Worksite_Start_Time);
        item.Project_Company_Dep_Worksite_Start_Time = dateObject.toISOString().slice(11, 16);
        console.log('$$$$$$ item.Project_Company_Dep_Worksite_Start_Time: ' + item.Project_Company_Dep_Worksite_Start_Time);
        temporyArrs.push(item);
    })
    console.log('$$$$$$ temporyArrs: ' + JSON.stringify(temporyArrs));
    return temporyArrs;
  }

  // 找到Detail详细数据中唯一的Key 
  handleClick(event) {
    const itemId = event.currentTarget.dataset.id;
    console.log('$$$$$$ itemId: ' + itemId);
    // this.selectedItem = this.data.find((item) => item.id === itemId);

    // start
    let matchObj;
    this.temporyDetailData.forEach(function(item, index) {
        item.DispatchCarColDatas.forEach(function(subItem, subIndex) {
            // 匹配唯一的数据 Step 1
            let checkResult = this.matchUniqueWorkingDatas(subItem.Project_WorkingDates, itemId);
            if (checkResult != null && checkResult != undefined) {
                matchObj = checkResult;
            }
        }, this);
    }, this);
    // end

    console.log('$$$$$$ final matchObj: ' + JSON.stringify(matchObj));
    
    // 显示输入组件并获得光标点
    var inlineEditInputs = this.template.querySelectorAll(`[data-id="${itemId}"]`);
    console.log('$$$$$$ inlineEditInputs: ' + JSON.stringify(inlineEditInputs));
    inlineEditInputs.forEach(function(item, index) {
        if (item.getAttribute('data-title') == 'showDateInput') {
            // item.focus();
            item.style.display = 'none';
        } else if (item.getAttribute('data-title') == 'enterDateInput') {
            item.style.display = '';
            item.focus();
        }
    })
  }

  // 鼠标点击/鼠标离开 匹配唯一的数据 Step 2
  matchUniqueWorkingDatas(workingDatesArr, uniqueKey) {
    let temporySingleObj;
    workingDatesArr.forEach(function(item, index) {
        if (uniqueKey == item.Project_Unique_Key) {
            if (item.dateInput) {
                item.dateInput = false;
            } else {
                item.dateInput = true;
            }
            temporySingleObj = item;
        }
        
    })
    console.log('$$$$$$ temporySingleObj: ' + JSON.stringify(temporySingleObj));
    return temporySingleObj;
  }

  // 鼠标离开时将数据比对一下再保存渲染组件
  handleCheckPoint(event) {
    const uniqueKey = event.currentTarget.dataset.id;
    let changeTimeVal = event.target.value;
    console.log('$$$$$$ changeTimeVal: ' + changeTimeVal);

    // Create a new Date object with the current date and the time value
    // const today = new Date();
    // const timeParts = timeValue.split(':');
    // const hours = parseInt(timeParts[0], 10);
    // const minutes = parseInt(timeParts[1], 10);
    // const dateTimeValue = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

    // start
    let matchObj;
    this.temporyDetailData.forEach(function(item, index) {
        item.DispatchCarColDatas.forEach(function(subItem, subIndex) {
            // 鼠标离开时匹配唯一的数据 Step 1
            let checkResult = this.matchUniqueWorkingDatas(subItem.Project_WorkingDates, uniqueKey);
            if (checkResult != null && checkResult != undefined) {
                matchObj = checkResult;
            }
        }, this);
    }, this);
    // end

    if (matchObj.Project_Company_Dep_Worksite_Start_Time === changeTimeVal) {
        // 保存成功后 重新渲染页面
        // 获得光标点
        var inlineEditInputs = this.template.querySelectorAll(`[data-id="${uniqueKey}"]`);
        // console.log('$$$$$$ inlineEditInputs: ' + JSON.stringify(inlineEditInputs));
        inlineEditInputs.forEach(function(item, index) {
            if (item.getAttribute('data-title') == 'showDateInput') {
                item.style.display = '';
            } else if (item.getAttribute('data-title') == 'enterDateInput') {
                item.style.display = 'none';
            }
        })
        return;
    }

    // console.log('$$$$$$ 鼠标离开时将数据保存并重新渲染: ' + JSON.stringify(matchObj));
    // 找到对应数据后 根据数据中的信息 保存具体数据
    let finalSaveParamStr;
    let currentDateStr = matchObj.Project_Date;
    console.log('$$$$$$ currentDateStr: ' + currentDateStr);
    finalSaveParamStr = currentDateStr + ' ' + changeTimeVal;
    console.log('$$$$$$ finalSaveParamStr: ' + finalSaveParamStr);
    // 将字符串转换为Date对象
    let dateObj = new Date(finalSaveParamStr);
    // 将Date对象转换为DateTime对象
    let dateTimeObj = new Date(dateObj.getTime()).toISOString();

    testSaveDatetimeValueToOrg({recieveChangeDate: dateTimeObj, paramId: 'a082w00000XRsDDAA1'})
    .then(result => {
        console.log('$$$$$$ Update Change Status Success : ' + result);

        if (result) {
            // 保存成功后 重新渲染页面
            // 获得光标点
            var inlineEditInputs = this.template.querySelectorAll(`[data-id="${uniqueKey}"]`);
            // console.log('$$$$$$ inlineEditInputs: ' + JSON.stringify(inlineEditInputs));
            inlineEditInputs.forEach(function(item, index) {
                if (item.getAttribute('data-title') == 'showDateInput') {
                    item.style.display = '';
                } else if (item.getAttribute('data-title') == 'enterDateInput') {
                    item.style.display = 'none';
                }
            })
        }
    })
    .catch(error => {
        console.log('$$$$$$ Update Change Status Error: ' + JSON.stringify(error));
    })
  }


  sortBy(field, reverse, primer) {
    console.log("Sort by:reverse:" + reverse);
    var key = function (x) {
      return primer ? primer(x[field]) : x[field];
    };
    return function (a, b) {
      var A = key(a),
        B = key(b);
      if (A === undefined) A = "";
      if (B === undefined) B = "";
      return (A < B ? -1 : A > B ? 1 : 0) * [1, -1][+!!reverse];
    };
  }
}