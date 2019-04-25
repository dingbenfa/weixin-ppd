// pages/electronicCatalogue/confirmedType/confirmedType.js

//获取应用实例
var App = getApp();

Page({
  data: {
    vin: null,
    brand: '',
    displacement: '',
    gearbox: '',
    model: '',
    year: ''
  },
  onLoad: function(options) {
    // console.log(options);
    this.setData({
      vin: options.vin
    });
  },
  onReady: function() {
    this.getSearchCarbasic();
  },
  getSearchCarbasic: function() {
    var params = {
      'vin': this.data.vin
    };

    App.HttpService.searchCarbasic(params).then(res => {
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
      brand: data.brand,
      displacement: data.displacement,
      gearbox: data.gearbox,
      model: data.model,
      year: data.year
    });
  },
  handleToSearch: function() {
    App.WxService.navigateTo('/pages/electronicCatalogue/carriageResultForCg/index', {
      vin: this.data.vin
    })
  }
})