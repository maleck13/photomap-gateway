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
        if(ok.statusCode == 401){
          return callback({"status":401,"message":"unauthorised"});
        }
        callback(err, ok);
      });
    }
  ],function (err, ok){
    if(err){
      res.status(err.status).end(err);
    }else {
      fileClient.getFile(res, user, file);
    }
  });
};
