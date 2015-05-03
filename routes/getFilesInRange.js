var config = require('../configuration');
var async = require('async');
module.exports = function getFilesInRange(req,res,next){
  var serviceConfig = config.getFileService();
  var fileClient = require('../clients/files')(serviceConfig);
  var user = req.user.userid;
  var from = req.params.from;
  var to = req.params.to;
  fileClient.getFilesInRange(user,from,to, function (err,resp,body,status){
    res.status(status).end(body);
  });
};