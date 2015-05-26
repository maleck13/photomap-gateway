var config = require('../configuration');
var async = require('async');
module.exports = function uploadFile(req,res,next){

  console.log("authorise is ", config.getAuthorisationService());
  var serviceConfig = config.getFileService();
  var fileClient = require('../clients/files')(serviceConfig);
  var authoriseClient = require('../clients/authorise')(config.getAuthorisationService());
  var user = req.user.userid;

  async.waterfall([
    function upload(callback){
      fileClient.upload(req,user,function uploadDone(err,response, body,status){
        callback(err,status,body);
      });
    }
  ], function (err, status,response){
    if(err){
      res.status(status).json(err);
    }
    else{
      //add some authorisation
      response = JSON.parse(response);
      console.log("response from upload ", response)
      authoriseClient.addAuthorisation(user,response.FileId,"read:write", function (err, ok, body){
        if(err) return res.status(500).json(err);
        res.json(response);
      });

    }
  });


};

