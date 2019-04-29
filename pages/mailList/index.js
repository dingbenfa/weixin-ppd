// pages/mailList/index.js
import avatarsIndexes from '../../data/mailList';

//获取应用实例
var App = getApp();

Page({
  data: {
    searchInpVal: '杭州',
    current: 'A',
    to: 0,
    avatars: [],
    sellerList: [], //汽配
    repairerList: [], //汽修
    insurancerList: [], // 汽保
    nowType: 1
  },

  onReady() {
    this.getStoreListData();
  },

  getStoreListData: function() {
    var params = {
      'area': this.data.searchInpVal
    };
    App.HttpService.getStoreList(params).then(res => {
      var data = res.data
      // console.log(data)
      if (data.code == "0000") {
        let reData = data.responseData;
        this.setData({
          sellerList: reData.sellerList || [], //汽配,
          repairerList: reData.repairerList || [], //汽修,
          insurancerList: reData.insurancerList || [] //汽保
        });
        this.handleFilterTyoe(this.data.nowType);
      }
    })
  },

  //数据格式处理
  handleDataJson: function(arr) {
    arr.forEach((item, key) => {
      item.id = "ding" + key;
    });
    avatarsIndexes.forEach((item, key) => {
      if (item.id === "H") {
        item.items = arr;
        item.enabled = arr.length === 0 ? false : true;
      }
    });
    return avatarsIndexes;
  },

  //过滤分类
  handleFilterTyoe: function(type) {
    switch (type) {
      case 1:
        this.setData({
          avatars: this.handleDataJson(this.data.sellerList)
        });
        break;
      case 2:
        this.setData({
          avatars: this.handleDataJson(this.data.repairerList)
        });
        break;
      case 4:
        this.setData({
          avatars: this.handleDataJson(this.data.insurancerList)
        });
        break;
      default:
        this.setData({
          avatars: []
        });
    }

    this.claculateTop();
  },

  claculateTop() {
    const page = this;
    this.data.avatars.forEach((item) => {
      if (!item.enabled) return;
      (function(_item) {
        const query = wx.createSelectorQuery();
        const id = _item.id === '#' ? 'all' : item.id;
        query.select('#' + id).boundingClientRect((res) => {
          if (res) _item.top = res.top - 285;
          page.avatars = page.data.avatars;
        }).exec();
      })(item);
    });
  },

  switchLetter(e) {
    const {
      avatars
    } = this;
    const id = e.currentTarget.dataset.id;
    let avatar = this.data.avatars.find((o) => o.id === id);
    if (!avatar || !avatar.top === undefined) return;
    let tmp = {
      current: id
    };
    if (avatar.top !== undefined) {
      tmp.to = avatar.top + 285;
    }
    this.setData(tmp);
  },

  whenScroll(e) {
    let cur = 'A';
    const {
      avatars,
      data
    } = this;
    const {
      current
    } = data;
    let len = this.data.avatars.length;

    while (len >= 0) {
      len--;
      let avatar = this.data.avatars[len];

      if (avatar) {
        if (avatar.top !== undefined && avatar.top <= e.detail.scrollTop) {
          cur = avatar.id;
          break;
        }
      }
    }
    if (current === cur) return;
    this.setData({
      current: cur
    });
  },

  //分类处理
  hanleMailListType: function(ev) {
    let type = Number(ev.currentTarget.dataset.type);
    this.setData({
      nowType: type
    });
    this.handleFilterTyoe(this.data.nowType);
  },

  //拨打电话
  handleCallTelNunber: function(ev) {
    let telNumber = ev.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: telNumber
    })
  },

  //搜索
  handleSearch: function() {
    console.log(324);
    this.getStoreListData();
  },

  //监听输入值
  handleSearchValue: function(e) {
    // console.log(e.detail.value);
    this.setData({
      searchInpVal: e.detail.value
    });
  }

});