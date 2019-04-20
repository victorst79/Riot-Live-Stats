var express = require('express');
var app = express();
const request = require('request');

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// VARIABLES
const api_key = 'RGAPI-300b6064-af75-4d53-8d5d-b8459f8b1bcb';

var summoner;
var match;
var participants;

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
        summoner = json;
    });
}

/**
 * Obtiene los datos del match actual en base a la ID de summoner
 * @param summonerID
 */
function get_match(summonerID){
    
    request({url: 'https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'+ summonerID +'?api_key='+ api_key +'', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
        participants = json.participants;
        match = json;
        console.log(json)
    });
}

/**
 * Obtiene una lista de las 100 ultimas partidas del jugador para calcular la media de campeones mas jugados
 * @param summonerID 
 */
function get_bestChampions(summonerID){

}

// SOCKET.IO
io.on('connection', function(socket){
    console.log("New Conexion");

    // RECIVE EL SUMMONER
    socket.on('searchSummoner',function(data){
        get_summoner(JSON.parse(data));

        // DEVUELVE LOS DATOS DEL SUMMONER
        io.emit('summonerData', JSON.stringify(summoner));

        socket.on('summonerID', function(data){
            get_match(JSON.parse(data));
            
            io.emit('matchParticipants', JSON.stringify(participants));
        });
    });
});
