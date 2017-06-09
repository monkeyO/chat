
var app = getApp()
var util = require("../../utils/util.js");
Page({
  data: {
    list: [
      {
        id: "1",
        name: "流程管理",
        toggle: true,
        num: "",
        apphref: "./pro/pro",
        src: "/images/infor/icon_zcdb.png"
      },
      {
        id: "2",
        name: "单任务代办",
        toggle: true,
        num: "",
        apphref: "./single/single",
        src: "/images/infor/icon_bydk.png"
      },
      {
        id: "3",
        name: "垫付费用",
        toggle: true,
        num: "",
        apphref:"./fee/fee",
        src: "/images/infor/icon_drdb.png"
      },
      {
        id: "",
        name: "代理记账费",
        toggle: true,
        num: "",
        apphref: "./keep/keep",
        src: "/images/infor/icon_byys.png"
      },
      {
        id: "5",
        name: "报税管理",
        toggle: true,
        num: "",
        apphref:"./tax/tax",
        src: "/images/infor/icon_bysk.png"
      }
    ]
  },
  onLoad: function () {
    var that = this;
        var getorder_option = {
          url: '/b/api/pubuser/sysPublicUser/appPanel',
          params: {},
          callback:function(res){
                 var Data=res.data;  
                  that.setData({ //流程管理
                        'list[0].num': Data.oacount
                   })
                  that.setData({ //单任务
                        'list[1].num': Data.singlecount
                   })
                  that.setData({ //垫付费用
                        'list[2].num': Data.feecount
                   }) 
                  that.setData({ //代理记账费
                        'list[3].num': Data.feecount
                   }) 
                  that.setData({ //报税管理
                        'list[4].num': Data.feecount
                   })                    
              }
          }
   var getorder_ = {
      url: '/b/api/SSO/testxcxLogin?phone=17096851239',
      params: {},
      callback: function (json) {
       var Token = json.data.token;
       try {
          wx.setStorageSync('TokenInfo', Token);
           util.callrequest(getorder_option);
           } catch (e) {    
          }
       }
    }
    try {
      var value = wx.getStorageSync('TokenInfo')
       if (value) {
             util.callrequest(getorder_option);
         }else{
             util.loginrequest(getorder_);
         }
      } catch (e) {
       
       }
     }
})
