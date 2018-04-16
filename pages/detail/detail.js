// pages/detail/detail.js
var api = require('../../utils/api.js')
var touch = require('../../utils/touch.js')
Page({
  data: {
    // 保存签到记录
    records: []
  },
  // 第一次加载时刷新
  onLoad: function (options) {
    let that = this
    api.query()
      .then(data =>
        that.setData({ records: data })
      )
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    let that = this
    api.query()
      .then(data => 
        that.setData({ records: data })
      )
    wx.stopPullDownRefresh()
  },
  //触摸监听开始
  touchStart: function (e) {
    touch.touch_Start(e);
  },
  //监听触摸方向,dir表示触摸方向,1代表触摸向左,2代表向右
  touchMove: function (e) {
    var dir = touch.touch_Move(e);
    if (dir == 1) {
      wx.switchTab({
        url: '../me/me',
      })
    }
    if (dir == 2){
      wx.switchTab({
        url: '../index/index',
      })
    }
  },
})