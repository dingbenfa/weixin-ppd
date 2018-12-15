// pages/cart/index.js
var App = getApp();

Page({
  data: {
    selected: false,
    amountTotal: 0,
    carts: {
      itemsSel: [],
      items: []
    },
    prompt: {
      hidden: true,
      icon: '../../assets/images/iconfont-cart-empty.png',
      title: '购物车空空如也',
      text: '来挑几件好货吧',
      buttons: [{
        text: '随便逛',
        bindtap: 'bindtap',
      }]
    }
  },
  bindtap(event) {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  onLoad: function(options) {
    App.HttpService.getCartInfo()
      .then(res => {
        const data = res.data.responseData;
        // console.log(data)
        const cartItemList = this.handCartItemList(data.cartItemList);
        this.getCarts(cartItemList);
        this.setCartsNumber();
      });
  },
  handCartItemList(arr) {
    arr = arr || [];
    for (var i = 0; i < arr.length; i++) {
      arr[i].id = i + 1;
      arr[i].number = arr[i].itemQuantity;
      arr[i].selected = false;
      arr[i].price = this.handleSplitPrice(arr[i].itemPrice);
    }

    return arr;
  },
  handleSplitPrice(price) {
    return price.split("￥")[1];
  },
  getCarts(productList) {
    this.setData({
      'carts.items': productList,
      'prompt.hidden': productList.length,
    })
  },
  //初始化购物车数量
  setCartsNumber() {
    var num = this.data.carts.items.length.toString();
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
  },
  //商品数量输入最小值处理
  handleMinValue(event) {
    if (event.detail.value == "" || event.detail.value == "0") {
      var goodsId = event.currentTarget.dataset.goodid;
      var productArr = this.handleChangeSelect(goodsId, "number", 1);
      this.handleCartsItems(productArr);
    }
  },
  //商品数量输入处理
  handleInputValue(event) {
    if (event.detail.value != "") {
      var inpVal = event.detail.value;
      var goodsId = event.currentTarget.dataset.goodid;
      var productArr = this.handleChangeSelect(goodsId, "number", inpVal);
      this.handleCartsItems(productArr);
    }
  },
  //商品数量增减监听 stype 1:数量增加 0:数量减少
  updateGoodsNumber(event) {
    var goodsId = event.currentTarget.dataset.goodid;
    var stype = event.currentTarget.dataset.stype;
    var num = Number(event.currentTarget.dataset.number);
    if (stype == "1") {
      num++;
    } else {
      if (num > 1) num--;
    }
    var productArr = this.handleChangeSelect(goodsId, "number", num);
    this.handleCartsItems(productArr);
  },
  //全选
  handleSelectAll(event) {
    this.setData({
      selected: !this.data.selected
    });

    var productArr = this.handleChangeSelectAll();
    this.handleCartsItems(productArr);
  },
  //更新全选
  handleChangeSelectAll() {
    var productArr = this.data.carts.items;
    for (var i = 0; i < productArr.length; i++) {
      productArr[i].selected = this.data.selected;
    }
    return productArr;
  },
  //选中商品
  handleProductCheck(event) {
    var goodsId = event.currentTarget.dataset.goodsid;
    var productArr = this.handleChangeSelect(goodsId, "selected", "self");
    this.handleCartsItems(productArr);
    this.handleIsAllSelected(); //更新是否全部选中
  },
  //更新已选中数据
  handleChangeSelect(id, name, value) {
    var productArr = this.data.carts.items;
    for (var i = 0; i < productArr.length; i++) {
      if (productArr[i].id == id) {
        if (value === "self") {
          productArr[i][name] = !productArr[i][name];
        } else {
          productArr[i][name] = value;
        }
        break;
      }
    }
    return productArr;
  },
  //更新是否全部选中
  handleIsAllSelected() {
    var goodsSelectedArr = this.getGoodsSelected();
    if (goodsSelectedArr.length == this.data.carts.items.length && this.data.carts.items.length != 0) {
      this.setData({
        selected: true
      });
    } else {
      this.setData({
        selected: false
      });
    }
  },
  //更新购物车数据
  handleCartsItems(arr) {
    var selArr = this.getGoodsSelected();
    this.setData({
      carts: {
        itemsSel: selArr,
        items: arr
      }
    });

    this.handleAmountTotal();
  },
  //获取已选中商品
  getGoodsSelected() {
    var productArr = this.data.carts.items;
    var selectedArr = [];
    for (var i = 0; i < productArr.length; i++) {
      if (productArr[i].selected) {
        selectedArr.push(productArr[i]);
      }
    }
    return selectedArr;
  },
  //总金额计算
  handleAmountTotal() {
    var productArr = this.data.carts.items;
    var amountTotal = 0;
    for (var i = 0; i < productArr.length; i++) {
      if (productArr[i].selected) {
        var p = productArr[i].price * productArr[i].number;
        amountTotal += p;
      }
    };

    this.setData({
      amountTotal: amountTotal
    });
  },
  //删除
  goodsSelectedDel(event) {
    var _this = this;

    var goodsSelArr = this.getGoodsSelected();
    if (goodsSelArr.length > 0) {
      wx.showModal({
        title: '提示',
        content: '你确定删除已选商品么？',
        showCancel: true,
        success: function(res) {
          if (res.confirm) {
            _this.goodsSelectedDelCallback();
          }
        }
      });
    } else {
      wx.showToast({
        title: '请先选择需要删除的商品',
        icon: 'none',
        duration: 1000
      });
    }
  },
  goodsSelectedDelCallback() {
    var productArr = this.data.carts.items;
    var len = productArr.length - 1;
    for (var i = len; i >= 0; i--) {
      if (productArr[i].selected) {
        productArr.splice(i, 1);
      }
    };

    this.handleCartsItems(productArr);
    this.handleIsAllSelected();
    this.setCartsNumber();
  },
  //去结算
  handleNavagiteToCalculation() {
    if (this.data.carts.itemsSel.length > 0) {
      wx.navigateTo({
        url: '../order/confirm/confirm',
      })
    } else {
      wx.showModal({
        title: "抱歉！您尚选择要结算的商品",
        showCancel: false
      });
    }
  }
})