var app = getApp()
var util = require("../../../utils/util.js");
var nums=0;
var ID;
Page({
  data:{
     infoData:"",
     toggle:"",
     Id:""
  },
   widgetsToggle:function(e){
       var that =this;
       var Id=e.currentTarget.id; 
       if(that.data.toggle==Id){
          that.setData({
             toggle: ""
           });      
       }else{
          that.setData({
             toggle: Id
           });    
       }    
   }, 
  onLoad:function(option){
      var that =this; 
       nums=0;
       ID=option.id;
       var options={
              url:'/b/api/pubuser/sysPublicUser/taxmonthlist',
              callback:function(json){
                debugger
                  var Data= json.data.list;
                   that.setData({
                        infoData: Data
                     });
                  for(let i=0;i<Data.length;i++){
                    that.insertPublic(Data[i].id,Data.length);
                   } 
                  } 
         }  
      that.pagePublic(options);
  },
  onPullDownRefresh:function(){//下拉
    var that = this;
    nums = 0;
    var options = {
      url: '/b/api/pubuser/sysPublicUser/taxmonthlist',
      callback: function (json) {
        var Data = json.data.list;
        that.setData({
          infoData: Data
        });
        for (let i = 0; i < Data.length; i++) {
          that.insertPublic(Data[i].id, Data.length);
        }
      }
    } 
    that.pagePublic(options);
  },
   //当前页面调用
  pagePublic: function(options) {
      var that = this;
      var getorder_option = {
         url: options.url,
         params: {
           'accCompanyInfo.id': ID
         },
        callback: function (json) {
           if(options.callback){
                options.callback(json);
           } 
       }
    };
     util.callrequest(getorder_option);
  },
     //追加内容
  insertPublic: function (id, num) {
    var result;
    try {
      var value = wx.getStorageSync('TokenInfo');
      if (value) {
        this.fun(id, num, value);
      } else {

      }
    } catch (e) {

    }
  },
  fun: function (id, num, value) {
    var that = this;
    var Data = that.data.infoData;
    if (num <= 0 || !num) {
      return false;
    }
    else {
      var getorder_option = {
        url: '/b/api/pubuser/sysPublicUser/taxmdetaillist',
        params: {
          id: id
        },
        callback: function (res) {
          num--;
          Data.filter(function (currentValue, index, arr) {
            if (currentValue.id == id) {
              currentValue['children'] = res.data.list;
            }
          });
          that.setData({
            infoData: Data
          });
        }
      };
      util.callrequest(getorder_option);
    }
  }
})