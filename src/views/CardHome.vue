<template>
  <div id="app">    
    <div>
      <div class="input">
        Regex filter:
        <input v-model="regexNameFilter">
      </div>
      <div>
        <multiselect v-model="selectedExactNames" :options="filteredCards.map(c => c.Name)" :close-on-select="false"
            :clear-on-select="false" :searchable="true" placeholder="Filter by exact name">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedSymbols" :options="symbolOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="false" placeholder="Filter by symbol">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedOrigins" :options="originOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="true" placeholder="Filter by set">
        </multiselect>
      </div>
      <InfiniteScrollCardDetailList v-bind:filteredCards="filteredCards"/>
    </div>
  </div>
</template>

<script>
import InfiniteScrollCardDetailList from '@/components/cards/InfiniteScrollCardDetailList'
import Multiselect from 'vue-multiselect'
import cards from '@/assets/cards.json'

export default {
  name: 'Home',
  components: {
    Multiselect,
    InfiniteScrollCardDetailList
  },
  data() {
    return {
      // TODO do these belong elsewhere?
      symbolOptions: ["Air", "All", "Chaos", "Death", "Earth", "Evil", "Fire", "Good", "Infinity", "Life", "Order", "Void", "Water"],
      originOptions: [],
      regexNameFilter: '',
      selectedExactNames: [],
      selectedSymbols: [],
      selectedOrigins: [],
      cardData: cards
    }
  },
  created() {
      this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
  },
  computed: {
    filteredCards() {
      return this.cardData.filter(card => this.allFiltersMatch(card)).map(this.decorateWithImg)
    }
  },
  methods: {
    decorateWithImg(card) {
      if (card.asset && !card.img) {
        // TODO We really ought to not crash the whole display if a card is missing
        card.img = require('@/assets/card_images/' + card.asset);
      }
      return card
    },
    regexMatchFilter(card) {
      if(this.regexNameFilter) {
        const regex = new RegExp(".*" + this.regexNameFilter + ".*", 'i')
        return regex.test(card.Name)
      } else {
        return true
      }
    },
    symbolMatchFilter(card) {
      if (this.selectedSymbols && this.selectedSymbols.length > 0) {
        return card.Resources.some(sym => this.selectedSymbols.includes(sym))
      } else {
        return true
      }
    },
    originMatchFilter(card) {
      // names like "setFilter" seemed to get misunderstood by javascript lmao
      if (this.selectedOrigins && this.selectedOrigins.length > 0) {
        return this.selectedOrigins.includes(card.Set)
      } else {
        return true
      }
    },
    exactNameFilter(card) {
      if (this.selectedExactNames && this.selectedExactNames.length > 0) {
        return this.selectedExactNames.includes(card.Name)
      } else {
        return true
      }
    },
    allFiltersMatch(card) {
      let filters = [this.regexMatchFilter, this.originMatchFilter, this.symbolMatchFilter, this.exactNameFilter]
      return filters.every(f => f(card))
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
