const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res) {
  // console.log(req.body.cityName)
  const city = req.body.cityName;
  const apiKey = "63d9fc0c1a0277848645cea8c1fde6ce";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+ unit

  https.get(url, function(response) {
    console.log(response.statusCode) //statuscode

    response.on("data", function(data) {
      // console.log(data); //data in hex value
      const weatherData = JSON.parse(data); //js object
      const temp = weatherData.main.temp
      const feels_like = weatherData.main.feels_like
      const desp = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temp in " + city + " is " + temp + " degree.</h1>");
      res.write("<h1>It feels like  " + feels_like + "</h1>");
      res.write("<h1>The weather is currently " + desp + "</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  })

});


app.listen(3000);
