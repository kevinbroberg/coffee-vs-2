<template>
  <div id="app">
    <CardList v-bind:params="data"/>
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
    //   This is my O M E G A SHITTY in memory DB
    return {
      data : ["badguys", "blastrush", "capabilities", "futurecharge", "howitzer", "selfsacrifice"].map(
              val => { return {title: val} }
      )
    }
  },
  methods: {
      titleToUrl(title) {
        // @/assets/card_images/badguys.jpeg
        return require('@/assets/card_images/' + title + '.jpeg')
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
