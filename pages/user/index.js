// pages/user/index.js
//获取应用实例
var App = getApp();

Page({
  data: {
    userInfo: null
  },
  onLoad: function(options) {
    this.getUserInfo();
  },
  getUserInfo() {
    App.HttpService.getUserInfo()
      .then(res => {
        const data = res.data.responseData;
        console.log(data)

        this.setData({
          userInfo: data.userInfo
        });
      });
  },
  //跳转账户管理
  handleNavigateToAccount(ev) {
    wx.navigateTo({
      url: 'accountManagement/index',
    })
  },
  //跳转收藏夹
  handleNavigateToCollection(ev) {
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //跳转收优惠券
  handleNavigateToDiscount(ev) {
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //跳转积分
  handleNavigateToPoints(ev) {
    wx.navigateTo({
      url: 'userPoints/index',
    })
  },
  //跳转管理收货地址
  handleNavigateToAddress(ev) {
    wx.navigateTo({
      url: 'address/address',
    })
  },
  //跳转客服电话
  handleNavigateToService(ev){
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //跳转意见反馈
  handleNavigateToSuggestions() {
    wx.navigateTo({
      url: 'suggestions/suggestions',
    })
  },
  //跳转所有订单
  handleNavigateToOrder(ev) {
    let orderStatus = ev.currentTarget.dataset.orderstatus;
    // console.log(orderStatus);
    
    if (orderStatus !== "") {
      wx.navigateTo({
        url: '../order/order/index?orderStatus=' + orderStatus,
      })
    } else {
      wx.showModal({
        title: "抱歉！该模块尚未开发",
        showCancel: false
      });
    }
  }
})