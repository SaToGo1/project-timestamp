// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api/:date', (req, res) => {

  let date = null;
  if (isNaN(req.params.date)) // date style YYYY-MM-DD
  {
    date = new Date(req.params.date);
    // ERROR: Invalid Date
    // we get a date with letters or other invalid format.
    if (date == 'Invalid Date') {
      res.json({ "error": "Invalid Date" })
    }

    console.log(date);
    res.json({ Date: date });
  }
  else  // date style 1451001600000 unix code in Miliseconds
  {
    //req.params.date => String
    let unixTimestamp = Number(req.params.date)
    date = new Date(unixTimestamp);
    res.json({ Date: date.toLocaleString() });
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// testing github - replit.