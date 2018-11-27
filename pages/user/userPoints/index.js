// pages/user/userPoints/index.js
import userInfo from "../../../data/userInfo.js"

Page({
  data: {
    userPoints: userInfo.userPoints,
    pointsList: userInfo.pointsList,
    signInNum: 1,
    isSignIn: false
  },
  onLoad: function(options) {

  },
  //签到获取积分
  handleSignInPoints(ev) {
    let userPoints = this.data.userPoints;
    let signInNum = this.data.signInNum + 1;
    let pointsList = this.data.pointsList;
    let stime = this.getNowDate();
    let newSignObj = {
      "title": "签到",
      "about": "签到获取积分", //积分说明
      "stime": stime, //时间
      "points": signInNum
    };
    pointsList.unshift(newSignObj);

    if (!this.data.isSignIn) {
      this.setData({
        userPoints: userPoints + signInNum,
        signInNum: signInNum,
        pointsList: pointsList,
        isSignIn: true
      });
    }
  },
  getNowDate(){
    var myDate = new Date();
    var time = myDate.toLocaleDateString().split('/').join('-');
    return time;
  }
})