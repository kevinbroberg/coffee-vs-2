<template>
  <div id="app">
    <CardList v-bind:cardData="data"/>
  </div>
</template>

<script>
import CardList from '@/components/cards/CardList'
// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    CardList
  },
  data() {
    // actual database access or something to be inserted here later
    return {
      data : [
            // TODO extra-shitty url generation, wasn't playing nice with method calls
            { title: "Bad Guys", url: require('@/assets/card_images/' + "badguys" + '.jpeg') },
            { title: "Blast Rush Turbo", url: require('@/assets/card_images/' + "blastrush" + '.jpeg') },
            { title: "Capabilities", url: require('@/assets/card_images/' + "capabilities" + '.jpeg') },
            { title: "Future Charge", url: require('@/assets/card_images/' + "futurecharge" + '.jpeg') },
            { title: "Howitzer", url: require('@/assets/card_images/' + "howitzer" + '.jpeg') },
            { title: "Self Sacrifice", url: require('@/assets/card_images/' + "selfsacrifice" + '.jpeg') },
          ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
