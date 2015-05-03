var request = require('request');
//todo make separate node module
module.exports = function (serviceConfig) {
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
  return{
    "checkAuthorisation":function (user,entity,access,cb){
      var url = serviceConfig.host + "/authorisation/"+ user + "/" + entity + "/" + access;
      request({"url":url,"method":"get"}, function (err, response,body){
        return commonCallback(err,response,body,cb);
      });
    },
    "addAuthorisation": function (user,entity, access, cb){
      var url = serviceConfig.host + "/authorisation";
      var payload = {"userid":user,"entityid":entity,"permission":access};
      request({"url":url,"method":"post","json":payload},function(err, response, body){
        return commonCallback(err,response,body,cb);
      });

    }
  }
};
