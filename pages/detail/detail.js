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
    api.query({begin:'2018-04-16'})
      .then(data => 
        that.setData({ records: data })
      )
    wx.stopPullDownRefresh()
  },
  //触摸监听开始
  touchStart: touch.touchStartFactory(),
  //监听触摸方向
  touchMove: touch.touchMoveFactory({
    left: '../index/index',
    right: '../me/me'
  })
})