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
  onLoad: function () {
    this.getIndexData();
  },
  onShow() {
    this.setCartsNumber();
  },
  //获取首页数据
  getIndexData(){
    App.HttpService.getHomeInfo()
    .then(res => {
      const data = res.data;
      // console.log(data)
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
  setImgUrl(arr,maxLen,imgUrl){
    for(var i=0;i<arr.length;i++){
      arr[i].imageUrl = imgUrl;
    }
    if (maxLen && arr.length > maxLen){
      arr = arr.slice(0, maxLen);
    }
    return arr;
  },
  //初始化购物车数量
  setCartsNumber() {
    wx.setTabBarBadge({
      index: 2,
      text: "3"
    })
  },
  //跳转分类
  goCategoryPage(event){
    var id = event.currentTarget.dataset.categoryid;
    wx.navigateTo({
      url: '../categoryList/categoryList?categoryId=' + id,
    })
  },
  //跳转详情
  goGoodsDetail(event){
    var id = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: 'index-detail/index-detail?goodsId=' + id,
    })
  },
  //加入购物车
  toAddCart(event){
    var id = event.currentTarget.dataset.goodsid;
    this.data.cartNum++;

    var num = this.data.cartNum.toString();
    wx.setTabBarBadge({
      index: 2,
      text: num
    });
  },
  //处理搜索结果
  handleSearchValue(event){
    console.log(event.detail.value);

    this.setData({
      searchInpVal: ""
    });
  },
  //打开录音
  openVoice(event){
    wx.startRecord({
      success: function (res){
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
      },
      fail: function(){
        console.log("打开录音失败");
      }
    });

    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
  }
})
