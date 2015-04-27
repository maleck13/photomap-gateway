var config = require('../configuration');

module.exports = function login (req,res,next){
  var user,pass;
  user = req.body.userid;
  pass = req.body.password;
  var serviceConfig = config.getAuthenticationService();
  var authenticateClient = require('../clients/authenticate')(serviceConfig);
  authenticateClient.authenticateUserAndPass(user,pass, function authComplete(err,response,resp, status){
    if(err){
      return res.status(status).end(JSON.stringify(err));
    }
    return res.status(status).header(response.headers).json(resp);
  });
};