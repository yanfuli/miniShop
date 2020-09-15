// pages/shoppingCar/shoppingCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: getApp().data.domainImg,
    uid: getApp().Coca.getStorageSync('uid')
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
    } else {
      that.getData();
    }
  },
  // 页面数据
  getData: function () {
    var that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 1
    }
    console.log(data)
    getApp().Coca.http_post('api/apishoppingcar.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        that.setData({
          goodslist: e.data.goodsshow,
          totalprice: e.data.totalprice,
        })
        console.log(that.data.goodslist)
      }
    })
  },
  // 点击加减
  jia:function(e){
    let that = this;
    let num = e.currentTarget.dataset.item[1];
    let goodsid = e.currentTarget.dataset.item.goodslist.id;
    let tid = e.currentTarget.dataset.item.goodslist.typeid;
    let attr = e.currentTarget.dataset.item[2]
    console.log(attr)
    num++
    that.setData({
      num:1,
      tid:tid,
      goodsid: goodsid,
      attr: attr
    })
    that.addCar();
  },
  jian: function (e) {
    let that = this;
    console.log(e)
    let num = e.currentTarget.dataset.item[1];
    let goodsid = e.currentTarget.dataset.item.goodslist.id;
    let tid = e.currentTarget.dataset.item.goodslist.typeid;
    let attr = e.currentTarget.dataset.item[2]
    console.log(num)
    if(num>1){
      that.setData({
        num: '-1',
        tid: tid,
        goodsid: goodsid,
        attr: attr
      })
      that.addCar();
    }
  },
  addCar: function () {
    let that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 2,
      goodsid: that.data.goodsid,
      tid: that.data.tid,
      buynum: that.data.num,
      attr: JSON.stringify(that.data.attr),
    }
    console.log(data)

    getApp().Coca.http_post('api/apishoppingcar.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.toast(e.data.msg)
        that.getData();
      }
    })
  },
  // 删除
  delGoods: function (e) {
    // getApp().Coca.alert('取消','确定', '确定要删除吗', function () {
      let that = this;
      let data = {
        uid: getApp().Coca.getStorageSync('uid'),
        method: 3,
        key:e.currentTarget.dataset.key
      }
      console.log(data)
      getApp().Coca.http_post('api/apishoppingcar.php', data, function (e) {
        console.log(e)
        if (e.data.code == 200) {
          that.getData();
        }else{
          getApp().Coca.toast(e.data.msg)
        }
      })
    // })
  },
  goJisuan(){
    wx.navigateTo({
      url: '/pages/jiesuan/jiesuan?totalprice=' + this.data.totalprice,
    })
  },
  // 点击商品
  goDetail: function (e) {
    let that = this;
    if (!that.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
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
    this.getData();
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