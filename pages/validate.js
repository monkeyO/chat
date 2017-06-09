var app = getApp();
var util = require("../utils/util.js");
Page({
    data: {
        userName: "",
        userTel: "",
        valCode: "",
        disabled: false,
        code: "获取验证码"
    },
    onLoad: function (options) {

    },
    userNameInput: function (e) {
        this.setData({
            userName: e.detail.value
        })
    },
    userTelInput: function (e) {
        this.setData({
            userTel: e.detail.value
        })
    },
    valCodeInput: function () {
        this.setData({
            valCode: e.detail.value
        })
    },
    getCode: function () {
        var that = this;
        var userName = that.data.userName;
        var userTel = that.data.userTel;
        if (userTel == "" || !(/^1[34578]\d{9}$/.test(userTel))) {
            wx.showToast({
                title: '请确定手机号!',
                image: '../images/error.png',
                duration: 1000
            })
        } else {
            var nums = 60;
            var clock = '';
            clock = setInterval(doLoop, 1000);
            function doLoop() {
                nums--;
                if (nums > 0) {
                    that.setData({
                        disabled: true,
                        code: nums + "秒"
                    })
                } else {
                    clearInterval(clock);
                    that.setData({
                        disabled: false,
                        code: "获取验证码"
                    })
                    nums = 60;
                }
            }
            var options = {
                url: '/b/api/SSO/sendsmsCode',
                userTel: userTel,
                callback: function (json) {
                    debugger
                }
            };
            that.pagePublic(options);
        }
    },
    goBtn: function () {
        if (userName == "") {
            wx.showToast({
                title: '姓名不能为空!',
                image: '../images/error.png',
                duration: 1000
            })
        } else if (userTel == "") {
            wx.showToast({
                title: '请确定手机号!',
                image: '../images/error.png',
                duration: 1000
            })
        } else if (valCode == "") {
            wx.showToast({
                title: '请输入验证码!',
                image: '../images/error.png',
                duration: 1000
            })
        } else {
            var getorder_option = {
                url: '/b/api/SSO/saveuser',
                params: {
                    name: userName,
                    phone: userTel,
                    valCode: valCode
                },
                callback: function (json) {
                    if (json.data.renderstatus) {
                        wx.switchTab({
                            url: '/pages/infor/index'
                        })
                    }
                }
            };
            util.callrequest(getorder_option);
        }
    },
    //当前页面调用
    pagePublic: function (options) {
        var that = this;
        var getorder_option = {
            url: options.url,
            params: {
                phone: options.userTel
            },
            callback: function (json) {
                if (options.callback) {
                    options.callback(json);
                }
            }
        };
        util.callrequest(getorder_option);
    }
})