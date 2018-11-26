// pages/user/address/address.js
import userInfo from "../../../data/userInfo.js"

Page({
  data: {
    addressList: userInfo.address,
    defaultAddrNum: 1,
    promptHidden: true
  },
  onLoad: function(options) {
    this.getAddrTemp();
  },
  getAddrTemp() {
    let addressList = this.data.addressList;
    this.setData({
      promptHidden: addressList.length !== 0
    });
  },
  //单选地址
  handleAddrChecked(ev) {
    let index = ev.currentTarget.dataset.index + 1;
    this.setData({
      defaultAddrNum: index
    });
  },
  //跳转编辑
  handleNavigateToEdit(ev) {
    let index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'addressEdit/index?index=' + index,
    })
  },
  //跳转新增
  handleNavigateToAdd(ev) {
    wx.navigateTo({
      url: 'addressAdd/index',
    })
  }
})