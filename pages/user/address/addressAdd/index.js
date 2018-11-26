// pages/user/address/addressAdd/index.js
import userInfo from "../../../../data/userInfo.js"

Page({
  data: {
    customItem: '',
    region: ['广东省', '广州市', '海珠区'],
    contacts: "",
    contactsNumber: "",
    addressMark: "家",
    addrOther: ""
  },
  onLoad: function (options) {

  },
  //三级联动设置
  bindRegionChange: function (e) {
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
  }
})