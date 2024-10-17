({
  init: function (component, event, helper) {
    var searchTextJson = sessionStorage.getItem('searchText');
    var searchText = JSON.parse(searchTextJson).c__searchText;
    console.log("searchText: ", searchText);
    var action = component.get("c.searchKnowledgeDataByParam");
    action.setParam("searchParam", searchText);
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var allKnowledgeArticlesData = response.getReturnValue();
        console.log(allKnowledgeArticlesData);
        if (
          allKnowledgeArticlesData != null &&
          allKnowledgeArticlesData.length > 0
        ) {
          allKnowledgeArticlesData.forEach((element) => {
            var dateTimeVal = new Date(element.LastModifiedDate);
            element.LastModifiedDate =
              dateTimeVal.getFullYear() +
              "/" +
              (dateTimeVal.getMonth() + 1) +
              "/" +
              dateTimeVal.getDate() +
              " " +
              dateTimeVal.getHours() +
              ":" +
              dateTimeVal.getSeconds();
            // case one serach value replace content
            // const regSearchStr = new RegExp(searchText, "gi");
            // const replacedTitle = element.Title.replaceAll(regSearchStr, '<span style="background-color:yellow">' + searchText + "</span>");
            // element.Title = replacedTitle;
            // const replacedAnswer = element.Answer__c.replaceAll(regSearchStr, '<span style="background-color:yellow">' + searchText + "</span>");
            // element.Answer__c = replacedAnswer;

            // case two serach value not replace content
            // element.Answer__c = element.Answer__c.substring(0, 300);
            // case two serach value not replace content
            var upperResult = element.Answer__c.toUpperCase();
            var lowResult = element.Answer__c.toLowerCase();
            var upperStartIndex = upperResult.indexOf(searchText.toUpperCase(), 0);
            var lowStartIndex = lowResult.indexOf(searchText.toLowerCase(), 0);

            if (upperStartIndex > -1 && lowStartIndex == -1) {
              // capital letter
              if (upperResult.length - upperStartIndex >= 300) {
                // Cut back from keyword 300 (keyword position, 299)
                element.Answer__c = element.Answer__c.substring(
                  upperStartIndex,
                  upperStartIndex + 299
                );
              } else {
                if (upperStartIndex >= 300) {
                  // Keyword position greater than 300 (keyword position - 299 keyword)
                  element.Answer__c = element.Answer__c.substring(
                    upperStartIndex - 299,
                    upperStartIndex + searchText.length
                  );
                } else {
                  // Keyword position less than 300 (0, keyword + 1)
                  element.Answer__c = element.Answer__c.substring(
                    0,
                    upperStartIndex + searchText.length
                  );
                }
              }
            } else if (lowStartIndex > -1 && upperStartIndex == -1) {
              // lowercase letter
              if (lowResult.length - lowStartIndex >= 300) {
                // Cut back 300 from keyword (keyword position, 299)
                element.Answer__c = element.Answer__c.substring(
                  lowStartIndex,
                  lowStartIndex + 299
                );
              } else {
                if (lowStartIndex >= 300) {
                  // Keyword position greater than 300(keyword position - 299 keyword + 1)
                  element.Answer__c = element.Answer__c.substring(
                    lowStartIndex - 299,
                    lowStartIndex + searchText.length
                  );
                } else {
                  // Keyword position less than 300 (0, keyword + 1)
                  element.Answer__c = element.Answer__c.substring(
                    0,
                    lowStartIndex + searchText.length
                  );
                }
              }
            } else if(lowStartIndex > -1 && upperStartIndex > -1) {
              // have capital letter & lowercase letter
              if (lowStartIndex > upperStartIndex) {
                // Capital in the former
                if (upperResult.length - upperStartIndex >= 300) {
                  // Cut back from keyword 300 (keyword position, 299)
                  element.Answer__c = element.Answer__c.substring(
                    upperStartIndex,
                    upperStartIndex + 299
                  );
                } else {
                  // Less than 300
                  if (upperStartIndex >= 300) {
                    // Keyword position greater than 300 (keyword position - 299 keyword)
                    element.Answer__c = element.Answer__c.substring(
                      upperStartIndex - 299,
                      upperStartIndex + searchText.length
                    );
                  } else {
                    // Keyword position less than 300 (0, keyword + 1)
                    element.Answer__c = element.Answer__c.substring(
                      0,
                      upperStartIndex + searchText.length
                    );
                  }
                }
              } else {
                // Lower case in the former
                if (lowResult.length - lowStartIndex >= 300) {
                  // Cut back from keyword 300 (keyword position, 299)
                  element.Answer__c = element.Answer__c.substring(
                    lowStartIndex,
                    lowStartIndex + 299
                  );
                } else {
                  if (lowStartIndex >= 300) {
                    // Keyword position greater than 300 (keyword position - 299 keyword)
                    element.Answer__c = element.Answer__c.substring(
                      lowStartIndex - 299,
                      lowStartIndex + searchText.length
                    );
                  } else {
                    // Keyword position less than 300 (0, keyword)
                    element.Answer__c = element.Answer__c.substring(
                      0,
                      lowStartIndex + searchText.length
                    );
                  }
                }
              }
            } else {
              console.log('error - indexof(true)');
            }

            let titleVal = element.Title.match(new RegExp(searchText, "gi"));
            let finalTitleVal = element.Title;
            if (titleVal) {
              for (var j = 0; j < titleVal.length; j++) {
                finalTitleVal = finalTitleVal.replace(
                  titleVal[j],
                  "[*" + j + "*]"
                );
              }
              for (var i = 0; i < titleVal.length; i++) {
                finalTitleVal = finalTitleVal.replace(
                  "[*" + i + "*]",
                  '<span style="background-color:yellow">' +
                    titleVal[i] +
                    "</span>"
                );
              }
            }
            element.Title = finalTitleVal;

            let answerVal = element.Answer__c.match(
              new RegExp(searchText, "gi")
            );
            let finalAnswerVal = element.Answer__c;
            if (answerVal) {
              for (var j = 0; j < answerVal.length; j++) {
                finalAnswerVal = finalAnswerVal.replace(
                  answerVal[j],
                  "[*" + j + "*]"
                );
              }
              for (var i = 0; i < answerVal.length; i++) {
                finalAnswerVal = finalAnswerVal.replace(
                  "[*" + i + "*]",
                  '<span style="background-color:yellow">' +
                    answerVal[i] +
                    "</span>"
                );
              }
            }
            element.Answer__c = finalAnswerVal;

            // case three case sensitive
            // element.Title = element.Title.replaceAll(searchText, '<span style="background-color:yellow">' + searchText + '</span>');
            // element.Answer__c = element.Answer__c.replaceAll(searchText, '<span style="background-color:yellow">' + searchText + '</span>');
            // element.Answer__c = element.Answer__c.substring(0, 1000);
          });
          var knowledgeArticlesObj = [];
          for (var i = 0; i < 5; i++) {
            if (
              allKnowledgeArticlesData[i] != null &&
              allKnowledgeArticlesData[i] != undefined
            ) {
              knowledgeArticlesObj.push(allKnowledgeArticlesData[i]);
            }
          }
          knowledgeArticlesObj.forEach((value) => {
            for (var k = 0; k < allKnowledgeArticlesData.length; k++) {
              if (allKnowledgeArticlesData[k] == value) {
                allKnowledgeArticlesData.splice(allKnowledgeArticlesData[k], 1);
              }
            }
            console.log("allKnowledgeArticlesData: ", allKnowledgeArticlesData);
          });
          if (
            allKnowledgeArticlesData != null &&
            allKnowledgeArticlesData.length > 0
          ) {
            component.set("v.loadMoreDataFlag", true);
          }
        } else {
          component.set("v.loadMoreDataFlag", false);
        }
        component.set("v.knowledgeArticles", knowledgeArticlesObj);
        component.set("v.allKnowledgeArticlesData", allKnowledgeArticlesData);
      } else {
        console.log("error: ", response.getError());
      }
    });
    $A.enqueueAction(action);
  },

  // より多くのデータをロードする
  loadMoreData: function (component, event, helper) {
    var allKnowledgeArticles = component.get("v.allKnowledgeArticlesData");
    var knowledgeArticlesObj = component.get("v.knowledgeArticles");
    console.log('allKnowledgeArticles: ', allKnowledgeArticles);
    console.log('knowledgeArticlesObj: ', knowledgeArticlesObj);
    if (allKnowledgeArticles != null && allKnowledgeArticles.length > 0) {
      for (var i = 0; i < 5; i++) {
        if (
          allKnowledgeArticles[i] != null &&
          allKnowledgeArticles[i] != undefined
        ) {
          knowledgeArticlesObj.push(allKnowledgeArticles[i]);
        }
      }
      knowledgeArticlesObj.forEach((value) => {
        for (var k = 0; k < allKnowledgeArticles.length; k++) {
          if (allKnowledgeArticles[k] == value) {
            allKnowledgeArticles.splice(allKnowledgeArticles[k], 1);
          }
        }
      });
      if(allKnowledgeArticles != null && allKnowledgeArticles.length > 0) {
        component.set("v.loadMoreDataFlag", true);
      } else {
        component.set("v.loadMoreDataFlag", false);
      }
    } else {
      component.set("v.loadMoreDataFlag", false);
    }
    component.set("v.knowledgeArticles", knowledgeArticlesObj);
    component.set("v.allKnowledgeArticles", allKnowledgeArticles);
  },

  // 知識の詳細ページへ
  handleKnowledgePageNavigate: function (component, event, helper) {
    const recordId = event.currentTarget.getAttribute("name");
    var navService = component.find("navService");
    var pageRef = {
      type: "standard__recordPage",
      attributes: {
        actionName: "view",
        objectApiName: "Topic",
        recordId: recordId,
      },
    };
    navService.navigate(pageRef, true);
  },

  // ツール・メソッド
  getHignLightResult : function(searchText, contentText) {
    let regVal = element.Title.match(new RegExp(searchText, 'gi'));
    if (regVal) {
      for (var j = 0; j < regVal.length; j ++) {
        contentText = contentText.replace(regVal[j], '[*' + j + '*]');
      }
      for (var i = 0; i < regVal.length; i ++) {
        contentText = contentText.replace('[*' + i + '*]', '<span style="background-color:yellow">' + regVal[i] + '</span>');
      }
      return contentText;
    }
  },
});