var request = require('request');
var moment = require('moment');

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
        commonCallback(err,resp,body,cb);
      });
    },
    "getFilesInRange": function(user,from, to ,cb){
      var url = serviceConfig.host + "/pictures/?user="+user+"&from="+from+"&to="+to;
      request({"url":url,"method":"get"}, function(err, resp, body){
        commonCallback(err,resp,body,cb);
      });
    },
    "getIncompletePics" : function (user, cb){
      var url = serviceConfig.host + "/pictures/incomplete?user="+user;
      request({"url":url,"method":"get"}, function(err, resp, body){
        commonCallback(err,resp,body,cb);
      });
    },
    "getFilesByLocation": function (user, lon,lat,dist,cb){
      var url = serviceConfig.host + "/pictures/byloc?user="+user+"&lon="+lon+"&lat="+lat+"&dist="+dist;
      request({"url":url,"method":"get"},function(err,resp,body){
        commonCallback(err,resp,body,cb);
      });
    },
    "getFilesByTags": function(user,tag, cb){
      var url = serviceConfig.host + "/pictures/bytag?user="+user+"&tag="+tag;
      console.log("calling url ", url);
      request({"url":url,"method":"get"},function(err,resp,body){
        commonCallback(err,resp,body,cb);
      });
    },
    "updatePictureMeta": function (id,user,data,cb){
      var url = serviceConfig.host + "/picture/" + id;

      var payload = {};
      if(data.name){
        payload.Name = data.name;
      }
      if(data.time){
        payload.Time = moment(data.time * 1000).utc().format();
      }
      if(Array.isArray(data.location)){
        payload.LonLat = [];
        for(var i=0; i < data.location.length; i++){
          payload.LonLat.push(parseFloat(data.location[i],5));
        }
      }
      if(data.tags){
        payload.Tags = data.tags;
      }
      if(data.year){
        payload.Year = data.year;
      }
      if(data.complete){
        payload.Complete = data.complete;
      }
      payload.User = user;
      console.log("update picture meta ", url, payload);
      request({"url":url,"method":"put","json":true,"body":payload}, function(err, resp, body){
        commonCallback(err,resp,body,cb);
      });
    }

  };
};
