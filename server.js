var express = require("express");
var app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(express.static("digihal-angular"));
app.use(cors(corsOptions)) // Use this after the variable declaration
var productAPI = require("./controllers/ad-controller");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api",productAPI);
let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
