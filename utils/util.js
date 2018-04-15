/** 
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */ 
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      } 
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

function catchError(ex) {
  if(ex.notRealError)
  {
    console.log(ex)
  }
}

module.exports = {
  wxPromisify: wxPromisify,
  catchError: catchError,
  noRealError: { noRealError: true }
}