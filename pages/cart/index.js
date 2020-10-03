// pages/cart/index.js
import { getSetting,openSetting,chooseAddress } from '../../utils/wx'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0

    },

    // 点击收货地址
    async handleChooseAddress(){
        try {
            // 获取用户权限  scope.address: true
            const result = await getSetting()
            const scopeAddress = result.authSetting["scope.address"]
            if(scopeAddress === false){
                // 诱导用户打开授权页面
                await openSetting()
            }
            const address = await chooseAddress()
            address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
            wx.setStorageSync('address', address);
        } catch (error) {
            console.log(error);
        }
    },

    handleItemChange(e){
        const goods_id = e.currentTarget.dataset.id;
        // 获取购物车数组
        let {cart} = this.data;
        // 找到被修改的商品
        let index  = cart.findIndex(v => v.goods_id===goods_id);
        // 选中取反
        cart[index].checked = !cart[index].checked;

        this.setCart(cart);

    },


    // 设置购物车状态 同时重新计算底部状态栏数据
    setCart(cart){
        let allChecked = true;
        // 1.总价格 总数量
        let totalPrice= 0;
        let totalNum = 0;
        cart.forEach(v=>{
            if(v.checked){
                totalPrice += v.num*v.goods_price;
                totalNum += v.num;
            }else{
                allChecked = false;
            }
        })
        // 判断数组是否为空
        allChecked  = cart.length!= 0 ? allChecked :false;
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync('cart', cart);
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        //1、获取缓存中的收货地址
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync('cart') || [];
        // 计算全选
        //every 数组方法 会遍历 会接收一个回调函数，那么 每一个回调函数都会返回true 那么 every方法的返回值为true
        // 只要有一个回调函数返回了false 那么不再循环执行，直接返回false
        // 空数组 调用every 返回值就是true
        // const allChecked = cart.length? cart.every(v => v.checked):false;
        this.setData({address})
        this.setCart(cart);

        // 1、获取缓存中的数据


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