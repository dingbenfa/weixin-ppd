// pages/order/confirm/confirm.js
import userInfo from "../../../data/userInfo.js"

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
    wx.showToast({
      title: "提交订单成功"
    });
  }
})