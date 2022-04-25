const mysql = require("mysql");
const bodyparser = require("body-parser");
const logger = require('./logger/logger');
const express = require("express");
const apiRouter = express();
apiRouter.use(bodyparser.json());
const environment = process.env.ENVIRONMENT;


let envPath = './environments/.env-dev';


if (environment === 'test') {
  envPath = './environments/.env-test';
} else if (environment === 'production') {
  envPath = './environments/.env-prod';
}else if (environment === 'development') {
  envPath = './environments/.env-dev';
}


require('dotenv').config({ path: envPath });


const port = process.env.PORT || 3000;



var mysqlConnection = mysql.createConnection({
  host: process.env.DB_CONNECTION_STR,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("DB connection success");
  } else {
    console.log("DB connection failed", JSON.stringify(err, undefined, 2));
  }
});



// NPM

apiRouter.get("/", function(req, res) {
  logger.info("default route");
  res.send("App works!!!!!");
})

apiRouter.use("/api", require("./routes/routes"));

apiRouter.listen(port, (err) => {
  if (err) {
    logger.error('Error::', err);
  }
  logger.info(`running server on from port:::::::${port}`);
});

apiRouter.get("*", function(req, res) {
  logger.info("wordtypes route");
  res.send("App works!!!!!");
})


