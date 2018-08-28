var express = require("express");
var app = express();
var port = process.env.PORT || 8010;
var bodyParser = require("body-parser");
var translate = require('google-translate-api');
var jsonParser = bodyParser.json();

var country = require('countryjs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('pages/index');
});

app.post("/", jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  var code = country.languages(request.body.langCode);

  translate(request.body.text, { from: request.body.language, to: code[0] }).then(res => {
    response.json(res.text);

  }).catch(err => {
    console.error(err);
  });
  
});


app.listen(port, function () {
  console.log('Сервер запущен успешно:) адрес localhost сервера http://localhost:8010');
});
