//index.js
var api = require('../../utils/api.js')
var util = require('../../utils/util.js')
var touch = require('../../utils/touch.js')
const config = require('../../config.js')

Page({
  data: {
    name: '',
    studentId: ''
  },
  onShow: function() {
    // 从本地获取Info
    let that = this;
    wx.getStorage({
      key: 'name',
      success: res =>
        that.setData({ name: res.data })
    })
    wx.getStorage({
      key: 'studentId',
      success: res =>
        that.setData({ studentId: res.data })
    })
  },
  signIn: function() {
    ensureInfo(this.data)
      .then(() => checkLocation(config.pfStudio))
      .then(() => api.signIn(this.data.studentId, this.data.name))
      .catch(util.catchError)
  },
  signOut: function() {
    api.signOut(this.data.studentId)
  },
  // 触摸开始事件
  touchStart: touch.touchStartFactory(),
  //监听触摸方向
  touchMove: touch.touchMoveFactory({
    right: '../detail/detail'
  }),
  bindInfo: () => {
    wx.navigateTo({url: '../bindInfo/bindInfo'})
  }
})

function ensureInfo(info) {
  return new Promise((resolve, reject) => {
    if(info.studentId && info.name) {
      resolve()
    }
    else {
      wx.showModal({
        title: '未绑定的用户',
        content: '请先到绑定页面进行绑定',
        showCancel: false,
        success: reject
      })
    }
  })
  .catch(() => {
    wx.navigateTo({url: '../bindInfo/bindInfo'})
    throw util.noRealError
  })
}

function checkLocation(loc) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success: res => {
        console.log(res)
        if (Math.abs(res.latitude - loc.latitude) > 0.0005 || Math.abs(res.longitude - loc.longitude) > 0.0005) {
          wx.showModal({
            title: 'Warning!',
            content: '检测到你未在攀峰工作室登录,或者你手机飘了',
            success: res =>
              res.confirm ? resolve() : reject()
          })
        }
        else {
          resolve()
        }
      },
    })
  })
  .catch(() => {
    wx.showToast({ title: '取消签到', icon: 'none' })
    throw util.noRealError
  })  
}