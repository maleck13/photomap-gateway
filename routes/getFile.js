var config = require('../configuration');
var async = require('async');
module.exports = function getFile(req,res,next){

  var serviceConfig = config.getFileService();
  var fileClient = require('../clients/files')(serviceConfig);
  var authoriseClient = require('../clients/authorise')(config.getAuthorisationService());
  var user = req.user.userid;
  var file = req.query.file;
  async.series([
    function(callback){
      authoriseClient.checkAuthorisation(user,file,"read",function(err,ok,body){
        console.log("ok ", ok.statusCode);
        if(ok.statusCode == 401){
          return callback({"status":401,"message":"unauthorised"});
        }
        callback(err, ok);
      });
    }
  ],function (err, ok){
    console.log("error ", err);
    if(err){
      res.status(err.status).json(err);
    }else {
      fileClient.getFile(res, user, file);
    }
  });
  //fileClient.getFile(res,user,file);

};
