require('./configuration');
var app = require('express')();



app.use(require('body-parser')())
  .use(require('cors')());



var authMiddleware = require('./routes/middleware/authenticate');


app.post("/login", require('./routes/login'));
app.post("/register",require('./routes/register'));
app.post("/logout",require('./routes/logout'));
app.post("/file/upload",authMiddleware,require('./routes/uploadFile'));
app.get("/picture/range",authMiddleware, require('./routes/getRange'));
app.get("/picture",authMiddleware, require('./routes/getFile'));
app.get("/health",function(req,res){
  res.json({"health":"ok"});
});

app.listen(8080);