// pages/customerService/customerService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: getApp().Coca.getStorageSync('uid'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (!getApp().Coca.getStorageSync('uid')) {
      getApp().Coca.tishi('确定', '请先登录', function () {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      })
    }
  },
  // 登录
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goMessage() {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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