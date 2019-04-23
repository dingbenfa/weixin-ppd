// pages/electronicCatalogue/index/index.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  goToCarriage: function(){
    wx.navigateTo({
      url: '/pages/electronicCatalogue/carriage/carriage',
    })
  },
  goToComponents: function(){
    wx.navigateTo({
      url: '/pages/electronicCatalogue/components/components',
    })
  }
})