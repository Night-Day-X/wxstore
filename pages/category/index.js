// pages/category/index.js
import { request } from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList:[],
        rightContent:[],
        currentIndex:0,
        scrollTop:0
    },

    Cates:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**
         * 缓存
         * 判断本地是否有旧的数据
         * 有旧的数据，同时，旧的数据也没有过期，就使用本地存储的旧数据
         */

        // 1获取本地存储数据
        const Cates = wx.getStorageSync('cates');
        if(!Cates){
            this.getCate()
        }else{
            if(Date.now()-Cates.time>1000*100){
                this.getCate()
            }else{
                this.Cates = Cates.data
                let leftMenuList =this.Cates.map((val)=>val.cat_name)
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },

    // 获取分类数据
    async getCate(){
       const res = await request({url:'/categories'})
        this.Cates = res.data.message;
        wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
        let leftMenuList =this.Cates.map((val)=>val.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    // 左点
    /**
     * 点击左侧菜单，右侧显示相应的内容
     */
    handleItemTap(e){
        console.log(e);
        const { index } = e.currentTarget.dataset
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex:index,
            rightContent,
            scrollTop:0    
        })
    }
})