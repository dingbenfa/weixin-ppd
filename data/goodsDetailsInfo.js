export default {
  userPoints: 2334, //用户所有积分
  goodsName: "商品名称商品名称商品名称商品名称商品名称商品名称",
  price: "2999.00",
  commoditySecurity: ["闪电发货/顺丰包邮", "超长质保", "权威质检"], //商品保障
  imageUrl: [
    "../../../assets/images/timg.jpg",
    "../../../assets/images/timg.jpg",
    "../../../assets/images/timg.jpg"
  ],
  goodsDiscount: { //商品优惠
    goodsPoints: 15, //购买可得积分
    fullSubtraction: [ //满减优惠(满30减50)
      {
        "cost": 300,
        "discount": 50,
        "startTime": "2017-05-34", //有效期
        "endTime": "2019-11-12" //有效期
      },
      {
        "cost": 100,
        "discount": 20,
        "startTime": "2017-05-34", //有效期
        "endTime": "2019-11-12" //有效期
      }
    ]
  },
  goodsSpecifications: { //商品信息--规格尺寸品牌等
    "specifications": { // 商品颜色尺寸

    },
    "brand": { //品牌 型号信息

    }
  },
  goodsEvaluation: [ //商品评价
    {
      userName: "用户名称",
      userImg: "../../../assets/images/user.png",
      stime: "18-11-07 15:53",
      content: "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容"
    },
    {
      userName: "用户名称",
      userImg: "../../../assets/images/user.png",
      stime: "18-11-07 15:53",
      content: "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容"
    },
    {
      userName: "用户名称",
      userImg: "../../../assets/images/user.png",
      stime: "18-11-07 15:53",
      content: "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容"
    },
    {
      userName: "用户名称",
      userImg: "../../../assets/images/user.png",
      stime: "18-11-07 15:53",
      content: "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容"
    }
  ],
  goodsContents: "商品详情商品详情商品详情商品详情商品详情商品详情商品详情" //商品详情信息
}