const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static("public"));

app.get("/", function(req, res){
    /* const tab = ["citron", "pasteque", "pomme", "banane"];
    const fruit = tab[Math.floor(Math.random()*4)]; 
    res.render('/', {fruit_object: fruit});
    */
    res.render('index');
});

app.post("/", function(req,res){
    const tableau_weather = [];
    const ville = req.body.ville;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=a286852827009b6207ee7fc97c24125a&units=metric';

    https.get(url, function(response){
        response.on('data', function(data){
            const meteo_data = JSON.parse(data);
            const meteo = {
                city : ville,
                temperature : meteo_data.main.temp,
                description : meteo_data.weather[0].description,
                icon : meteo_data.weather[0].icon
            };
            tableau_weather.push(meteo);

            res.render('weather', {tableau: tableau_weather});
        });
    });
});


app.listen(port, () => {
    console.log('Le serveur tourne bien sur le port : ' + port);
});