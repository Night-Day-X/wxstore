// pages/goods_list/index.js
import {request} from '../../request/index'
/* 
 总页数 = Math.ceil（总条数 除以 页容量）
*/
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:0,
                value:"价格",
                isActive:false
            },
        ],
        goodsList:[]
    },

    // 接口参数
    QueryPaiams:{ 
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },

    /* 总页数  初始值：1*/
    allPages:1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryPaiams.cid = options.cid;
        this.getGoodList()
    },
    handleTabsItemChange(e){
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({tabs})
    },

    // 获取商品列表数据
    async getGoodList(){
        const res  = await request({url:'/goods/search',data:this.QueryPaiams})
        const total = res.data.message.total;
        this.allPages = Math.ceil(total/this.QueryPaiams.pagesize)
        this.setData({
            goodsList:[...this.data.goodsList,...res.data.message.goods]
        })
        wx.stopPullDownRefresh()
    },

    // 触底
    onReachBottom(){
        if(this.QueryPaiams.pagenum>=this.allPages){
            wx.showToast({title:'没有下一页数据了'})
        }else{
            this.QueryPaiams.pagenum++
            this.getGoodList()
        }
    },
    onPullDownRefresh () {
        this.setData({
            goodsList:[]
        })
        this.QueryPaiams.pagenum = 1
        this.getGoodList()
    }
})