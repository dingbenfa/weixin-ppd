// pages/order/confirm/confirm.js
import userInfo from "../../../data/userInfo.js";

//获取应用实例
var App = getApp();

Page({
  data: {
    defaultAddr: null
  },
  onLoad: function(options) {
      this.setData({
        defaultAddr: userInfo.address[2]
      })
  },
  handleNavagiteToAddr(){
    wx.navigateTo({
      url: '../../user/address/address',
    })
  },
  handleSubmitOrder(){
    wx.showModal({
      title: "提示",
      content: '您已成功下单，请前往支付！',
      confirmText: '去支付',
      success(res) {
        if (res.confirm) {
          let orderNo = App.getTestOrderNumber(); //获取随机订单号
          App.handleToPayment(orderNo); //去付款
        } else if (res.cancel) {
          wx.navigateTo({
            url: '../order/index?orderStatus=0',
          })
        }
      }
    });
  }
})