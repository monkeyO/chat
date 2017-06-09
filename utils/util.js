//信息初始化
// function clearParams(){
//    pageNo=1;
//    pageSize=30;
// }
//公用调用
function callrequest(options) {
  try {
    var value = wx.getStorageSync('TokenInfo')
    if (value) {
      options.params['token'] = value;
      wx.request({
        url: 'https://www.csyom.com' + options.url,
        header: {
          'content-type': 'application/json'
        },
        data: options.params,
        dataType: 'json',
        success: function (res) {
          if (res.data.code != "0") {
            wx.showToast({
              title: '请求超时!',
              icon: 'loading',
              duration: 1500,
              success: function () {
                 wx.redirectTo({
                   url: '/pages/validate'
                 })
              }
            })
            try {
              wx.removeStorageSync('TokenInfo')
            } catch (e) {
            }
          } else {
            if (options.callback) {
              options.callback(res);
            }
          }
        },
        fail: function () {

        }
      })
    }
  } catch (e) {

  }
};
//登录调用
function loginrequest(options) {
  wx.request({
    method: "POST",
    url: 'https://www.csyom.com' + options.url,
    header: {
      'content-type': 'application/json'
    },
    dataType: 'json',
    success: function (res) {
      if (options.callback) {
        options.callback(res);
      }
    },
    fail: function () {
      wx.showToast({
        title: '请求超时!',
        icon: 'loading',
        duration: 1500,
        success: function () {
           wx.redirectTo({
                url: '/pages/validate'
           })
        }
      })
      try {
        wx.removeStorageSync('TokenInfo')
      } catch (e) {
      }
    }
  })
};
//消息页面权限
function checkPer(perInfo) {
  var res = wx.getStorageSync('getPerInfo');
  var allperInfo = res.permission;
  if (allperInfo && allperInfo.indexOf(perInfo) >= 0) {
    return true;
  } else {
    return false;
  }
}
//头部信息下拉
function menuInfo(options) {
  var res = wx.getStorageSync('getPerInfo');
  var params = options.params;
  var Datas = res.menuInfo[params];
  if (options.callback) {
    options.callback(Datas);
  }
}
module.exports = {
  callrequest: callrequest,
  loginrequest: loginrequest,
  checkPer: checkPer,
  menuInfo: menuInfo
}
