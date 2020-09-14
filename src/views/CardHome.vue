<template>
  <div id="app">
    <CardList v-bind:cardData="cards"/>
  </div>
</template>

<script>
import CardList from '@/components/cards/CardList'
import rawCards from '@/assets/cards.json'

console.log('I have ' + rawCards.length + ' raw cards')
export default {
  name: 'Home',
  components: {
    CardList
  },
  // TODO a stackoverflow answer suggested to avoid `data` for static content, due to overhead, but 
   data() {
       return { 
        //  cards: rawCards
          cards : rawCards.map( card => {
            if (card.asset) {
              // TODO We really ought to not crash the whole display if a card is missing
              card.img = require('@/assets/card_images/' + card.asset);
            }
            return card
         }) 
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

    .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
    }
</style>
