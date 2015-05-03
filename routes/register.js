var config = require('../configuration');


module.exports = function register (req,res,next){
  var serviceConfig = config.getAuthenticationService();
  var authenticateClient = require('../clients/authenticate')(serviceConfig);

  var userName = req.body.userName;
  var pass = req.body.password;
  authenticateClient.createAuthentication(userName,pass,function registerDone(err,response, resp,status){
    if(err){
      return res.status(status).end(JSON.stringify(resp));
    }
    return res.status(status).json(resp);
  });
};
