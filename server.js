// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  //get the date input by the user into Indate variable
  var Indate = req.params.date;
  //if Indate is empty (no user input date) get local time
  if(!Indate){
    var date_unix = new Date().getTime();
  }
  //Otherwise check if date is input in unix format
  else {
    var date_num = Number(Indate); //try to convert Indate into a number..
    var date_unix = isNaN(date_num) ? new Date(Indate).getTime() : new Date(date_num).getTime(); //and assign the numeric Indate if successful or string Indate otherwise
  }
  //convert date to utc string
  var date_utc = new Date(date_unix).toUTCString();
  
  //check if input data is valid
  if (isNaN(date_unix) === false){
    res.json({unix: date_unix, utc: `${date_utc}`}); //if it is, send a json object with unix and utc date formats
  }
  else{
    res.json({error: "Invalid date"});} //otherwise send json object with "Invalid date" message
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
