const express = require('express');
const logger = require('../logger/logger');
const bodyparser = require("body-parser");
const apiRouter = express();


const mysql = require("mysql");




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


//Get all word types
apiRouter.get("/wordtypes", (req, res) => {
    mysqlConnection.query("SELECT * FROM word_types", (err, rows, fields) => {
      if (!err) res.send(rows);
      else   logger.info( err);
    });
  });
  
  //Get an wordtype
  apiRouter.get("/wordtypes/:id", (req, res) => {
    mysqlConnection.query(
      "SELECT * FROM word_types_values WHERE ID_WORD_TYPES_FK = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else 
        logger.info( err);
      
      }
    );
  });

    //Get an wordtype
    apiRouter.get("/wordsentense", (req, res) => {
      mysqlConnection.query(
        "SELECT * FROM dynamic_sentence ",
        [req.params.id],
        (err, rows, fields) => {
          if (!err) res.send(rows);
          else 
          logger.info( err);
        
        }
      );
    });

    //Get an wordtype
    apiRouter.get("/wordsentense/:id", (req, res) => {
      mysqlConnection.query(
        "SELECT * FROM dynamic_sentence where ID_DYNAMIC_SENTENCE = ?",
        [req.params.id],
        (err, rows, fields) => {
          if (!err) res.send(rows);
          else 
          logger.info( err);
        
        }
      );
    });
  //Delete an wordtypes
  apiRouter.delete("/wordtypes/:id", (req, res) => {
    mysqlConnection.query(
      "DELETE FROM dynamic_sentence WHERE id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send("Deleted successfully.");
        else   logger.info( err);
      }
    );
  });
  
  //Insert an wordtypes
  apiRouter.post("/wordtypes", (req, res) => {
    let wordtype = req.body;

    var sql = "SET @id = ?;SET @name = ?; \
    CALL addwpordsentense(@id,@name);";
    mysqlConnection.query(sql, [wordtype.id, wordtype.sentense], (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            res.send("Inserted wordtypes id : " + element[0].id);
        });
      else   logger.info( err);
    });
  });


  //Update an wordtypes
  apiRouter.put("/wordtypes", (req, res) => {
    let wordtype = req.body;
    var sql = "SET @id = ?;SET @name = ?; \
      CALL addwpordsentense(@id,@name);";
    mysqlConnection.query(sql, [wordtype.id, wordtype.sentense], (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else   logger.info( err);
    });
  });
  

  module.exports = apiRouter;