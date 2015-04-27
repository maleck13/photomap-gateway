var config = require('../configuration');

module.exports = function logout (req,res,next){

  var serviceConfig = config.getAuthenticationService();
  var authenticateClient = require('../clients/authenticate')(serviceConfig);
  authenticateClient.invalidate(req.headers, function authComplete(err,response,resp, status){
    if(err){
      return res.status(status).header(response.headers).end(JSON.stringify(err));
    }
    return res.status(status).header(response.headers).json(resp);
  });
};
