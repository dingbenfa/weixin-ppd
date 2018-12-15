// pages/user/accountManagement/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    accountInfo: {}
  },
  onLoad: function (options) {
    this.getAccountInfo();
  },
  getAccountInfo(){
    App.HttpService.getAccountInfo()
      .then(res => {
        const data = res.data.responseData;
        // console.log(data)

        this.setData({
          accountInfo: data
        });
      });
  },
  //跳转收货地址管理
  handleNavigateToAddr(ev){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //修改绑定手机号码
  updateUserPhone(){
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //修改登录密码
  updateUserPassword(){
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //退出登录
  userLoginOut(){
    wx.showModal({
      title: "确认退出登录吗？",
      showCancel: true,
      success: function(){
        wx.switchTab({
          url: '../../index/index',
        })
      }
    });
  }
})