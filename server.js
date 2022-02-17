var express = require("express");
var app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
var productAPI = require("./controllers/ad-controller");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api",productAPI);
app.listen(8080);
console.log("Server up and running on 8080");