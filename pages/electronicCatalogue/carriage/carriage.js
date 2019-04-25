// pages/electronicCatalogue/carriage/carriage.js

//获取应用实例
var App = getApp();

Page({
  data: {
    nHistoryMore: true,
    vin: ''
  },
  onLoad: function(options) {

  },
  onReady: function() {

  },
  //表单提交
  formSubmit: function(e) {
    // console.log(e.detail.value);
    var vin = e.detail.value.vin;
    App.WxService.navigateTo('/pages/electronicCatalogue/confirmedTypeForCg/confirmedType', {
      vin: vin
    })
  },
  //扫码
  handleScanCarriage: function() {
    wx.scanCode({
      onlyFromCamera: true, // 只允许从相机扫码
      scanType: ['qrCode', 'pdf417'],
      success(res) {
        console.log(res)
        this.setData({
          vin: res.charSet
        });
      }
    })
  },
  handleHistoryMore: function() {
    this.setData({
      nHistoryMore: !this.data.nHistoryMore
    });
  }
})