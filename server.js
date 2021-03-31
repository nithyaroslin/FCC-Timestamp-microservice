// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

// let utcTime = (dateX) => {
//   const a = new Date(dateX * 1000);
//   const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   const days = ['Sun','Mon','Tue','Wed','Thu','Fri'];
//   const year = a.getUTCFullYear();
//   const month = months[a.getMonth()];
//   const dateLocal = a.getDate().toString();
//   const day = days[a.getDay()];
//   const hour = a.getHours();
//   const min = a.getMinutes();
//   const sec = a.getSeconds();
//   const utc = `${day}, ${dateLocal} ${month} ${year} ${hour}:${min}:${sec} GMT` ;
//   return utc;
  
// }
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

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date(parseInt(Date.now())).toUTCString() });
});


app.get("/api/timestamp/:date", function (req, res) {
  let dateParam = req.params.date;
  let time, unix;

  
  if (/^[0-9]*$/.test(dateParam)){
  const dateInt = parseInt(dateParam);
  const dateObject = new Date(dateInt);
        time = dateObject.toUTCString();
      unix = dateInt;
    
  }
  else {
   
   unix = Date.parse(dateParam);
   time = new Date(dateParam).toUTCString();

  }
  if (time === "Invalid Date") {
    res.json( {error : "Invalid Date"})
  }
  else {
  res.json({unix: unix, utc : time});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
