// pages/user/accountManagement/index.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //跳转收货地址管理
  handleNavigateToAddr(ev){
    wx.navigateTo({
      url: '../address/address',
    })
  }
})