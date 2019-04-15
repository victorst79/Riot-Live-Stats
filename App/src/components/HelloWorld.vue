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
    }
  },  
  sockets: {
    connect: function () {
      return true;
    },
    summonerData: function (data){
      this.summoner = JSON.parse(data);
    }
  },
  methods: {
    searchSummoner: function () {
      this.$socket.emit('searchSummoner', JSON.stringify(this.summonerToSearch));
    },
    
  }
}
</script>
