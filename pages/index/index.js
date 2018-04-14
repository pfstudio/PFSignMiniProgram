//index.js
var api = require('../../utils/api.js')
//获取应用实例
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
      api.signIn(this.data.name, this.data.studentId)
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