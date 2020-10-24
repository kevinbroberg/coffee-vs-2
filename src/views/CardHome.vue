<template>
  <div id="app">    
    <div id="options">
      <div>
        <multiselect v-model="nameSelection" :options="nameOptions"
          tag-placeholder="Search with this name (or regex!)" :taggable=true @tag="addNameTag"
          :close-on-select="true" :clear-on-select="false"
          :searchable="true" placeholder="Filter by name">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedSymbols" :options="symbolOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="false" placeholder="Filter by symbol">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedSymbols2" :options="symbolOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="false" placeholder="Filter by symbol">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedOrigins" :options="originOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="true" placeholder="Filter by set">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedTypes" :options="typeOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="true" placeholder="Filter by card type">
        </multiselect>
      </div>
      <button @click="addAllToDeck" type="button">Add All Cards to your Deck</button>
      <button @click="clearFilters" type="button">Clear Filters</button>
    </div>
    <InfiniteScrollCardDetailList v-bind:filteredCards="filteredCards"/>
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
      // TODO do these symbol options belong elsewhere?
      symbolOptions: ["Air", "All", "Chaos", "Death", "Earth", "Evil", "Fire", "Good", "Infinity", "Life", "Order", "Void", "Water"],
      originOptions: [],
      typeOptions: [],
      nameSelection: '',
      selectedSymbols: [],
      selectedSymbols2: [],
      selectedOrigins: [],
      selectedTypes: [],
      cardData: cards
    }
  },
  created() {
      this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
      this.typeOptions = [...new Set(this.cardData.map(card => card.Type))]
  },
  computed: {
    filteredCards() {
      return this.cardData.filter(card => this.allFiltersMatch(card)).map(this.decorateWithImg)
    },
    nameOptions() {
      return this.filteredCards.map(c => c.Name)
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
    addAllToDeck() {
        if (this.filteredCards.length > 100) {
            // TODO just don't show the button unless they meet this criteria?
            alert('100 card limit for bulk add. Please set more filters')
        } else {
            this.filteredCards.forEach(c => this.$store.commit('increment', c))
        }
    },
    // all methods below relate to filtering
    symbolFilterGenerator(selections){ 
      return (card) => {
        if (selections && selections.length > 0) {
          return card.Resources.some(sym => selections.includes(sym))
        } else {
          return true
        }
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
    typeMatchFilter(card) {
      // names like "setFilter" seemed to get misunderstood by javascript lmao
      if (this.selectedTypes && this.selectedTypes.length > 0) {
        return this.selectedTypes.includes(card.Type)
      } else {
        return true
      }
    },
    addNameTag(newTag) {
      let tag = {
        name: newTag,
        code: Math.floor((Math.random() * 10000000))
      }
      this.nameOptions.push(tag)
      this.nameSelection = newTag
    },
    nameFilter(card) {
      if (this.nameSelection && this.nameSelection.length > 0) {
        let frontanchor = this.nameSelection.startsWith('^') ? '^' : '.*'
        let backanchor = this.nameSelection.endsWith('$') ? '$' : '.*'
        const regex = new RegExp(frontanchor + this.nameSelection + backanchor, 'i')
        return regex.test(card.Name)
      } else {
        return true
      }
    },
    clearFilters() {
      this.nameSelection = ''
      this.selectedSymbols = []
      this.selectedSymbols2 = []
      this.selectedOrigins = []
      this.selectedTypes = []
    },
    allFiltersMatch(card) {
      let filters = [this.originMatchFilter, 
                     this.symbolFilterGenerator(this.selectedSymbols), 
                     this.symbolFilterGenerator(this.selectedSymbols2),
                     this.nameFilter,
                     this.typeMatchFilter]
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
