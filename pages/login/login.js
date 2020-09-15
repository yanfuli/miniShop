// pages/zhuce/zhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindForm: function (e) {
    console.log(e)
    let that = this;
    let data = {
      passwordlogin: e.detail.value.password,
      usernamelogin: e.detail.value.username,
      method: 3,
      uid: '',
    }
    console.log(data)
    getApp().Coca.http_post('api/apiedit.php', data, function (e) {
      console.log(e)
      if (e.data.code == 200) {
        getApp().Coca.setStorageSync('uid',e.data.data)
        getApp().Coca.toast(e.data.msg);
        wx.reLaunch({
          url: '/pages/index/index',
        })
      } else {
        getApp().Coca.toast(e.data.msg)
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