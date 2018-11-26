// pages/user/address/addressEdit/index.js
import userInfo from "../../../../data/userInfo.js"

Page({
  data: {
    customItem: '',
    region: ['广东省', '广州市', '海珠区'],
    contacts: "张三",
    contactsNumber: "135****5435",
    addressMark: "家",
    addrOther: "广兰路123弄42号602"
  },
  onLoad: function(options) {

  },
  //三级联动设置
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //清楚数据
  handleInpClearVal(ev) {
    let name = ev.currentTarget.dataset.name;
    this.setData({
      [name]: ""
    });
  },
  //设置地址标签
  handleChangeMark(ev) {
    let name = ev.currentTarget.dataset.name;
    this.setData({
      addressMark: name
    });
  },
  //删除地址
  handleDeteleAddr(ev) {
    wx.showModal({
      title: '确认删除该地址吗？',
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})