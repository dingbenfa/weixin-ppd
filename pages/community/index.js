// pages/community/index.js
import infoData from "../../data/community";

Page({
  data: {
    userGrade: infoData.userInfo.userGrade,
    userRanking: infoData.userInfo.userRanking,
    communityList: infoData.communityList
  },
  onLoad: function(options) {

  },
  //查看排名
  handleLookUpGrade(event) {
    console.log(123);
  }
})