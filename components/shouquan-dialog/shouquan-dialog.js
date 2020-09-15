// components/shouquan-dialog/shouquan-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value:'弹窗标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    btnOk: {
      type: String,
      value: '确认弹窗'
    },
    uid:{
      type: String,
      value: 'default value',

    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      console.log(this.data.uid)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDailog:function(){
      var that = this;
      that.setData({
        isShow: false
      })
    },
    hidDailog:function(){
      var that = this;
      that.setData({
        isShow: true
      })
    },
    customMethod() {
      console.log(uid)
    },
    // 获取用户信息
    getUserInfo: function(e) {
      var that = this;
      that.setData({
        isShow: true
      })
      if (e.detail.userInfo) {
        wx.login({
          success(res) {
            // that.requestLogin(res.code, e.detail.userInfo)
            var userInfo = e.detail.userInfo;
            that.triggerEvent("success", { userInfo });
          },
          fail(res){
            that.showPopup();
          }
        })
      }
    },
    //获取用户openid 
    requestLogin: function (code, userInfo) {
      var that = this;
      var data = {
        code: code,
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        uid: that.data.uid
      }
      console.log(data)
      getApp().Coca.http_post("Auth/login", data, function (e) {
        if (e.code == 200) {
          console.log(e)
          if (e.data.id != null && e.data.id != undefined && e.data.id != '') {
            var user = e.data;
            user.userInfo = userInfo;
            user.code = code
            that.triggerEvent("success", { user });
          } else {
            that.showPopup();
          }
        } else {
          getApp().Coca.toast(e.message)
        }
      })
    },

  }
})
