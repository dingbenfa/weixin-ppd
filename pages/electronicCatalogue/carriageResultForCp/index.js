// pages/electronicCatalogue/carriageResult/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    isMore: false,
    vin: '',
    brandCode: '',
    name: '',
    brand: '',
    inventory: '',
    hasComponent: '',
    hasReplace: '',
    modelImage: '',
    images: ''
  },
  onLoad: function(options) {
    console.log(options);

    this.setData({
      brandCode: options.brand || '',
      vin: options.vin || ''
    });
  },
  onReady: function() {
    this.getEleTronicResult();
  },
  getEleTronicResult: function() {
    var params = {
      'brand': this.data.brandCode,
      'vin': this.data.vin
    };
    App.HttpService.getCpSearchInfo(params).then(res => {
      var data = res.data
      console.log(data)
      if (data.code == "0000") {
        var reData = data.responseData;
        this.handleResponseData(reData);
      }
    })
  },
  handleResponseData: function(data) {
    this.setData({
      name: data.name,
      brand: data.brand,
      inventory: data.inventory,
      hasComponent: data.hasComponent,
      hasReplace: data.hasReplace,
      modelImage: data.modelImage,
      images: data.images
    });
  },
  handleSearchValue: function(e) {
    // console.log(e.detail.value);
    this.setData({
      searchInpVal: e.detail.value
    });
  },
  //搜索
  handleGoToSearch: function() {
    console.log(this.data.searchInpVal);
    wx.showModal({
      title: "抱歉！该功能正在开发中！！！",
      showCancel: false
    });
  },
  //更多
  handleItemsMore: function() {
    this.setData({
      isMore: !this.data.isMore
    });
  },
  handleToItems: function() {
    wx.showModal({
      title: "抱歉！该功能正在开发中！！！",
      showCancel: false
    });
  }
})