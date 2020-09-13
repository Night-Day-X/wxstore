let ajaxTime = 0
export const request = (params) => {
    ajaxTime++
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject) => {
        wx.showLoading({
            title: '加载中',
          })
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(res) => {
                resolve(res)
            },
            fail:(err) => {
                reject(err)
            },
            complete:()=>{
                ajaxTime--
                if(ajaxTime===0){
                    wx.hideLoading()
                }
            }
        })
    })
}