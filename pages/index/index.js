//index.js
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
          
          console.log(res)
          console.log(pf_latitude)
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