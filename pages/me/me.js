// pages/me/me.js
//获取应用实例
const app = getApp()
var touch = require('../../utils/touch.js')
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
  },
  //触摸监听开始
  touchStart: function (e) {
    touch.touch_Start(e);
  },
  //监听触摸方向,dir表示触摸方向,1代表触摸向左,2代表向右
  touchMove: function (e) {
    var dir = touch.touch_Move(e);
    if (dir == 2) {
      wx.switchTab({
        url: '../detail/detail',
      })
    }
  },
})
