import wepy from 'wepy'
import { service } from '../config'

async function _requestGET(url, obj) {
  let res
  try {
    res = await wepy.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: obj
    })
  } catch (error) {
    throw '网络错误'
  }

  if (res.statusCode == 200) {
    return res.data
  } else {
    console.log(res)
    throw '服务器异常'
  }
}

async function signIn(studentId, name) {
  let res
  try {
    res = await wepy.request({
      url: service.signInUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        studentId: studentId,
        name: name
      }
    })
  } catch (error) {
    throw '网络错误'
  }

  if (!res.data.result) {
    throw res.data.message
  }
}

async function signOut(studentId) {
  let res
  try {
    res = await wepy.request({
      url: service.signOutUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        studentId: studentId
      }
    })
  } catch (error) {
    throw '网络错误'
  }
  
  if (!res.data.result) {
    throw res.data.message
  }
}

export default {
  signIn, signOut,
  query: obj =>
    _requestGET(service.queryUrl, obj),
  reportAll: obj =>
    _requestGET(service.reportUrl, obj),
  reportPerson: (studentId, obj) =>
    _requestGET(`${service.reportUrl}/${studentId}`, obj),
  reportPersonDetail: (studentId, obj) =>
    _requestGET(`${service.reportUrl}/${studentId || '0'}/detail`, obj)
}