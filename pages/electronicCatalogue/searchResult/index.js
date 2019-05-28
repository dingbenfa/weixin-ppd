// pages/electronicCatalogue/searchResult/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    searchInpVal: null,
    theType: 1, //顶部标签页切换默认值
    theTypeOneSel: 1, //顶部车辆配置下得标签切换默认值
    theGroupType: 1, //按组查询级别默认
    theGroupValue: { //组级别默认值
      mainGroupName: '',
      mainGroup: '',
      subGroupName: '',
      subGroup: '',
      picGroup: ''
    },
    picIndexSel: 0, //配件图示默认值
    isPicTo: 0, //车辆配置是否显示配件图示详情
    carIinfoImgSrc: '',
    vehicleConfigInfo: {}, //车辆配置信息
    mainGroupList: [], //主组
    subGroupList: [], //子组
    picGroupList: [] //图组
  },
  onLoad: function(options) {
    // console.log(options);
    this.setData({
      searchInpVal: options.vin || "LBVHZ1105HMJ14266",
      theType: options.type || 1
    });
    this.getSearchData();
  },
  getSearchData: function() {
    var params = {
      'q': this.data.searchInpVal
    };
    App.HttpService.getCarForCGInfo(params).then(res => {
      var data = res.data
      console.log("vehicleConfigInfo");
      console.log(data);
      if (data.code == "0000") {
        var reData = data.responseData;
        this.handleResponseData(reData);
      } else {
        wx.showModal({
          title: "抱歉！未查询到相关信息，请重试",
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/electronicCatalogue/search/index?type="cgType"',
              })
            }
          }
        });
      }
    });
  },
  handleResponseData: function(data) {
    this.setData({
      searchInpVal: data.vin,
      vehicleConfigInfo: data,
      carIinfoImgSrc: data.imageList ? data.imageList[0] : ''
    });
    wx.setNavigationBarTitle({
      title: data.mainInfo.chexing
    });

    this.getVinmaingrpInfo();
    this.handleSearchHistory(data);
  },
  //处理历史搜索
  handleSearchHistory: function(data) {
    var util = require('../../../utils/util.js');
    var stime = util.formatTimeStr(new Date());
    var self = this;
    wx.getStorage({
      key: 'cgHistoryList',
      success(res) {
        var cgHisList = res.data || [];
        var obj = {
          value: self.data.searchInpVal,
          stime: stime,
          chexing: data.mainInfo.chexing,
          xilie: data.mainInfo.xilie,
          pailiang: data.mainInfo.pailiang
        };
        cgHisList.push(obj);
        wx.setStorage({
          key: 'cgHistoryList',
          data: cgHisList
        });
      }
    });
  },
  //获取主组信息
  getVinmaingrpInfo: function() {
    var params = {
      'vin': this.data.searchInpVal
    };
    App.HttpService.getVinmaingrpInfo(params).then(res => {
      var data = res.data
      console.log("mainGroupList");
      console.log(data);
      if (data.code == "0000") {
        var reData = data.responseData;
        this.setData({
          mainGroupList: reData.mainGroupList || []
        });
      }
    });
  },
  //获取图组
  getVingrppicsInfo: function() {
    var params = {
      'vin': this.data.searchInpVal,
      'maingrp': this.data.theGroupValue.mainGroup,
      'subgrp': this.data.theGroupValue.subGroup
    };
    App.HttpService.getVingrppicsInfo(params).then(res => {
      var data = res.data
      console.log("picGroupList");
      console.log(data);
      if (data.code == "0000") {
        var reData = data.responseData;
        this.setData({
          picGroupList: reData.picGroupList || []
        });
      }
    });
  },
  //切换内容
  handleChangeType: function(ev) {
    this.setData({
      isPicTo: 0,
      theType: ev.currentTarget.dataset.type
    });
  },
  //切换车辆主要信息与配置信息
  handleChangeMainSel: function(ev) {
    this.setData({
      theTypeOneSel: ev.currentTarget.dataset.type
    });
  },
  //获取子组
  handleToSub: function(ev) {
    var mainGroupitem = ev.currentTarget.dataset.item;
    this.setData({
      theGroupType: 2,
      theGroupValue: {
        mainGroupName: mainGroupitem.label,
        mainGroup: mainGroupitem.num,
        subGroupName: '',
        subGroup: '',
        picGroup: ''
      }
    });

    var params = {
      'vin': this.data.searchInpVal,
      'maingrp': mainGroupitem.num
    };
    App.HttpService.getVinsubgrpInfo(params).then(res => {
      var data = res.data
      console.log("subGroupList");
      console.log(data);
      if (data.code == "0000") {
        var reData = data.responseData;
        this.setData({
          subGroupList: reData.subGroupList || []
        })
      }
    });
  },
  //获取图组
  handleToPic: function(ev) {
    var subGroupItem = ev.currentTarget.dataset.item;
    this.setData({
      theGroupType: 3,
      theGroupValue: {
        mainGroupName: this.data.theGroupValue.mainGroupName,
        mainGroup: this.data.theGroupValue.mainGroup,
        subGroupName: subGroupItem.name,
        subGroup: subGroupItem.subgroup,
        picGroup: ''
      }
    });

    this.getVingrppicsInfo();
  },
  //图组前往p配件图示
  handleToPicShow: function(ev) {
    this.setData({
      theType: 5
    });
  },
  //返回主组
  handleBackToMain: function() {
    this.setData({
      theGroupType: 1
    });
  },
  //返回子组
  handleBackToSub: function() {
    this.setData({
      theGroupType: 2
    });
  },
  //配件图示点击选中配件
  handlePicItemSel: function(ev) {
    var itemIndex = ev.currentTarget.dataset.index;
    this.setData({
      picIndexSel: itemIndex
    });
  },
  //配件图示跳转详情
  handlePicToDetail: function(ev) {
    var itemIndex = ev.currentTarget.dataset.index;
    this.setData({
      theType: 1,
      isPicTo: 1,
      picIndexSel: itemIndex
    });
  },
  //加入购物车
  handleAddCart(ev) {
    wx.showToast({
      title: "加入购物车成功"
    });
  },
  //立即购买
  handleToPay: function() {
    wx.navigateTo({
      url: '../../order/confirm/confirm',
    })
  }
})