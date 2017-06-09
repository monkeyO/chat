var app = getApp()
var util = require("../../../utils/util.js");
Page({
  data:{
      infoData:"",
      toggle:""
  },
 widgetsToggle:function(e){
      var that=this;
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
 onLoad:function(options){
           var that =this;
           var options={
              url:'/b/api/pubuser/sysPublicUser/singlelist',
                callback:function(json){
                     var Data= json.data.list;
                     that.setData({
                        infoData: Data
                     });
                  } 
         }  
      that.pagePublic(options);
 },
 onPullDownRefresh:function(){ //下拉
      var that=this;
      var options={
              url:'/b/api/pubuser/sysPublicUser/singlelist',
                callback:function(json){
                     var Data= json.data.list;
                     that.setData({
                        infoData: Data
                     });
                  } 
         }  
      that.pagePublic(options); 
 },
   //当前页面调用
  pagePublic: function(options) {
      var that = this;
      var getorder_option = {
         url: options.url,
         params: {},
        callback: function (json) {
            if(options.callback){
                 options.callback(json);
            }
       }
    };
     util.callrequest(getorder_option);
  }
})