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
    matchParticipants: function (data){
      this.participants = JSON.parse(data);
    }
  },
  methods: {
    searchSummoner: function () {
      this.$socket.emit('searchSummoner', JSON.stringify(this.summonerToSearch));
    },
    summonerId: function () {
      this.$socket.emit('summonerID' , JSON.stringify(this.summoner.id));
    }
  }
}
</script>
