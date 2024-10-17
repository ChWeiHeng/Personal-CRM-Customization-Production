({
  loadTopics: function (component, event, helper) {
    var action = component.get("c.getKnowledgeArticleVersionByTopicId");
    var topicId = component.get("v.recordId");
    action.setParam("topicId", topicId);
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var responses = response.getReturnValue();
        console.log('responses: ', responses);
        // if(responses != null && responses.length > 0) {
        //   var allKnowledgeArticlesObj = [];
        //   var knowledgeArticlesObj = [];
        //   responses.forEach(function (value) {
        //     var knowledgeObj = {};
        //     var dateValue = new Date(value.knowledgeData.LastPublishedDate);
        //     var dateStr = dateValue.getFullYear() + "/" + (dateValue.getMonth() + 1) + "/" + dateValue.getDate();
        //     knowledgeObj.Title = value.knowledgeData.Title;
        //     knowledgeObj.ArticleNumber = value.knowledgeData.ArticleNumber;
        //     knowledgeObj.UrlName = value.knowledgeData.UrlName;
        //     knowledgeObj.Id = value.knowledgeData.Id;
        //     knowledgeObj.KnowledgeArticleId = value.knowledgeData.KnowledgeArticleId;
        //     knowledgeObj.LastPublishedDate = dateStr;
        //     knowledgeObj.ViewCount = value.viewCount;
        //     allKnowledgeArticlesObj.push(knowledgeObj);
        //   });
        //   if (
        //     allKnowledgeArticlesObj != null &&
        //     allKnowledgeArticlesObj.length > 0
        //   ) {
        //     for (var i = 0; i < 3; i++) {
        //       if (
        //         allKnowledgeArticlesObj[i] != null &&
        //         allKnowledgeArticlesObj[i] != undefined
        //       ) {
        //         knowledgeArticlesObj.push(allKnowledgeArticlesObj[i]);
        //       }
        //     }
        //     knowledgeArticlesObj.forEach((value, index) => {
        //       for (var k = 0; k < allKnowledgeArticlesObj.length; k++) {
        //         if (allKnowledgeArticlesObj[k] == value) {
        //           allKnowledgeArticlesObj.splice(allKnowledgeArticlesObj[k], 1);
        //         }
        //       }
        //     });
        //   }
        //   if(allKnowledgeArticlesObj == null || allKnowledgeArticlesObj.length == 0) {
        //     component.set("v.loadMoreDataFlag", true);
        //   }
        //   component.set("v.knowledgeArticles", knowledgeArticlesObj);
        //   component.set("v.allKnowledgeArticles", allKnowledgeArticlesObj);
        // } else {
        //   component.set("v.loadMoreDataFlag", true);
        // }
      } else {
        console.log('response.getError(): ', response.getError());
      }
    });
    $A.enqueueAction(action);
  },

  // より多くのデータをロードする
  loadMoreData: function (component, event, helper) {
    var allKnowledgeArticles = component.get("v.allKnowledgeArticles");
    var knowledgeArticlesObj = component.get("v.knowledgeArticles");
    if (allKnowledgeArticles != null && allKnowledgeArticles.length > 0) {
      for (var i = 0; i < 3; i++) {
        if (
          allKnowledgeArticles[i] != null &&
          allKnowledgeArticles[i] != undefined
        ) {
          knowledgeArticlesObj.push(allKnowledgeArticles[i]);
        }
      }
      knowledgeArticlesObj.forEach((value, index) => {
        for (var k = 0; k < allKnowledgeArticles.length; k++) {
          if (allKnowledgeArticles[k] == value) {
            allKnowledgeArticles.splice(allKnowledgeArticles[k], 1);
          }
        }
      });
      if(allKnowledgeArticles == null || allKnowledgeArticles.length ==0) {
        component.set("v.loadMoreDataFlag", true);
      }
    } else {
      component.set("v.loadMoreDataFlag", true);
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
  }
});