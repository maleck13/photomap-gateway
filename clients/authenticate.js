var request = require('request');
//todo make separate node module
module.exports = function (serviceConfig){
  function commonCallback(err,res,body,cb){
    var status = res && res.statusCode || 500;
    if(! err && (status && status >= 400)){
      err = {"error":"unexpected error"};
    }
    if(err)return cb(err,res,body,status);
    else{
      return cb(undefined,res,body,status);
    }
  }
  var self = {
    "authenticateUserAndPass": function (userName,pass, cb){
      var payload = {"userid":userName,"password":pass};
      var url = serviceConfig.host + "/authentication/validate";
      request({"url":url,"json":payload,"method":"post"},function(err,res,body){
        commonCallback(err,res,body,cb);
      });

    },
    "validate": function (headers, cb){
      var url = serviceConfig.host + "/authentication/validate";
      request({"url":url,"headers":headers,"method":"post"},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    },
    validateParams: function (user,token, cb){
      self.validate({"x-authid":user,"x-auth":token},cb);
    },
    "invalidate": function (headers, cb){
      var url = serviceConfig.host + "/authentication/invalidate";
      request({"url":url,"method":"post","headers":headers},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    },
    "createAuthentication" : function (userName,pass, cb){
      var payload = {"userid":userName,"password":pass};
      var url = serviceConfig.host + "/authentication";
      request({"url":url,"json":payload,"method":"post"},function(err,res,body){
        commonCallback(err,res,body,cb);
      });
    }
  };

  return self;
};