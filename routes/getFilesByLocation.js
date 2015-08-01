var config = require('../configuration');
var async = require('async');
module.exports = function getFilesInRange(req,res,next){
    var serviceConfig = config.getFileService();
    var fileClient = require('../clients/files')(serviceConfig);
    var user = req.user.userid;
    var lon = req.params.lon;
    var lat = req.params.lat;
    var dist = req.params.dist;
    fileClient.getFilesByLocation(user,lon,lat,dist, function (err,resp,body,status){
        res.status(status).end(body);
    });
};
