var dbcon = require("../config/db_connection");
var connection = dbcon.getConnection();


var connection;

function handleDisconnect() {
  connection = dbcon.getConnection(); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

var express = require("express");
var router = express.Router();


router.get("/delete/:name",(req,res) => {
    const  strname = '"'+String(req.params.name)+'"';
    console.log("DELETE FROM spec WHERE mobiles="+strname)
    connection.query("DELETE FROM spec WHERE mobiles="+strname,(err,records,fields) => {
        if(err){
            console.error("Error while deleting data");
        }
        else{
            res.send("success");
        }
    })
})
router.post("/add/",(req,res) => {
    // {
    //     "mobiles": "Demophone3",
    //     "Link": "www.google.com",
    //     "design": 7,
    //     "display": 7,
    //     "software": 7,
    //     "performance": 7,
    //     "battery_life": 7,
    //     "camera": 7,
    //     "value_for_money": 7,
    //     "b_price": 6969
    //   }
    mobiles='"'+req.body.mobiles+'"'
    link='"'+req.body.Link+'"'
    console.log("INSERT INTO `spec` (`mobiles`, `Link`, `design`, `display`, `software`, `performance`, `battery_life`, `camera`, `value_for_money`, `b_Price`) VALUES ("+mobiles+", "+link+", "+req.body.design+","+req.body.display+","+req.body.software+","+req.body.performance+","+req.body.battery_life+","+req.body.camera+","+req.body.value_for_money+","+req.body.b_price+")")
    connection.query("INSERT INTO `spec` (`mobiles`, `Link`, `design`, `display`, `software`, `performance`, `battery_life`, `camera`, `value_for_money`, `b_Price`) VALUES ("+mobiles+", "+link+", "+req.body.design+","+req.body.display+","+req.body.software+","+req.body.performance+","+req.body.battery_life+","+req.body.camera+","+req.body.value_for_money+","+req.body.b_price+")",(err,records,fields) => {
        if(err){
            console.error("Error while inserting data");
        }
        else{
            res.send("Success");
        }
    })
})

module.exports = router;