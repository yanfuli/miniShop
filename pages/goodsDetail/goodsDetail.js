// pages/goodsDetail/goodsDetail.js
// var WxParse = require('../../libs/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:1,
    imgUrl: getApp().data.domainImg,
    coloridx:0,
    biidx:0,
    banidx:0,
    num:1,
    current:0,
    ii:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id:options.id,
      tid:options.tid
    })
    that.getData();
  },
  // 页面数据
  getData: function () {
    let that = this;
    var data = {
      cid:6,
      tid:that.data.tid,
      id:that.data.id,
      uid: getApp().Coca.getStorageSync('uid'),
    }
    console.log(data)
    getApp().Coca.http_post('api/apigoodsshow.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        let content = e.data.goodsshow.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;transform: scale(1,1)"').replace('/uploads/', that.data.imgUrl + 'uploads/')
        let table = e.data.goodsshow.descriptionaa.replace(/\<table class="MsoNormalTable" style="width:415.25pt;"/gi, '<table class="MsoNormalTable" style="width:750rpx;height:auto;display:block; overflow:hidden;"')
        if (e.data.goodsshow.attrstrinfo.length > 0 && e.data.goodsshow.attrstrinfo[0].attrnameinfo) {
          var arr = e.data.goodsshow.attrstrinfo.map(item => item.attrnameinfo)
          console.log(arr)
          if(arr[0]){
            if (arr[0][0].indexOf('|')!=-1){
              var colorArr = arr[0][0].split('|')
              var colortitle = colorArr[0]
            }else{
              var colorArr = [];
              var colortitle = ''
            }
            
            that.setData({
              colorArr: colorArr,
              colortitle: colortitle,
            })
          }
          if(arr[1]){
            if (arr[1][0].indexOf('|')!=-1) {
              var bijianArr = arr[1][0].split('|')
              var bijiantitle = bijianArr[0]
            } else {
              var bijianArr = [];
              var bijiantitle = ''
            }
            that.setData({
              bijiantitle: bijianArr,
              bijiantitle: bijiantitle
            })
          }
        }
        if (e.data.goodsshow.attrstr){
          if (e.data.goodsshow.attrstr.indexOf(',')!=-1){
            var color = e.data.goodsshow.attrstr.split(',')[0];
            var bijian = e.data.goodsshow.attrstr.split(',')[1];
            var colorNum = color.split('"=>')[0].split('("')[1]
            var bijianNum = bijian.split('"')[1];
            that.setData({
              colorNum: colorNum,
              bijianNum: bijianNum,
            })
          }else{
            var colorNum = e.data.goodsshow.attrstr.split('"=>')[0].split('("')[1];
            that.setData({
              colorNum: colorNum,
            })
          }
        }
        that.setData({
          allData: e.data,          
          table: table,
          img: content,
          zfps: e.data.zfps,          
          expval: e.data.memberinfo.expval
        })
      }
    })
  },
  // 获取swiper  current
  getCurrent(e){
    let that = this;
    that.setData({
      current: e.detail.current
    })
  },
  bindTab:function(e){
    let that = this;
    let idx = e.currentTarget.dataset.idx;
    that.setData({
      idx:idx
    })
  },
  // 选择颜色
  selectColor:function(e){
    let that = this;
    that.setData({
      coloridx: e.currentTarget.dataset.coloridx,
      colortitle: e.currentTarget.dataset.title,
    })
  },
  selectban: function (e) {
    let that = this;
    that.setData({
      tid: e.currentTarget.dataset.gourl.tid,
      id: e.currentTarget.dataset.gourl.id,
      banidx: e.currentTarget.dataset.banidx,
      bantitle: e.currentTarget.dataset.title
    })
    that.getData();
  },
  selectBijian(e){
    let that = this;
    that.setData({
      biidx: e.currentTarget.dataset.biidx,
      bititle: e.currentTarget.dataset.title
    })
  },
  // 收藏
  addCollection:function(){
    let that = this;
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method:2,
      aid:that.data.id
    }
    getApp().Coca.http_post('api/apifavorite.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.toast(e.data.msg)
      }
    })
  },
  // 点击加减
  jia: function (e) {
    let that = this;
    let num = e.currentTarget.dataset.num;
    num++
    that.setData({
      num: num
    })
  },
  jian: function (e) {
    let that = this;
    let num = e.currentTarget.dataset.num;
    if (num > 1) {
      num--
    }
    that.setData({
      num: num
    })
  },
  // 加入购物车
  addCar:function(){
    let that = this;
    var attr = {};
    var colorNum = that.data.colorNum;
    attr[colorNum] = that.data.colortitle
    if(that.data.bijianNum){
      var bijianNum = that.data.bijianNum;
      attr[bijianNum] = that.data.bijiantitle
    }
    
    console.log(attr)
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 2,
      goodsid: that.data.id,
      tid:that.data.tid,
      buynum:that.data.num,
      attr: JSON.stringify(attr),
    }
    console.log(data)

    getApp().Coca.http_post('api/apishoppingcar.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.toast(e.data.msg)
      }
    })
  },
  // 立即购买
  liji(){
    let that = this;
    var attr = {};
    var colorNum = that.data.colorNum;
    attr[colorNum] = that.data.colortitle
    if (that.data.bijianNum) {
      var bijianNum = that.data.bijianNum;
      attr[bijianNum] = that.data.bijiantitle
    }
    console.log(attr)
    var data = {
      uid: getApp().Coca.getStorageSync('uid'),
      method: 2,
      goodsid: that.data.id,
      tid: that.data.tid,
      buynum: that.data.num,
      attr: JSON.stringify(attr),
    }
    console.log(data)

    getApp().Coca.http_post('api/apishoppingcar.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        getApp().Coca.tishi('确定', '商品成功放入购物车', function () {
          wx.switchTab({
            url: '/pages/shoppingCar/shoppingCar',
          })
        })
      }
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
  goShouye(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 点击图片
  tap(e){
    let that = this;
    let tapi = e.currentTarget.dataset.tapi
    let ii;
    let content;
    if (tapi==1){
      content = that.data.allData.goodsshow.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;transform: scale(1.2,1.2)"').replace('/uploads/', that.data.imgUrl + 'uploads/')
      ii = 1
    } else if (tapi == 2){
      content = that.data.allData.goodsshow.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;transform: scale(1.4,1.4)"').replace('/uploads/', that.data.imgUrl + 'uploads/')
      ii = 2
    }else{
      content = that.data.allData.goodsshow.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;transform: scale(1,1)"').replace('/uploads/', that.data.imgUrl + 'uploads/')
      ii = 0
    }
    
    that.setData({
      img: content,
      ii:ii,
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