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
  },
  //跳转积分
  handleNavigateToPoints(ev){
    wx.navigateTo({
      url: 'userPoints/index',
    })
  },
  //跳转管理收货地址
  handleNavigateToAddress(ev) {
    wx.navigateTo({
      url: 'address/address',
    })
  },
  //跳转意见反馈
  handleNavigateToSuggestions(){
    wx.navigateTo({
      url: 'suggestions/suggestions',
    })
  },
  //跳转所有订单
  handleNavigateToOrder(ev){
    wx.navigateTo({
      url: '../order/order/index',
    })
  }
})