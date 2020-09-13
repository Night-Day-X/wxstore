//Page Object
import {request} from '../../request/index.js'
Page({
  data: {
        //轮播数组
        swiperList: [],
  },
  //options(Object)
  onLoad: function (options) {
    // 异步请求轮播图
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },

  // 获取轮播
  async getSwiperList(){
    const res  = await request({url:'/home/swiperdata'})
    this.setData({
      swiperList:res.data.message
    })
  },

  // 获取导航
  async getNavList(){
    const res = await request({url:'/home/catitems'})
    console.log(res);
    this.setData({
      navList:res.data.message
    })
  },

  // 获取 楼层
  async getFloorList(){
    const res = await request({url:'/home/floordata'})
    console.log(res);
    this.setData({
      floorList:res.data.message
    })
  }
 
});