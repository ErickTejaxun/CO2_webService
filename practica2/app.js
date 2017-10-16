


var express = require("express");
var app = express();
var port = 1337;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/aire');
 

//Esquema de la db


var aireSchema = new mongoose.Schema({
	altitud: { type: Number},
	latitud: { type: Number},
	co2: { type: Number, min: 0, max: 100000},
	timestamp: { type: Date}
});

var datoAire = mongoose.model("Aire", aireSchema);


app.get("/", (req, res) => {
//res.send("Hello World");
res.sendFile(__dirname + "/index.html");
});



app.post("/agregardato", (req, res) => {
   var myData = new datoAire(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    }); 
});

 
app.listen(port, () => {
  console.log("Server listening on port " + port);
})
