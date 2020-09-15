// pages/search/search.js
let page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: getApp().data.domainImg,
    cid: '',
    tid: '',
    pid: '',
    aaa: '',
    order: '',
    keyword: '',
    liulanUp:true,
    guanzhuUp:true,
    priceUp:true,
    kucunUp:true
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
      cid:that.data.cid,
      tid: that.data.tid,
      pid: that.data.pid,
      aaa: that.data.aaa,
      order: that.data.order,
      keyword: that.data.keyword,
      uid: getApp().Coca.getStorageSync('uid'),
      page:''
    }
    console.log(data)
    getApp().Coca.http_post('api/apisearch.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        that.setData({
          hotlist:e.data.hotlist,
          goodslist: e.data.goodslist,
          val:''
        })

      }
    })
  },
  // 点击浏览
  liulan(e){
    let that = this;
    that.setData({
      liulanUp:!that.data.liulanUp,
      order: e.currentTarget.dataset.order,
      idx: e.currentTarget.dataset.idx
    })
    if (that.data.liulanUp==true){
      that.setData({
        aaa:2,
      })
    }else{
      that.setData({
        aaa: 1,
      })
    }
    that.getData();
  },
  // 点击关注
  guanzhu(e) {
    let that = this;
    that.setData({
      guanzhuUp: !that.data.guanzhuUp,
      order: e.currentTarget.dataset.order,
      idx: e.currentTarget.dataset.idx
    })
    if (that.data.guanzhuUp == true) {
      that.setData({
        aaa: 2,
      })
    } else {
      that.setData({
        aaa: 1,
      })
    }
    that.getData();
  },
  // 点击价格
  jiage(e) {
    let that = this;
    that.setData({
      priceUp: !that.data.priceUp,
      order: e.currentTarget.dataset.order,
      idx: e.currentTarget.dataset.idx
    })
    if (that.data.priceUp == true) {
      that.setData({
        aaa: 2,
      })
    } else {
      that.setData({
        aaa: 1,
      })
    }
    that.getData();
  },
  // 点击库存
  kucun(e) {
    let that = this;
    that.setData({
      kucunUp: !that.data.kucunUp,
      order: e.currentTarget.dataset.order,
      idx: e.currentTarget.dataset.idx
    })
    if (that.data.kucunUp == true) {
      that.setData({
        aaa: 2,
      })
    } else {
      that.setData({
        aaa: 1,
      })
    }
    that.getData();
  },

  // 点击热门
  bindHot:function(e){
    let that = this;
    that.setData({
      keyword: e.currentTarget.dataset.keyword
    })
    that.getData();
  },
  // 输入框
  getValue:function(e){
    let that = this;
    that.setData({
      val: e.detail.value
    })
  },
  // 点击搜索
  bindSearch:function(){
    let that = this;
    that.setData({
      keyword:that.data.val
    })
    that.getData();
  },
  // 点击取消
  quxiao:function(){
    let that = this;
    that.setData({
      val: ''
    })
    that.getData();
  },
  // 点击商品
  goDetail: function (e) {
    let that = this;
    var idArr;
    if (getApp().Coca.getStorageSync('idArr')) {
      idArr = getApp().Coca.getStorageSync('idArr')
    } else {
      idArr = []
    }
    if (!idArr.includes(e.currentTarget.dataset.id)) {
      getApp().Coca.setStorageSync('idArr', idArr.concat(e.currentTarget.dataset.id))
    }
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.id + '&tid=' + e.currentTarget.dataset.tid,
    })
  },
  // 登录
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goMessage() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/message/message',
      })
    }
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