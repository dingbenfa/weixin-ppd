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
  }
})