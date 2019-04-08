var express = require('express');
var app = express();
const request = require('request');

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// VARIABLES
var summoner;

// FUNCTIONS
/**
 * Obtiene los datos basicos sobre la cuenta de invocador
 */
function get_summoner(summonerName){
    request({url: 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summonerName +'?api_key=RGAPI-9192060b-fc4e-4815-a2d5-e5da6a65c396', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
        console.log(json);
        summoner = json;        
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
    get_summoner('Eliczika');
    io.emit('user',JSON.stringify(summoner));
});
