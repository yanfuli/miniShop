// pages/myMessage/myMessage.js
let page = 1;
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
    let that = this;
    that.getData();
  },
  // 页面数据
  getData: function () {
    var that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 2,
      page:page
    }
    console.log(data)
    getApp().Coca.http_post('api/apimessage.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        that.setData({
          allData: e.data.goodslist
        })
      }
    })
  },
  getCheck: function (e) {
    let that = this;
    that.setData({
      idstr: e.detail.value
    })
  },
  // 删除
  delMess: function () {
    let that = this;
    var data = {
      method: 3,
      uid: getApp().Coca.getStorageSync('uid'),
      idstr: that.data.idstr,
    }
    console.log(data)
    getApp().Coca.http_post('api/apimessage.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.toast(e.data.msg)
        that.getData();
      }
    })
  },
  allSelect: function () {
    let that = this;
    let allData = that.data.allData;
    allData.map(item => item.checkinfo = 'true');
    console.log(allData)
    let idstr = allData.map(item => item.id);
    that.setData({
      allData: allData,
      idstr: idstr
    })
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