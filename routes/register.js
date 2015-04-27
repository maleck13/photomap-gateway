var config = require('../configuration');


module.exports = function register (req,res,next){
  var serviceConfig = config.getAuthenticationService();
  var authenticateClient = require('../clients/authenticate')(serviceConfig);
  console.log("request body ", req.body);
  var userName = req.body.userid;
  var pass = req.body.password;
  authenticateClient.createAuthentication(userName,pass,function registerDone(err,response, resp,status){
    if(err){
      return res.status(status).end(JSON.stringify(err));
    }
    return res.status(status).json(resp);
  });
};
