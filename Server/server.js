var express = require('express');
var app = express();
const request = require('request');

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// VARIABLES
const api_key = 'RGAPI-301b283a-41e0-493c-ac61-22ef21753988';
var summoner;
var match;

// FUNCTIONS
/**
 * Obtiene los datos basicos sobre la cuenta de invocador
 * @param summonerName
 */
function get_summoner(summonerName){
    request({url: 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summonerName +'?api_key='+ api_key +'', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
        console.log(json);
        summoner = json;
    });
}

/**
 * Obtiene los datos del match actual en base a la ID de summoner
 */
function get_match(summonerID){
    
    request({url: 'https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'+ summonerID +'?api_key='+ api_key +'', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
        console.log(json);
        match = json;
    });
}

// request({url: 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Eliczika?api_key=RGAPI-9192060b-fc4e-4815-a2d5-e5da6a65c396', json: true}, function(err, res, json) {
//     if (err) {
//         throw err;
//     }
//     console.log(json);
//     summoner = json;        
// });

// SOCKET.IO
io.on('connection', function(socket){
    console.log("New Conexion");

    // RECIVE EL SUMMONER
    socket.on('searchSummoner',function(data){
        get_summoner(JSON.parse(data));

        
        // DEVUELVE LOS DATOS DEL SUMMONER
        io.emit('summonerData',JSON.stringify(summoner));
        
        console.log(match);
    });
});
