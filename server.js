// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.route('/api/timestamp/:date?')
  .get(function (req, res){
    
    var date = null;
    // parse the date string
    if (req.params.date !== undefined) {

      // check if it is a unix timestamp...
      var unixTimestamp = parseInt(req.params.date*1);
      if (isNaN(unixTimestamp)) {
        
        // it's not a unix timestamp string
        date = new Date(req.params.date);
      } else {
        
        // it is a timestamp
        date = new Date(unixTimestamp);
      }
      
    } else {
      
      // the date string parameter is empty. 
      // create a new date based on current time 
      date = new Date(Date.now());
    }
    
    // Initialize the response object, if Date is invalid
    // this one will be returned

    var response = date == "Invalid Date" ? 
      { error: "Invalid Date" } :
      { "unix": date.getTime(),
        "utc": date.toUTCString()
      };
    
    res.json(response);
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});