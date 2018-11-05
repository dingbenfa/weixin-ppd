// pages/categoryList/categoryList.js
var App = getApp();
import categoryData from '../../data/category';

Page({
  data: {
    categoryTitle: "",
    categoryList: [],
    nowCategoryShowList:[]
  },
  onLoad: function(options) {
    this.setData({
      categoryList: this.handleCategoryActive(categoryData)
    });
  },
  handleCategoryActive(arr){
    arr = arr || [];
    for(var i=0;i<arr.length;i++){
      if(i==0){
        arr[i].active = true;
        this.setCategoryTitle(arr[i].categoryName, arr[i].goodsList);
      }else{
        arr[i].active = false;
      }
    }
    return arr;
  },
  setCategoryTitle(title,arr){
    this.setData({
      categoryTitle: title,
      nowCategoryShowList: arr
    });
  },
  //展示分类详情
  handleCategoryShow(ev){
    var categoryId= ev.currentTarget.dataset.categoryid;
    var categoryList = this.data.categoryList;
    for(var i=0;i<categoryList.length;i++){
      if (categoryId == categoryList[i].id){
        this.setCategoryActive(categoryId);
        this.setCategoryTitle(categoryList[i].categoryName, categoryList[i].goodsList);
        break;
      }
    }
  },
  //设置分类全部未选中
  setCategoryActive(id){
    var categoryList = this.data.categoryList;
    for (var i = 0; i < categoryList.length; i++) {
      if (id==categoryList[i].id){
          categoryList[i].active = true;
        }else{
          categoryList[i].active = false;
        }
    }

    this.setData({
      categoryList: categoryList
    });
  },
  //进入商品详情
  handleToGoDetails(ev){
    var goodsId = ev.currentTarget.dataset.goodsid;
    console.log(goodsId);
    // wx.navigateTo({
    //   url: 'test?id=' + goodsId
    // });
  }
  //动态设置标题
  // handleNavigationBarTitle(){
  //   var id = this.data.id;
  //   var arr = indexData.categoryList;
  //   for(var i=0;i<arr.length;i++){
  //     if(arr[i].id==id){
  //         this.setData({
  //           title: arr[i].name
  //         });
  //         break;
  //     }
  //   }

  //   wx.setNavigationBarTitle({
  //     title: this.data.title
  //   });
  // }
})