// pages/updatePsw/updatePsw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    imgUrl: getApp().data.domainImg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getData();
  },
  // 页面数据
  getData: function () {
    var that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 1
    }
    console.log(data)
    getApp().Coca.http_post('api/apiedit.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        that.setData({
          allData: e.data.memberinfo
        })
      }
    })
  },
  // 提交
  formSubmit: function (e) {
    console.log(e)
    let that = this;
    let data = {
      repassword: e.detail.value.repassword,
      password: e.detail.value.password,
      oldpassword: e.detail.value.oldpassword,
      method: 2,
      uid: getApp().Coca.getStorageSync('uid')
    }
    console.log(data)
    getApp().Coca.http_post('api/apiedit.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.toast(e.data.msg);
        wx.reLaunch({
          url: '/pages/personalCenter/personalCenter',
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