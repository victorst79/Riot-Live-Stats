<template>
  <div class="main">
    
    <div v-if="statsOn == true">
      <h1>entra</h1>
    </div>
    <div v-else>
      <h1>sin datos</h1>
      <input type="text" v-model="summonerToSearch" @keypress.enter="searchSummoner">
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return{
      summonerToSearch: '',
      summoner: '',
      match: '',
      participants: '',
      infoParticipants: '',
      statsOn: false,
    }
  },  
  sockets: {
    connect: function () {
      return true;
    },
    summonerData: function (data){
      this.summoner = JSON.parse(data);
      // ENVIA LA ID DEL SUMMONER AL RECIBIR TODOS LOS DATOS (NECESITA PULIRSE ESTA FUNCION)
      this.summonerId(this.summoner);
    },
    matchData: function (data){
      this.match = JSON.parse(data);
      this.participants = this.match.participants;

      this.summonerData(this.participants);
    },
    summonerBasicData: function (data) {
      this.infoParticipants = (JSON.parse(data));
    }
  },
  methods: {
    // ENVIA AL SERVIDOR INFORMACION SOBRE EL NOMBRE DE INVOCADOR
    searchSummoner: function () {
      this.$socket.emit('searchSummoner', JSON.stringify(this.summonerToSearch));
    },
    // ENVIA LA ID DE SUMMONER PARA OBTENER INFORMACION DE UN MATCH
    summonerId: function () {
      this.$socket.emit('summonerID' , JSON.stringify(this.summoner.id));
    },
    // FUNCION PARA OBTENER DATOS BASICOS DE CADA JUGADOR DE LA PARTIDA
    summonerData: function () {
      this.$socket.emit('summonerInfo', JSON.stringify(this.participants));
    },
  }
}
</script>
