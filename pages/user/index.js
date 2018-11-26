// pages/user/index.js
//获取应用实例
var App = getApp();

Page({
  data: {

  },
  onLoad: function(options) {
    this.getUserInfo();
  },
  getUserInfo(){
    App.HttpService.getUserInfo()
      .then(res => {
        const data = res.data;
        console.log(data)
      });
  },
  //跳转账户管理
  handleNavigateToAccount(ev){
      wx.navigateTo({
        url: 'accountManagement/index',
      })
  }
})