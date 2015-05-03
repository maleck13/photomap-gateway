var config = require('../configuration');
var async = require('async');
module.exports = function getRange(req,res,next){
  var serviceConfig = config.getFileService();
  var fileClient = require('../clients/files')(serviceConfig);
  var user = req.user.userid;
  fileClient.getFileDateRange(user, function (err,response,body,status){
    if(err){
      res.status(status).json(JSON.stringify(err));
    }else{
      res.status(status).json(JSON.parse(body));
    }
  });


};
