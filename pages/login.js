var app = getApp();
var util = require("../utils/util.js");
Page({
  data: {
    motto: '财务之家',
    userName: "",
    userPassword: "",
    id_token: "",
    response: ""
  },
  onLoad: function () {   //初始化加载
    wx.getStorage({
      key: 'loginInfo',
      success: function (res) {
        if (res.data.success) {
          wx.switchTab({
            url: '/pages/infor/index',
            success: function (res) {
            }
          })
        }
      }
    })
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPassworldInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  loginIn: function () {
    var that = this;
    var userName = that.data.userName;
    var userPassword = that.data.userPassword;
    var option = {
      url: '/a/api/sys/user/getPerInfo',
      params: {},
      callback: function (json) {
        var Data = json.data;
        var fastMenu = JSON.stringify(Data.fastMenu);
        if (json.data.renderstatus) {
            wx.setStorageSync('getPerInfo',Data);
                wx.switchTab({
                url: '/pages/infor/index',
                success: function (res) {
                 
                }
              })
        }
      }
    };
    var getorder_option = {
      url: '/a/login?username=' + userName + '&password=' + userPassword + '&logintype=1',
      params: "",
      callback: function (json) {
        var Data = json.data;
        wx.setStorage({
          key: 'loginInfo',
          data: Data,
          success: function (res) {
            util.callrequest(option);
          }
        })

      }
    }
    util.loginrequest(getorder_option);
  }
})