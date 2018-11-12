export default {
    "orderNo": 4555555555321313, //订单号
    "orderStime": 12435345435, //订单创建时间
    "orderStatus": 3, //0-待付款 1-待收货 2-待收货 3-已完成 4-已关闭  
    "orderProcess": [{
        "processContent": "您的订单已由本人签收，感谢您在 平平叮购物，欢迎再次光临。",
        "stime": 123321443432,
    }], //订单流转记录
    "address": "上海市青浦区某某路4323弄", //收货地址
    "contacts": "张三", //收货人
    "distributionMode": "快递", //配送方式
    "goodsList": [{
        "id": 111,
        "imgUrl": "../../assets/images/items.jpg",
        "name": "福田康明斯13333333333333",
        "about": "ISF3.8气门锁块",
        "price": 129, //商品型号
        "size": 323, //商品型号
        "color": "黑色", //商品颜色
        "number": 1 //商品件数
    }],
    "orderTotalAmount": 129, //订单总金额
    "discount": [{ //优惠
        "discountMethod": "返现",
        "amount": 10
    }],
    "realPaymentAmount": 119 //实付金额
}