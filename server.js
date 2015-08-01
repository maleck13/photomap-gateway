require('./configuration');
var app = require('express')();



app.use(require('body-parser')())
  .use(require('cors')());



var authMiddleware = require('./routes/middleware/authenticate');


app.post("/user/login", require('./routes/login'));
app.post("/user/register",require('./routes/register'));
app.post("/user/logout",require('./routes/logout'));
app.post("/file/upload",authMiddleware,require('./routes/uploadFile'));
app.post("/file/:id",authMiddleware,require('./routes/updateMeta'));

app.get("/pictures/range",authMiddleware, require('./routes/getRange'));
app.get("/pictures/incomplete",authMiddleware, require('./routes/getIncompleteFiles'));
app.get("/pictures/byloc/:lon/:lat/:dist",authMiddleware, require('./routes/getFilesByLocation'));
app.get("/pictures/bytag/:tag",authMiddleware, require('./routes/getFilesByTag'));
app.get("/pictures/:from/:to",authMiddleware,require('./routes/getFilesInRange'));
app.get("/picture",authMiddleware, require('./routes/getFile'));
app.get("/health",function(req,res){
  res.json({"health":"ok"});
});

app.listen(8000);