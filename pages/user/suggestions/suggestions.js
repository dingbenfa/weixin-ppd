// pages/user/suggestions/suggestions.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //处理其他异常
  handleOtherAbnormal(ev){
    wx.navigateTo({
      url: 'otherAbnormal/otherAbnormal',
    })
  }
})