// pages/electronicCatalogue/search/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    searchInpVal: null,
    type: 'cgType',
    cgHisList: []
  },
  onLoad: function(options) {
    console.log(options);
    this.setData({
      type: options.type || 'cgType'
    });

    wx.getStorage({
      key: options.type == 'cgType' ? 'cgHistoryList' : 'cpHistoryList',
      success(res) {
        var cgHisList = res.data || [];
        this.setData({
          cgHisList: cgHisList
        });
      }
    });
  },
  onReady: function() {

  },
  handleSearchValue: function(e) {
    // console.log(e.detail.value);
    this.setData({
      searchInpVal: e.detail.value
    });
  },
  //查询
  handleGoToSearch: function() {
    var vin = this.data.searchInpVal;
    if (this.data.type == "cgType") {
      var msg = "请输入车架号查询！！！";
      var navigateToUrl = '/pages/electronicCatalogue/searchResult/index';
    } else {
      var msg = "请输入零件号查询！！！";
      var navigateToUrl = '/pages/electronicCatalogue/searchResultForCp/index';
    }

    if (!vin) {
      wx.showModal({
        title: msg,
        showCancel: false
      });
      return false;
    };
    App.WxService.navigateTo(navigateToUrl, {
      vin: vin
    })
  },
  handleSearchTheVal: function(ev) {
    var vin = ev.currentTarget.dataset.vin;

    if (this.data.type == "cgType") {
      var navigateToUrl = '/pages/electronicCatalogue/searchResult/index';
    } else {
      var navigateToUrl = '/pages/electronicCatalogue/searchResultForCp/index';
    };
    App.WxService.navigateTo(navigateToUrl, {
      vin: vin
    })
  }
})