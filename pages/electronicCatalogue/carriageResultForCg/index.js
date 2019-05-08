// pages/electronicCatalogue/carriageResult/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    isMore: false,
    vin: null,
    searchInpVal: "",
    saleCode: "",
    model: "",
    produceDate: "",
    motorCode: "",
    displacement: "",
    gearbox: "",
    chassisCode: "",
    bodyColor: "",
    decorationColor: "",
    maintanceRecord: "",
    insuranceRecord: "",
    carState: ""
  },
  onLoad: function(options) {
    console.log(options);
    this.setData({
      vin: options.vin
    });
  },
  onReady: function() {
    this.getEleTronicResult();
  },
  getEleTronicResult: function() {
    var params = {
      'vin': this.data.vin
    };
    App.HttpService.getEleTronicResult(params).then(res => {
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
      "saleCode": data.saleCode,
      "model": data.model,
      "produceDate": data.produceDate,
      "motorCode": data.motorCode,
      "displacement": data.displacement,
      "gearbox": data.gearbox,
      "chassisCode": data.chassisCode,
      "bodyColor": data.bodyColor,
      "decorationColor": data.decorationColor,
      "maintanceRecord": data.maintanceRecord,
      "insuranceRecord": data.insuranceRecord,
      "carState": data.carState
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
    // console.log(this.data.searchInpVal);
    let vin = this.data.searchInpVal;
    App.WxService.navigateTo('/pages/electronicCatalogue/confirmedTypeForCg/confirmedType', {
      vin: vin
    })
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