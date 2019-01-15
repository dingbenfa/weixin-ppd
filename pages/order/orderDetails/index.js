// pages/order/orderDetails/index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    orderNo: null,
    orderInfo: {},
    orderStatus: 0,//4---已取消
    discount: [] //返现
  },
  onLoad: function(options) {
    this.goods = App.HttpResource('/mobile/home/orderDetail', {
      orderNo: '@orderNo'
    });

    this.setData({
      orderNo: options.orderNo
    })
  },
  onShow() {
    this.getOrderDetail(this.data.orderNo)
  },
  getOrderDetail(orderNo) {
    // App.HttpService.getOrderDetail(orderNo)
    this.goods.getAsync({
        orderNo: orderNo
      }).then(res => {
        const data = res.data.responseData;
        console.log(data)

        this.setData({
          orderInfo: data,
          orderStatus: data.orderStatus,
          discount: data.discount || []
        })
      })
  },
  //查看物流
  handleLookOrderLogs(){
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //再次购买
  handlePayAgin(ev){
    wx.navigateTo({
      url: '../../order/confirm/confirm',
    })
  },
  //客服
  handleNavagiteToServise() {
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  }
})