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
      <div>
        <multiselect v-model="textSelection" :options="textOptions"
          tag-placeholder="Search for text" :taggable=true @tag="addTextTag"
          :close-on-select="true" :clear-on-select="false"
          :searchable="true" placeholder="Filter by text">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedFormats" :options="formatOptions" :multiple="true" :close-on-select="false"
            :clear-on-select="false" :searchable="true" placeholder="Filter by format">
        </multiselect>
      </div>
      <button v-if="resultsCount > 200" type="button">{{resultsCount}} Cards in Search</button>
      <button v-if="resultsCount <= 200" @click="addAllToDeck" type="button">Add All {{resultsCount}} Cards to your Deck</button>
      <button @click="clearFilters" type="button">Clear Filters</button>
      <button @click="copyFilterLink" type="button">Copy Link to These Filters</button>
    </div>
    <InfiniteScrollCardDetailList v-bind:filteredCards="filteredCards"/>
  </div>
</template>

<script>
import InfiniteScrollCardDetailList from '@/components/cards/InfiniteScrollCardDetailList'
import Multiselect from 'vue-multiselect'
import playtestCards from '@/assets/playtest.json'
import cards from '@/assets/cards.json'

export default {
  name: 'Home',
  components: {
    Multiselect,
    InfiniteScrollCardDetailList
  },
  props: ["query"],
  data() {
    return {
      // TODO do these symbol options belong elsewhere? Could they be reactive to the filtered cards?
      symbolOptions: ["Air", "All", "Chaos", "Death", "Earth", "Evil", "Fire", "Good", "Infinity", "Life", "Order", "Void", "Water"],
      formatOptions: ["Standard", "Retro", "Playtest", "Future", "Universal"],
      // reactive options (to the cards overall, if not universally to the current set of filtered ones)
      originOptions: [],
      typeOptions: [],
      textOptions: [],
      nameSelection: this.query.nameSelection       ? this.query.nameSelection : '',
      textSelection: this.query.textSelection       ? this.query.textSelection : '',
      selectedSymbols: this.query.selectedSymbols   ? JSON.parse(this.query.selectedSymbols) : [],
      selectedSymbols2: this.query.selectedSymbols2 ? JSON.parse(this.query.selectedSymbols2) : [],
      selectedOrigins: this.query.selectedOrigins   ? JSON.parse(this.query.selectedOrigins) : [],
      selectedTypes:   this.query.selectedTypes     ? JSON.parse(this.query.selectedTypes) : [],
      selectedFormats: this.query.selectedFormats   ? JSON.parse(this.query.selectedFormats) : [],
      cardData: cards.concat(playtestCards)
    }
  },
  created() {
      this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
      this.typeOptions = [...new Set(this.cardData.map(card => card.Type))]
      this.textOptions = ["NONE", ...new Set(this.filteredCards.map(c => c.CardText))]
  },
  computed: {
    filteredCards() {
      return this.cardData.filter(card => this.allFiltersMatch(card)).map(this.decorateWithImg)
    },
    resultsCount() {
      return this.filteredCards.length
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
      if (!card.Id && card.Name) {
        card.Id = "Future$" + card.Name
      }
      return card
    },
    addAllToDeck() {
        if (this.filteredCards.length > 200) {
            // TODO just don't show the button unless they meet this criteria? Show a different one instead?
            alert('200 card limit for bulk add. Please set more filters')
        } else {
            this.filteredCards.forEach(c => this.$store.commit('increment', c))
        }
    },
    async copyFilterLink() {
        let fields = ["nameSelection",
            "textSelection",
            "selectedSymbols",
            "selectedSymbols2",
            "selectedOrigins",
            "selectedTypes",
            "selectedFormats"]
        let queryStr = fields.map(field => this[field] ? field + "=" + JSON.stringify(this[field]) : "")
            .filter(val => !!val)
            .join("&")

        let filterLink = location.origin + "/#" + this.$route.path + '?' + queryStr

        await navigator.clipboard.writeText(filterLink)
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
      if (this.selectedOrigins && this.selectedOrigins.length > 0) {
        return this.selectedOrigins.includes(card.Set)
      } else {
        return true
      }
    },
    typeMatchFilter(card) {
      if (this.selectedTypes && this.selectedTypes.length > 0) {
        return this.selectedTypes.includes(card.Type)
      } else {
        return true
      }
    },
    formatMatchFilter(card) {
        if (this.selectedFormats && this.selectedFormats.length > 0) {
          return card.Formats && 
            card.Formats.some(format => this.selectedFormats.includes(format))
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
    addTextTag(newTag) {
      let tag = {
        name: newTag,
        code: Math.floor((Math.random() * 10000000))
      }
      this.textOptions.push(tag)
      this.textSelection = newTag
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
    textFilter(card) {
      if (this.textSelection && this.textSelection.length > 0) {
        if (this.textSelection == "NONE") {
          return !card.CardText
        } else {
            let frontanchor = this.textSelection.startsWith('^') ? '^' : '.*'
            let backanchor = this.textSelection.endsWith('$') ? '$' : '.*'
            const regex = new RegExp(frontanchor + this.textSelection + backanchor, 'i')
            return regex.test(card.CardText)
        }
      } else {
        return true
      }
    },
    clearFilters() {
      this.nameSelection = ''
      this.textSelection = ''
      this.selectedSymbols = []
      this.selectedSymbols2 = []
      this.selectedOrigins = []
      this.selectedTypes = []
      this.selectedFormats = []
    },
    allFiltersMatch(card) {
      let filters = [this.originMatchFilter, 
                     this.symbolFilterGenerator(this.selectedSymbols), 
                     this.symbolFilterGenerator(this.selectedSymbols2),
                     this.nameFilter,
                     this.textFilter,
                     this.typeMatchFilter,
                     this.formatMatchFilter
                     ]
      return filters.every(function(f){
        try {
            return f(card)
        } catch (e) {
            console.error('Error on ' + card.Name + ': ' + e.message)
            return false
        }
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
</style>
