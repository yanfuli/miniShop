Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: getApp().data.domainImg,
    idx:0,
    pid:1,
    tid:'',
    uid: getApp().Coca.getStorageSync('uid')
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
    }
    getApp().Coca.http_post('api/apiindex.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {     
        that.setData({
          allData: e.data,
        })
      }
    })
  },
  // 点击tab商品分类
  bindType:function(e){
    let that = this;
    that.setData({
      idx:e.currentTarget.dataset.idx,
      pid: e.currentTarget.dataset.id
    })
  },
  // 点击商品
  goDetail:function(e){
    let that = this;
    if (!that.data.uid) { 
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    }else{
    var idArr;
    if (getApp().Coca.getStorageSync('idArr')) {
      idArr = getApp().Coca.getStorageSync('idArr')
    }else{
      idArr = []
    }
    if (!idArr.includes(e.currentTarget.dataset.id)){
      getApp().Coca.setStorageSync('idArr', idArr.concat(e.currentTarget.dataset.id))
    }
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.id + '&tid=' + e.currentTarget.dataset.tid,
    })
    }
  },
  // 登录
  goLogin(){
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
  // 跳转到我的页面
  goWode(){
    wx.switchTab({
      url: '/pages/personalCenter/personalCenter',
    })
  },
  // 页面跳转
  goClassify(){
    if(!this.data.uid){
      getApp().Coca.alert('取消', '确定', '请先登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    }else{
      wx.switchTab({
        url: '/pages/classify/classify',
      })
    }
  },
  goNewTui(){
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/newGoodsTui/newGoodsTui',
      })
    }
  },
  goZhuce(){
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },
  goNewSu() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/newGoodsSu/newGoodsSu',
      })
    }
  },
  goHistory() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/browsHistory/browsHistory',
      })
    }
  },
  goCollection() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/myCollection/myCollection',
      })
    }
  },
  goTishi() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/tishi/tishi',
      })
    }
  },
  goLiucheng() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/liucheng/liucheng',
      })
    }
  },
  goPeisong() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/distribution/distribution',
      })
    }
  },
  goJiesuan() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/settlement/settlement',
      })
    }
  },
  goOrder() {
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/myOrder/myOrder',
      })
    }
  },
  // 点击退出
  tuichu(){
    getApp().Coca.setStorageSync('uid','')
    this.setData({
      uid: getApp().Coca.getStorageSync('uid')
    })
  },
  // 点击搜索
  goSearch(){
    if (!this.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  },
  goClassList(){
    let that = this;
    if (!that.data.uid) {
      getApp().Coca.alert('取消', '确定', '请先登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    } else {
      
      wx.navigateTo({
        url: "/pages/classList/classList?tid="+that.data.tid + "&pid="+that.data.pid + "&tidx="+that.data.idx,
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
    this.setData({
      uid: getApp().Coca.getStorageSync('uid')
    })
    console.log(getApp().Coca.getStorageSync('uid'))
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