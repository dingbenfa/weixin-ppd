// pages/electronicCatalogue/components/components.js

//获取应用实例
var App = getApp();

Page({
  data: {
    nHistoryMore: true,
    cgHisList: []
  },
  onLoad: function(options) {
    var self = this;

    wx.getStorage({
      key: 'cpHistoryList',
      success(res) {
        var cgHisList = res.data || [];
        self.setData({
          cgHisList: cgHisList
        });
      }
    });
  },
  onReady: function() {

  },
  //表单提交
  formSubmit: function(e) {
    // console.log(e.detail.value);
    var vin = e.detail.value.vin;
    App.WxService.navigateTo('/pages/electronicCatalogue/confirmedTypeForCp/confirmedType', {
      vin: vin
    })
  },
  handleHistoryMore: function() {
    this.setData({
      nHistoryMore: !this.data.nHistoryMore
    });
  }
})