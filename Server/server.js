var express = require('express');
var app = express();
const request = require('request');

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// VARIABLES
const api_key = 'RGAPI-d45e9026-a5db-476a-b2dd-0d55a7a44be9';

var summoner;
var match;
var participants;
var infoParticipant = [];

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
        match = json;
    });
}

/**
 * Devuelve la informacion basica de la cuenta de los jugadores de una partida
 * @param participants 
 */
function get_basicDataSummoner(participants){
    for(let i = 0; i < 10; i++){
        request({url: 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ participants[i].summonerId +'?api_key='+ api_key +'', json: true}, function(err, res, json) {
        if (err) {
            throw err;
        }
            infoParticipant.push(json);
        });
    }
}

/**
 * Obtiene una lista de las 100 ultimas partidas del jugador para calcular la media de campeones mas jugados
 * @param accountID 
 */
function get_bestChampions(accountID){

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
            
            // ENVIA TODA LA INFORMACION DE LA PARTIDA AL CLIENTE
            io.emit('matchData', JSON.stringify(match));

            // INFORMACION SOBRE CADA JUGADOR
            socket.on('summonerInfo', function(data) {
                get_basicDataSummoner(JSON.parse(data));

                io.emit('summonerBasicData', JSON.stringify(infoParticipant));
            });
        });
    });    
});
