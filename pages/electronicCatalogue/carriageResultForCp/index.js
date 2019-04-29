// pages/electronicCatalogue/carriageResult/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    modalHidden: true,
    isMore: false,
    vin: '',
    brandCode: '',
    name: '',
    brand: '',
    inventory: '',
    hasComponent: '',
    hasReplace: '',
    modelImage: '',
    images: '',
    modelImageType: 0
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
      'pid': this.data.vin
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
  },
  /**
  * 显示弹窗
  */
  buttonTap: function (ev) {
    let type = ev.currentTarget.dataset.type;
    this.setData({
      modalHidden: false,
      modelImageType: type
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  }
})