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

function takeInput(data,input_obj){
  const param_list=['Design','Display','Software','Performance','Battery','Camera'];
  let user_req=[];
  for(let i=0;i<param_list.length;i++){
      user_req[i]=parseInt(input_obj[param_list[i]]);
  }
  
  
  const priority_ids=['Design_p','Display_p','Software_p','Performance_p','Battery_p','Camera_p'];
  let priority_list=[];
  for(let i=0;i<priority_ids.length;i++){
      priority_list[i]=parseInt(input_obj[priority_ids[i]]);
  }
  
  var user_price=parseInt(input_obj.Price);

  //document.write(parseInt(data[0].design));
  //calculate scores
  for(let i=0;i<data.length;i++){
    // console.log("before");
    // data[i]['Design_diff']=2;
    // console.log(data[i]['Design_diff']);

      data[i]['Design_diff']=(parseInt(data[i].design)-user_req[0])*priority_list[0];
      data[i]['Display_diff']=(parseInt(data[i].display)-user_req[1])*priority_list[1];
      data[i]['Software_diff']=(parseInt(data[i].software)-user_req[2])*priority_list[2];
      data[i]['Performance_diff']=(parseInt(data[i].performance)-user_req[3])*priority_list[3];
      data[i]['Battery_diff']=(parseInt(data[i].battery_life)-user_req[4])*priority_list[4];
      data[i]['Camera_diff']=(parseInt(data[i].camera)-user_req[5])*priority_list[5];

  }
  //add the scores
  for(let i=0;i<data.length;i++){
      data[i]["main_diff"] = data[i].Camera_diff + data[i].Performance_diff + data[i].Display_diff + data[i].Battery_diff + data[i].Software_diff + data[i].Design_diff;
      console.log(data[i]["mobiles"] + " : " + data[i]["main_diff"]);
  }
  //sort mobiles on basis of the scores
  data.sort((a,b)=>b.main_diff-a.main_diff);


  //display the result
  const obj=[];
  obj.push(data[0]);
  obj.push(data[1]);
  
  return obj;
}




handleDisconnect();

var express = require("express");
var router = express.Router();


router.get("/",(req,res) => {
    connection.query("select * from spec",(err,records,fields) => {
        if(err){
            console.error("Error while fetching data");
        }
        else{
            res.send(records);
        }
    })
})
router.post("/",(req,res)=>{
    connection.query("select * from spec where b_price<"+req.body.Price,(err,records,fields) => {
        if(err){
            console.error("Error while fetching data");
        }
        else{
            const result = takeInput(records,req.body)
            res.send(result);
        }
    })
})

module.exports = router;