//index.js

//获取应用实例
var App = getApp();

Page({
  data: {
    imgUrls: [],
    categoryList: [],
    newItemList: [],
    preferenceItemList: [],
    cartNum: 0,
    searchInpVal: ""
  },
  onLoad: function() {
    this.getIndexData();
  },
  onShow() {
    this.setCartsNumber();
  },
  //获取首页数据
  getIndexData() {
    App.HttpService.getHomeInfo()
      .then(res => {
        const data = res.data.responseData;
        // console.log(data)

        console.log(App.globalData)
        
        const topBannerList = this.setImgUrl(data.topBannerList, null, "../../assets/images/timg.jpg");
        const newItemList = this.setImgUrl(data.newItemList, null, "../../assets/images/items.jpg");
        const preferenceItemList = this.setImgUrl(data.preferenceItemList, 3, "../../assets/images/items.jpg");
        this.setData({
          imgUrls: topBannerList,
          categoryList: data.topEntryIconList,
          newItemList: newItemList,
          preferenceItemList: preferenceItemList
        });
      });
  },
  //增加初始数据图片
  setImgUrl(arr, maxLen, imgUrl) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].imageUrl = imgUrl;
    }
    if (maxLen && arr.length > maxLen) {
      arr = arr.slice(0, maxLen);
    }
    return arr;
  },
  //初始化购物车数量
  setCartsNumber() {
    App.HttpService.getCartInfo()
      .then(res => {
        const reData = res.data.responseData;
        // console.log(reData)

        var num = reData.cartItemList.length.toString();
        if (num == "0") {
          wx.removeTabBarBadge({
            index: 2
          });
        } else {
          wx.setTabBarBadge({
            index: 2,
            text: num
          });
        }
      });
  },
  //跳转分类
  goCategoryPage(event) {
    var id = event.currentTarget.dataset.categoryid;
    if (id === 5) { //分类
      wx.navigateTo({
        url: '../categoryList/categoryList?categoryId=' + id
      })
    } else if (id === 10) { //积分
      wx.navigateTo({
        url: '../user/userPoints/index'
      })
    } else if (id === 2) { //社区
      wx.switchTab({
        url: "../community/index"
      });
    } else {
      wx.showModal({
        title: "抱歉！该模块尚未开发",
        showCancel: false
      });
    }
  },
  //跳转详情
  goGoodsDetail(event) {
    var id = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goods/goodsDetails/goodsDetails?id=' + id,
    });
  },
  //加入购物车
  toAddCart(event) {
    var id = event.currentTarget.dataset.goodsid;
    this.data.cartNum++;

    var num = this.data.cartNum.toString();
    wx.setTabBarBadge({
      index: 2,
      text: num
    });
  },
  //处理搜索结果
  handleSearchValue(event) {
    console.log(event.detail.value);

    this.setData({
      searchInpVal: ""
    });
  },
  //打开录音
  openVoice(event) {
    wx.startRecord({
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
      },
      fail: function() {
        console.log("打开录音失败");
      }
    });

    setTimeout(function() {
      wx.stopRecord() // 结束录音
    }, 10000)
  }
})