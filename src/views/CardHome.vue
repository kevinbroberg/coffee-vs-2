<template>
  <div id="app">
    <CardList v-bind:cardData="cards"/>
  </div>
</template>

<script>
import CardList from '@/components/cards/CardList'
import rawCards from '@/assets/cards.json'

export default {
  name: 'Home',
  components: {
    CardList
  },
   data() {
       return { 
          cards: rawCards // formerly did preprocessing here, now moved to CardList
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  #app {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    
  }
</style>
