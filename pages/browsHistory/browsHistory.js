// pages/browsHistory/browsHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    method:1,
    delid:'',
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
      method: that.data.method,
      delid: that.data.delid,
      idstr: JSON.stringify(getApp().Coca.getStorageSync('idArr')),
    }
    console.log(data)
    getApp().Coca.http_post('api/apilishi.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        that.setData({
          allData: e.data.goodslist
        })
      }
    })
  },
  // 商品详情
  goDetail: function (e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.id + '&tid=' + e.currentTarget.dataset.tid,
    })
  },
  // 删除商品
  dindDel:function(e){
    var that = this;
    splice(index, len, [item])
    let idstr = that.data.idstr;
    for (let i = 0; i < idstr.length; i++){
      if (idstr[i] == e.currentTarget.dataset.id){
        idstr.splice(i, 1)
      }
    }
    that.setData({
      delid: e.currentTarget.dataset.id,
      method:2,
      idstr: idstr
    })
    that.getData();
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