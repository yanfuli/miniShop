// pages/classList/classList.js
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
    pinpai:'',
    tidx:0,
    typeFlag:true,
    liulanUp: true,
    guanzhuUp: true,
    priceUp: true,
    kucunUp: true,
    page:page,
    pageNum:['1','2','3','4','5','6','7']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      pid:options.pid,
      tid:options.tid,
      tidx: options.tidx
    })
    that.getData();
  },
  // 页面数据
  getData: function () {
    var that = this;
    var data = {
      cid: 6,
      tid: that.data.tid,
      pid: that.data.pid,
      aaa: that.data.aaa,
      order: that.data.order,
      pinpai: that.data.pinpai,
      uid: getApp().Coca.getStorageSync('uid'),
      page: page
    }
    console.log(data)
    getApp().Coca.http_post('api/apifenlei.php', data, function (e) {
      console.log(e)
      if (e.statusCode == 200) {
        if (e.data.goodslist){
          that.setData({
            goodslist: e.data.goodslist,
          })
        }else{
          that.setData({
            goodslist: [],
          })
        }
        that.setData({
          goodslist: e.data.goodslist,
          goodstype: e.data.goodstype,
          goodstypelist: e.data.goodstypelist[parseInt(that.data.tidx)],
          pinpainame: e.data.pinpainame,
          fenleiname: e.data.fenleiname,
          maxPage: Math.ceil(e.data.totalnums/24)
        })
      }
    })
  },
  // 点击分页
  getPage(e){
    let that = this;
    page = Number(e.currentTarget.dataset.page);
    console.log(page+1)
    console.log(page)
    that.setData({
      page:page,
      pageIdx:page,
      page1: page + 1,
      page2: page + 2,
      page3: page + 3,
    })
    that.getData();
  },
  // 点击上一页
  goBefore(){
    let that = this;
    if(page>1){
      page--
    }
    that.setData({
      page:page,
      pageIdx: page,
      page1: page + 1,
      page2: page + 2,
      page3: page + 3,
    })
    that.getData()
  },
  // 点击下一页
  goNext(){
    let that = this;
    let maxPage = that.data.maxPage
    if(page<maxPage){
      page++
    }
    that.setData({
      page: page,
      pageIdx: page,
      page1: page + 1,
      page2: page + 2,
      page3: page + 3,
    })
    that.getData()
  },
  // 点击分类
  bindType:function(e){
    let that = this;
    that.setData({
      tidx:e.currentTarget.dataset.tidx,
      typeFlag: !that.data.typeFlag
    })
    that.getData();
  },
  // 点击分类下的项
  bindOption(e){
    let that = this;
    that.setData({
      tid: e.currentTarget.dataset.tid,
      pid: e.currentTarget.dataset.pid,
      typeFlag: true
    })
    that.getData();
  },
  // 点击品牌
  bindPinpai(e){
    let that = this;
    console.log(e)
    that.setData({
      pinpai: e.currentTarget.dataset.ppid,
    })
    that.getData();
  },
  // 点击浏览
  liulan(e) {
    let that = this;
    that.setData({
      liulanUp: !that.data.liulanUp,
      order: e.currentTarget.dataset.order,
      idx: e.currentTarget.dataset.idx
    })
    if (that.data.liulanUp == true) {
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