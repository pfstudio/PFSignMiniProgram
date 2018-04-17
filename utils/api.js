var config = require('../config.js')
const buttonColor = config.buttonColor

// 签到
function signIn(studentId, name) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.service.signInUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        "Name": name,
        "StudentId": studentId
      },
      success: res => {
        if (res.data.result) {
          resolve()
        }
        else {
          reject(res.data.message)
        }
      },
      fail: () =>
        reject('网络错误')
    })
  })
  .then(() => wx.showToast({ title: '签到成功' }))
  .catch(error => 
    wx.showModal({
      title: '签到失败',
      content: error,
      showCancel: false,
      confirmColor: buttonColor
    })
  )
}

// 签退
function signOut(studentId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.service.signOutUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        "StudentId": studentId
      },
      success: res => {
        if (res.data.result) {
          resolve()
        }
        else {
          reject(res.data.message)
        }
      },
      fail: () => 
        reject('网络错误')
    })
  })
  .then(() => wx.showToast({ title: '签退成功' }))
  .catch(error => 
    wx.showModal({
      title: '签退失败',
      content: error,
      showCancel: false,
      confirmColor: buttonColor
    })
  )
}

// 查询
function query(obj) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.service.queryUrl,
      method: 'GET',
      dataType: 'json',
      data: obj,
      success: res => {
        if (res.statusCode == 200) {
          resolve(res.data)
        }
        else {
          reject('服务器异常')
        }
      },
      fail: () =>
        reject('网络异常')
    })
  })
}

module.exports = {
  signIn: signIn,
  signOut: signOut,
  query: query
}