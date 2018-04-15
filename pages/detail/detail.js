// pages/detail/detail.js
var api = require('../../utils/api.js')

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
  }
})