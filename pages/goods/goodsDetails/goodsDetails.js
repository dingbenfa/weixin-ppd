// pages/goods/goodsDetails/goodsDetails.js
// import goodsDetailInfo from '../../../data/goodsDetailsInfo';

//获取应用实例
var App = getApp();

Page({
  data: {
    id: null,
    goodsImgList: [],
    goodsDetailInfo: {},
    indicatorDots: true,
    autoplay: false,
    circular: false,
    atLeastReducePrice: 0,
    goodsEvaluation: [],
    goodsEvaluationLimit: 2,
    fullSubtraction: [],
    goodsPoints: 0,
    isActive: 1, //默认选择商品
    scrollCls: {
      evaluation: 0,
      detail: 0
    },
    toView: "swiperSection",
    animationData: {},
    showModalStatus: false
  },
  onLoad: function(options) {
    this.goods = App.HttpResource('/mobile/home/itemfull', {
      id: '@id'
    });
    this.setData({
      id: options.id
    })
  },
  onShow() {
    this.getGoodsDetail(this.data.id)
  },
  getGoodsDetail(id) {
    // App.HttpService.getOrderDetail(id)
    this.goods.getAsync({
        id: id
      })
      .then(res => {
        const data = res.data.responseData;
        console.log(data)

        let goodsDiscount = data.goodsDiscount || [];
        let goodsPoints = goodsDiscount.length > 0 ? data.goodsDiscount[0].goodsPoints : 0;
        let fullSubtraction = goodsDiscount.length > 0 ? data.goodsDiscount[0].fullSubtraction : [];

        this.setData({
          goodsDetailInfo: data,
          goodsImgList: data.imageUrl,
          goodsEvaluation: data.goodsEvaluation,
          fullSubtraction: fullSubtraction,
          goodsPoints: goodsPoints
        })

        this.handleAtLeastReduce();
      })
  },
  onReady: function() {
    this.queryThePointNodes();
  },
  scroll: function(e) {
    // console.log(e.detail.scrollTop);
    let scrollTopVal = e.detail.scrollTop;
    let evaluationVal = this.data.scrollCls.evaluation;
    let detailVal = this.data.scrollCls.detail;
    if (scrollTopVal > evaluationVal && scrollTopVal < detailVal) {
      this.setData({
        isActive: 2
      });
    } else if (scrollTopVal > detailVal) {
      this.setData({
        isActive: 3
      });
    } else {
      this.setData({
        isActive: 1
      });
    }
  },
  //领券至少可减
  handleAtLeastReduce() {
    let pArr = this.data.fullSubtraction;
    let dArr = [];
    for (let i = 0; i < pArr.length; i++) {
      dArr.push(pArr[i].discount);
    }
    dArr.sort(function(a, b) {
      return a - b;
    });
    let min = dArr[0];

    this.setData({
      atLeastReducePrice: min
    });
  },
  //查看全部评论
  handleLookUpAll() {
    console.log("查看全部评论");

    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  //查看更多评论
  handleLookUpMore() {
    let maxLimit = this.data.goodsEvaluation.length;
    let oldLimit = this.data.goodsEvaluationLimit;
    let etime = 1;
    let newLimit = oldLimit + etime;

    if (newLimit > maxLimit) {
      this.handleLookUpAll();
    } else {
      this.setData({
        goodsEvaluationLimit: newLimit
      });
    }
  },
  //商品详情锚点
  goToPoint(ev) {
    let pType = Number(ev.currentTarget.dataset.pointtype);
    this.setData({
      isActive: pType
    });

    if (pType === 2) {
      this.setData({
        toView: "goodsEvaluation"
      })
    } else if (pType === 3) {
      this.setData({
        toView: "goodsDetail"
      })
    } else {
      this.setData({
        toView: "swiperSection"
      })
    }
  },
  //获取锚点距离顶部高度
  queryThePointNodes() {
    const self = this;

    const query = wx.createSelectorQuery()
    query.select('.m-goods-evaluation').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      let str = "scrollCls.evaluation";
      self.setData({
        [str]: res[0].top - 50
      });
    })

    const queryOther = wx.createSelectorQuery()
    queryOther.select('.m-goods-detail').boundingClientRect()
    queryOther.selectViewport().scrollOffset()
    queryOther.exec(function(res) {
      let str = "scrollCls.detail";
      self.setData({
        [str]: res[0].top - 50
      });
    })
  },
  goToCart(ev) {
    wx.switchTab({
      url: '../../cart/index'
    })
  },
  handleAddCart(ev) {
    wx.showToast({
      title: "加入购物车成功"
    });
  },
  //领券
  openCouponsModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  closeCouponsModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //立即领取优惠券
  getCollectImmediately(ev) {
    wx.showToast({
      title: "领取成功"
    });
  },
  //立即购买
  handleNavagiteToPay(ev) {
    wx.navigateTo({
      url: '../../order/confirm/confirm',
    })
  },
  //客服
  handleNavagiteToServise() {
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  },
  handleOpenChoose() {
    wx.showModal({
      title: "抱歉！该模块尚未开发",
      showCancel: false
    });
  }
})