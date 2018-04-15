var config = require('../config.js')
// 签到

export function signIn(name, studentId) {
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
        wx.showToast({title: '签到成功'})
      }
      else {
        wx.showModal({
          title: '签到失败',
          content: res.data.message,
          showCancel: false,
          confirmColor: '#3a73f6'
        })
      }
    },
    fail: () =>
      wx.showToast({title: '网络错误', icon: 'none'})
  })
}

// 签退
export function signOut(studentId) {
  wx.request({
    url: config.service.signOutUrl,
    method: 'POST',
    dataType: 'json',
    data: {
      "StudentId": studentId
    },
    success: res => {
      if (res.data.result) {
        wx.showToast({title: '签退成功'})
      }
      else {
        wx.showModal({
          title: '签退失败',
          content: res.data.message,
          showCancel: false,
          confirmColor: '#3a73f6'
        })
      }
    },
    fail: () => 
      wx.showToast({title: '网络错误', icon: 'none'})
  });
}

// 查询
export function refreshRecords(page) {
  wx.showLoading({ title: '加载数据', mask: true})
  wx.request({
    url: config.service.queryUrl,
    method: 'GET',
    dataType: 'json',
    success: res =>
      page.setData({records: res.data}),
    fail: () =>
      wx.showToast({title: '网络错误', icon: 'none'}),
    complete: () => {
      wx.hideLoading()
    }
  });
}