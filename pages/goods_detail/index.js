// pages/goods_detail/index.js
import {request} from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj:{}
    },

    GoodsInfo:{},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        const {goods_id} = options
        this.getGoodsDetail(goods_id)
    },


    /* 获取商品详情 */
    async  getGoodsDetail(goods_id){
        const res = await request({url:'/goods/detail',data:{goods_id}})
        this.GoodsInfo = res.data.message
        this.setData({
            goodsObj:{
                goods_name:res.data.message.goods_name,
                pics:res.data.message.pics,
                goods_price:res.data.message.goods_price,
                goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
            }
        })
    },

    /* 点击预览图片 */
    handlePrevewImage(e){
        const urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
        // 接收传递的index
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
          })
    },

    /* 加入购物车 */
    handleCartAdd(){
        // 获取缓存中的购物车 数组
        let cart = wx.getStorageSync('cart') || [];
        // 判断 商品对象是否存在于购物车数组中
        let index  = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
        if(index === -1){
            // 不存在
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo)  
        }else{
            cart[index].num++;
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})