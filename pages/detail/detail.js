// pages/detail/detail.js
var api = require('../../utils/api.js')
var util = require('../../utils/util.js')

Page({
  data: {
    // 保存签到记录
    records: [],
    date: util.formatDate(new Date())
  },
  // 第一次加载时刷新
  onLoad: function (options) {
    let that = this
    api.query({begin: this.data.date})
      .then(data =>
        that.setData({ records: data })
      )
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('Refresh')
    let that = this
    api.query({begin: this.data.date})
      .then(data => 
        that.setData({ records: data })
      )
    wx.stopPullDownRefresh()
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.startPullDownRefresh()
  }
})