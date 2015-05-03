var config = require('../../configuration');
module.exports = function authenticate(req,res,next){
  var authClient = require('../../clients/authenticate')(config.getAuthenticationService());
  if(req.query.userid && req.query.sessid){
    console.log("checking query params");
    authClient.validateParams(req.query.userid,req.query.sessid,response)
  }else {
    authClient.validate(req.headers, response);
  }
  function response (err, response, body, status) {
    console.log("response from validate ", err, body, status);
    if (err || status == 401) {
      err.status = status;
      res.status(status).json({"error": "unauthenticated"});
    } else {
      req.user = JSON.parse(body);
      next();
    }
  }
};


