// pages/community/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    userGrade: 0,
    userRanking: 0,
    communityList: []
  },
  onLoad: function(options) {
    this.getCommunityInfo();
  },
  getCommunityInfo: function() {
    App.HttpService.getCommunityInfo()
      .then(res => {
        const data = res.data;
        // console.log(data)
        this.setData({
          userGrade: data.topUserSummaryInfo.grade,
          userRanking: data.topUserSummaryInfo.rank,
          communityList: data.articleList
        });
      });
  },
  //查看排名
  handleLookUpGrade(event) {
    console.log(123);
  }
})