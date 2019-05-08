// pages/electronicCatalogue/index/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    searchInpVal: ''
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
  },
  handleSearchValue: function (e) {
    // console.log(e.detail.value);
    this.setData({
      searchInpVal: e.detail.value
    });
  },
  //搜索
  handleGoToSearch: function () {
    // console.log(this.data.searchInpVal);
    let vin = this.data.searchInpVal;
    App.WxService.navigateTo('/pages/electronicCatalogue/confirmedTypeForCg/confirmedType', {
      vin: vin
    })

    // App.WxService.navigateTo('/pages/electronicCatalogue/confirmedTypeForCp/confirmedType', {
    //   vin: vin
    // })
  }
})