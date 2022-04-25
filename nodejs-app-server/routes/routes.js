var express = require("express"),
    apiRouter = express();


apiRouter.use("/wordtype", require('./wordtype'));

module.exports = apiRouter;