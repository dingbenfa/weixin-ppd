// pages/goods/goodsDetails/goodsDetails.js
import goodsDetailInfo from '../../../data/goodsDetailsInfo';

Page({
  data: {
    goodsImgList: goodsDetailInfo.imageUrl,
    goodsDetailInfo: goodsDetailInfo,
    indicatorDots: true,
    autoplay: false,
    circular: false,
    atLeastReducePrice: 0,
    goodsEvaluation: goodsDetailInfo.goodsEvaluation,
    goodsEvaluationLimit: 2
  },
  onLoad: function(options) {
    this.handleAtLeastReduce();
  },
  //领券至少可减
  handleAtLeastReduce() {
    let pArr = this.data.goodsDetailInfo.goodsDiscount.fullSubtraction;
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
  handleLookUpAll(){
    console.log("查看全部评论");
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
  }
})