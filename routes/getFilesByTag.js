var config = require('../configuration');
var async = require('async');
module.exports = function getFilesInRange(req,res,next){
  var serviceConfig = config.getFileService();
  var fileClient = require('../clients/files')(serviceConfig);
  var user = req.user.userid;
  var tag = req.params.tag;
  fileClient.getFilesByTags(user,tag, function (err,resp,body,status){
    res.status(status).end(body);
  });
};
