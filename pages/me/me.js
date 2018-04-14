// pages/me/me.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
    studentId: ''
  },
  onLoad: function() {
    let that = this;
    wx.getStorage({
      key: 'name',
      success: res =>
        that.setData({name: res.data})
    })
    wx.getStorage({
      key: 'studentId',
      success: res =>
        that.setData({studentId: res.data})
    })
  },
  saveInfo: function(e) {
    wx.setStorage({
      key: 'name',
      data: e.detail.value.name
    })
    wx.setStorage({
      key: 'studentId',
      data: e.detail.value.studentId,
    })
    wx.navigateBack()
  },
  clearInfo: function(e) {
    let that = this
    wx.removeStorage({
      key: 'name',
      success: res =>
        that.setData({'name': ''})
    })
    wx.removeStorage({
      key: 'studentId',
      success: res =>
        that.setData({'studentId': ''})
    })
  }
})
