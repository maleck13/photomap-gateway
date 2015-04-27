var config = require('../../configuration');
module.exports = function authenticate(req,res,next){
  var authClient = require('../../clients/authenticate')(config.getAuthenticationService());
  authClient.validate({"cookie":req.header("cookie")},function (err,response,body,status){
    console.log("response from validate ", err, body, status);
    if(err) {
      err.status = status;
      res.status(status).json({"error":"unauthenticated"});
    }else{
      req.user = JSON.parse(body);
      next();
    }
  });

};
