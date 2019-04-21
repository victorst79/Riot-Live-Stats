<template>
  <div class="main">
    <input type="text" v-model="summonerToSearch" @keypress.enter="searchSummoner">
  </div>
</template>

<script>
export default {
  data: function(){
    return{
      summonerToSearch: '',
      summoner: '',
      match: '',
      participants: ''
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
      for(let i = 0; i < this.participants.legth; i++) {
        this.$socket.emit('summonerBasicData',JSON.stringify(this.participants[i]));
      }      
    }
  }
}
</script>
