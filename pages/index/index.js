//index.js
var api = require('../../utils/api.js')
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const pf_latitude  = app.globalData.latitude
const pf_longitude = app.globalData.longitude

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
    } 
  },
  signIn: function() {
    ensureInfo(this.data.hasInfo)
      .then(() => checkLocation())
      .then(() => api.signIn(this.data.studentId, this.data.name))
      .catch(util.catchError)
  },
  signOut: function() {
    api.signOut(this.data.studentId)
  },
  bindInfo: () => {
    wx.navigateTo({url: '../bindInfo/bindInfo'})
  }
})

function ensureInfo(hasInfo) {
  return new Promise((resolve, reject) => {
    if(hasInfo) {
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

function checkLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success: res => {
        console.log(res)
        if (Math.abs(res.latitude - pf_latitude) > 0.0005 || Math.abs(res.longitude - pf_longitude) > 0.0005) {
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