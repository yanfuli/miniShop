// pages/jiesuan/jiesuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huodao:'现金结算',
    peisong:'平台配送',
    huoFlag:false,
    peiFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      totalprice: options.totalprice
    })
    that.setData({
      truename:getApp().Coca.getStorageSync('truename'),
      telephone:getApp().Coca.getStorageSync('telephone'),
      address: getApp().Coca.getStorageSync('address')
    })
  },
  bindShowHuo() {
    let that = this;
    that.setData({
      huoFlag: !this.data.huoFlag
    })
  },
  bindHuo(e) {
    let that = this;
    var name = e.currentTarget.dataset.name
    that.setData({
      huodao: name,
      huoFlag: false
    })
  },
  bindShowPei() {
    let that = this;
    that.setData({
      peiFlag: !this.data.peiFlag
    })
  },
  bindPei(e) {
    let that = this;
    var name = e.currentTarget.dataset.name
    that.setData({
      peisong: name,
      peiFlag: false
    })
  },
  // 提交
  formSub(e) {
    var that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      truename: e.detail.value.truename,
      telephone: e.detail.value.telephone,
      address: e.detail.value.address,
      paymode: that.data.huodao,
      getmode: that.data.peisong,
      buyremark: e.detail.value.buyremark,
    }
    console.log(data)
    getApp().Coca.http_post('api/apiorder.php', data, function (data) {
      console.log(data)
      if (data.statusCode == 200) {
        getApp().Coca.setStorageSync('truename', e.detail.value.truename)
        getApp().Coca.setStorageSync('telephone', e.detail.value.telephone)
        getApp().Coca.setStorageSync('address', e.detail.value.address)
        wx.switchTab({
          url: '/pages/shoppingCar/shoppingCar',
        })
      }
    })
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