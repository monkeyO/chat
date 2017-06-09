//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '财务之家',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  dropout: function () {
    try {
      wx.clearStorageSync()
    } catch (e) {
      console.log("本地数据清空");
    }
   },
   worklog:function(){ //工作日志
      


   }
})
