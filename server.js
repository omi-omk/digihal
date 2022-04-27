var express = require("express");
var app = express();
const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
app.use(express.static("digihal"));
app.get("/output",(req, res)=>{
  res.redirect('/output');
})
app.use(cors(
  {
    origin: "*",
  })) // Use this after the variable declaration
var productAPI = require("./controllers/ad-controller");
var crudAPI = require("./controllers/crud-controller");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api",productAPI);
app.use("/crud",crudAPI);
let PORT = process.env.PORT || 3000;
// let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
