// pages/electronicCatalogue/confirmedType/confirmedType.js

//获取应用实例
var App = getApp();

Page({
  data: {
    vin: '',
    nowIndex: 0,
    cpDataList: [],
    brandItemList: [],
    modelItemList: []
  },
  onLoad: function(options) {
    // console.log(options);
    this.setData({
      vin: options.vin || ""
    });
  },
  onReady: function() {
    this.getSearchCarbasic();
  },
  getSearchCarbasic: function() {
    var params = {
      'pid': this.data.vin
    };

    App.HttpService.getSearchmodels(params).then(res => {
      var data = res.data
      console.log(data)
      if (data.code == "0000") {
        var reData = data.responseData.data || [];
        this.handleResponseData(reData);

      }
    })

  },
  handleResponseData: function(data) {
    var brandArr = [],
      modelArr = [];
    for (var i = 0; i < data.length; i++) {
      brandArr.push(data[i].brandname);
      modelArr.push(data[i].carsModel);
    };

    this.setData({
      nowIndex: 0,
      cpDataList: data,
      brandItemList: brandArr,
      modelItemList: modelArr
    });
  },
  handleToSearch: function() {
    var brand = this.data.cpDataList[this.data.nowIndex].brandCode;
    console.log(this.data.vin);
    App.WxService.navigateTo('/pages/electronicCatalogue/carriageResultForCp/index', {
      brand: brand,
      vin: this.data.vin
    })
  },
  handleOpenBrand: function() {
    var self = this;
    wx.showActionSheet({
      itemList: this.data.brandItemList,
      success(res) {
        self.setData({
          nowIndex: res.tapIndex
        });
      }
    })
  },
  handleOpenModel: function() {
    var self = this;
    wx.showActionSheet({
      itemList: this.data.modelItemList,
      success(res) {
        self.setData({
          nowIndex: res.tapIndex
        });
      }
    })
  }
})