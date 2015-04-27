var request = require('request');

module.exports = function (serviceConfig){
  function commonCallback(err,res,body,cb){
    var status = res && res.statusCode || 500;
    if(! err && (status && status >= 400)){
      err = {};
    }
    if(err)return cb(err,res,body,status);
    else{
      return cb(undefined,res,body,status);
    }
  }
  return{
    "authenticateUserAndPass": function (userName,pass, cb){
      var payload = {"userid":userName,"password":pass};
      var url = serviceConfig.host + "/authentication/validate";
      request({"url":url,"json":payload,"method":"post"},function(err,res,body){


        commonCallback(err,res,body,cb);
      });

    },
    "validate": function (headers, cb){
      var url = serviceConfig.host + "/authentication/validate";
      console.log("calling url ", url);
      request({"url":url,"headers":headers,"method":"post"},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    },
    "invalidate": function (headers, cb){
      var url = serviceConfig.host + "/authentication/invalidate";
      request({"url":url,"method":"post","headers":headers},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    },
    "createAuthentication" : function (userName,pass, cb){
      var payload = {"userid":userName,"password":pass};
      console.log("creating auth ", payload);
      var url = serviceConfig.host + "/authentication";
      request({"url":url,"json":payload,"method":"post"},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    },
    "deleteAuthentication" : function (userName){

    }
  };
};