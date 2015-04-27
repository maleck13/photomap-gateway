var request = require('request');

module.exports = function (serviceConfig){

  function commonCallback(err, res, body, cb) {
    var status = res && res.statusCode || 500;
    if (err)return cb(err, res,body, status);
    else {
      return cb(undefined, res, body, status);
    }
  }
  return{
    "upload": function (multiPartReq,user, cb){
      multiPartReq.pipe(
        request(serviceConfig.host + "/pictures/" + user + "/upload", function(err, resp, body){
          commonCallback(err,resp, body,cb)
        })
      )
    },
    "getFile" : function(res,user,file){

      request.get(serviceConfig.host + "/pictures/" + user + "/" + file).pipe(res);
    },
    "getFileDateRange" : function(user,cb){
      var url = serviceConfig.host + "/pictures/range?user="+user;
      request({"url":url,"method":"get"}, function(err, resp, body){
        console.log("resp",resp.headers);
        commonCallback(err,resp,body,cb);
      });
    },
    "getFilesInRange": function(from, to ,cb){

    }

  };
};
