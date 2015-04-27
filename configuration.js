// will come from etcd in time
var confLoc = process.env.CONF;
var fs =  require('fs');
console.log(process.cwd());
if(! confLoc || ! fs.existsSync(confLoc)){
  console.log("no configuration at " + confLoc, fs.existsSync(confLoc));
  process.exit(1);
}
var config = require(confLoc);

var authServices = null;
var authserviceIndex = 0;

var fileServices = null;
var fileServiceIndex = 0;

var permsServices = null;
var permsServiceIndex = 0;

module.exports ={
  getAuthenticationService: function(){
    if(null == authServices) {
      authServices = Object.keys(config.services.authenticate);
    }
    if(authServices.length -1 <= authserviceIndex){
      authserviceIndex =0;
    }
    var sKey = authServices[0];
    var nService = config.services.authenticate[sKey];
    authserviceIndex++;
    return nService;
  },
  "getFileService": function (){
    if(null == fileServices) {
      fileServices = Object.keys(config.services.files);
    }
    if(fileServices.length -1 <= fileServiceIndex){
      fileServiceIndex =0;
    }
    var sKey = fileServices[0];
    var nService = config.services.files[sKey];
    fileServiceIndex++;
    return nService;

  },
  "getAuthorisationService": function (){
    if(null == permsServices) {
      permsServices = Object.keys(config.services.authorise);
    }
    if(permsServices.length -1 <= permsServiceIndex){
        permsServiceIndex =0;
    }

    var sKey = permsServices[0];
    var nService = config.services.authorise[sKey];
    permsServiceIndex++;
    return nService;

  }
};