var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
//index.js
var touch = require('../../utils/touch.js')
var api = require('../../utils/api.js')
//获取应用实例
//工作室所在维度
var pf_latitude = 30.316
//工作室所在经度
var pf_longitude = 120.338
const app = getApp()
Page({
  data: {
    name: '毛寅滔',
    studentId: '16073120',
    hasInfo: false
  },
  onShow: function() {
    this.setData({
      name: wx.getStorageSync('name'),
      studentId: wx.getStorageSync('studentId')
    })
    if (this.data.studentId && this.data.name) {
      this.setData({hasInfo: true})
      console.log('hasInfo True')
    } 
  },
    // 触摸开始事件 
  touchStart: function(e)
  {
    touch.touch_Start(e);
  },
  //监听触摸方向,dir表示触摸方向,1代表触摸向左,2代表向右
  touchMove:function(e)
  {
    var dir = touch.touch_Move(e);
    if (dir==1)
    {
      wx.switchTab({
        url: '../detail/detail',
      })
    }
  },
  //监听触摸结束事件
  touchEnd:function(e)
  {
    touch.touch_End(e);
  },
  signIn: function() {
    var that=this
      if(!this.data.hasInfo) {
        console.log('no info')
        wx.showModal({
          title: '未绑定的用户',
          content: '请先到绑定页面进行绑定',
          showCancel: false,
          success: () =>
            wx.navigateTo({ url: '../me/me' })
        })
      }
      else {
        wx.getLocation({
          success: function(res) {
            if (Math.abs(res.latitude-pf_latitude)>0.0005 || Math.abs(res.longitude-pf_longitude)>0.0005)
            {
              wx.showModal({
                title: 'Warning!',
                content: '检测到你未在攀峰工作室登录',
                success:function(res)
                {
                  api.signIn(that.data.name, that.data.studentId)
                }
              })
            }
            else
              api.signIn(that.data.name, that.data.studentId)
          },
        })
      }
  },
  signOut: function() {
    if(!this.data.hasInfo) {
      wx.showModal({
        title: '未绑定的用户',
        content: '请先到绑定页面进行绑定',
        showCancel: false,
        success: () =>
          wx.navigateTo({ url: '../me/me' })
      })  
    }
    else {
      api.signOut(this.data.studentId)
    }
  },
    bindInfo: () =>
      wx.navigateTo({url: '../me/me'})
})