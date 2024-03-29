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
      <multiselect v-for="(filter, index) in symbolFilters" v-bind:key=index v-model="filter.selections" :options="filter.options" :multiple="true" :close-on-select="false" :customLabel=initialCap
        :clear-on-select="false" :searchable="false" placeholder="Filter by symbol">
      </multiselect>
      <div>
        <multiselect @close="selectedOrigins = $event" v-model="indirectOrigins" :options="originOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="true" placeholder="Filter by set">
        </multiselect>
      </div>
      <div>
        <multiselect v-model="selectedTypes" :options="typeOptions" :multiple="true" :close-on-select="false" :customLabel=initialCap
            :clear-on-select="false" :searchable="true" placeholder="Filter by card type">
        </multiselect>
      </div>
      <div>
        <multiselect @close="selectedKeywords = $event" v-model="indirectKeywords" :options="keywordOptions" :multiple="true" :close-on-select="false"
            tag-placeholder="Search keywords" :taggable=true @tag="addKeywordTag"
            :clear-on-select="false" :searchable="true" placeholder="Filter by keyword">
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
        <multiselect v-model="selectedFormats" :options="formatOptions" :multiple="true" :close-on-select="false" :customLabel=initialCap
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
      // selections
      nameSelection: this.query.nameSelection       ? this.query.nameSelection : '',
      textSelection: this.query.textSelection       ? this.query.textSelection : '',
      symbolFilters: [
        this.symbolFilterGenerator(["air", "all", "chaos", "death", "earth", "evil", "fire", "good", "infinity", "life", "order", "void", "water"], this.pureSymbolFilter), 
        this.symbolFilterGenerator(["air", "all", "chaos", "death", "earth", "evil", "fire", "good", "infinity", "life", "order", "void", "water"], this.pureSymbolFilter), 
        this.symbolFilterGenerator(["air", "all", "chaos", "death", "earth", "evil", "fire", "good", "infinity", "life", "order", "void", "water"], this.pureSymbolFilter)
      ],
      
      selectedOrigins: this.query.selectedOrigins   ? JSON.parse(this.query.selectedOrigins) : [],
      selectedTypes:   this.query.selectedTypes     ? JSON.parse(this.query.selectedTypes) : [],
      selectedKeywords: this.query.selectedKeywords ? JSON.parse(this.query.selectedKeywords) : [],
      selectedFormats: this.query.selectedFormats   ? JSON.parse(this.query.selectedFormats) : ["standard"],
      // don't immediately filter these after another selection
      indirectOrigins: [],
      indirectKeywords: [],
      nameTags: [],
      keywordTags: [],
      textTags: [],
      cardData: cards
    }
  },
  computed: {
    filteredCards() {
      return this.cardData.filter(card => this.allFiltersMatch(card))
    },
    resultsCount() {
      return this.filteredCards.length
    },
    typeOptions() {
      // not reactive at all
      return [...new Set(this.cardData.map(card => card.type))].sort()
    },
    nameOptions() {
      return [...this.nameTags, ...this.filteredCards.map(c => c.name)]
    },
    textOptions() {
      return ["NONE", ...this.textTags, ...new Set(this.filteredCards.map(c => c.text))]
    },
    formatOptions() {
      return [...new Set(this.filteredCards.map(card => card.formats).flat())]
    },
    keywordOptions() {
      // indirected - doesn't immediately update on changes
      return [...this.keywordTags, ...new Set(this.filteredCards.map(card => card.keywords).flat())].sort()
    },
    originOptions() {
      // indirected - doesn't immediately update on changes
      return [...new Set(this.filteredCards.map(card => card.extension))]
    },
  },
  methods: {
    addAllToDeck() {
        if (this.filteredCards.length > 200) {
            // TODO just don't show the button unless they meet this criteria? Show a different one instead?
            alert('200 card limit for bulk add. Please set more filters')
        } else {
            this.filteredCards.forEach(c => this.$store.commit('increment', c))
        }
    },
    initialCap([first, ...rest]) { // I LOVE destructuring but this has bad edge case handling
      return first.toUpperCase() + rest.join('')
    },
    pureSymbolFilter(choices, card) {
      return card.resources.some(sym => choices.includes(sym.toLowerCase()))
    },
    async copyFilterLink() {
        let fields = ["nameSelection",
            "textSelection",
            "selectedSymbols",
            "selectedSymbols2",
            "selectedSymbols3",
            "selectedOrigins",
            "selectedTypes",
            "selectedKeywords",
            "selectedFormats"]
        let queryStr = fields.map(field => this[field] && this[field].length > 0 ? field + "=" + JSON.stringify(this[field]) : "")
            .filter(val => val.length > 0)
            .join("&")

        let filterLink = location.origin + "/#" + this.$route.path + '?' + queryStr // TODO this looks sus

        await navigator.clipboard.writeText(filterLink)
    },
    // all methods below relate to filtering
    symbolFilterGenerator(options, condition) {
      let fi = {
        // options: ["air", "all", "chaos", "death", "earth", "evil", "fire", "good", "infinity", "life", "order", "void", "water"],
        options: options,
        selections: []
      }
      fi.filter = (card) => {
        if (fi.selections && fi.selections.length > 0) {
          // return card.resources.some(sym => choices.includes(sym.toLowerCase()))
          return condition(fi.selections, card)
        } else {
          return true
        }
      }
      return fi
    },
    originMatchFilter(card) {
      if (this.selectedOrigins && this.selectedOrigins.length > 0) {
        return this.selectedOrigins.includes(card.extension)
      } else {
        return true
      }
    },
    typeMatchFilter(card) {
      if (this.selectedTypes && this.selectedTypes.length > 0) {
        return this.selectedTypes.includes(card.type)
      } else {
        return true
      }
    },
    formatMatchFilter(card) {
        if (this.selectedFormats && this.selectedFormats.length > 0) {
          return card.formats && 
            card.formats.some(format => this.selectedFormats.includes(format))
        } else {
          return true
        }
    },
    addNameTag(newTag) {
      let tag = {
        name: newTag,
        code: Math.floor((Math.random() * 10000000))
      }
      this.nameTags.push(tag)
      this.nameSelection = newTag
    },
    addTextTag(newTag) {
      let tag = {
        name: newTag,
        code: Math.floor((Math.random() * 10000000))
      }
      this.textTags.push(tag)
      this.textSelection = newTag
    },
    addKeywordTag(newTag) {
      let tag = {
        name: newTag,
        code: Math.floor((Math.random() * 10000000))
      }
      this.keywordTags.push(tag)
      this.selectedKeywords.push(newTag)
    },
    nameFilter(card) {
      if (this.nameSelection && this.nameSelection.length > 0) {
        let frontanchor = this.nameSelection.startsWith('^') ? '^' : '.*'
        let backanchor = this.nameSelection.endsWith('$') ? '$' : '.*'
        const regex = new RegExp(frontanchor + this.nameSelection + backanchor, 'i')
        return regex.test(card.name)
      } else {
        return true
      }
    },
    textFilter(card) {
      if (this.textSelection && this.textSelection.length > 0) {
        if (this.textSelection == "NONE") {
          return !card.text
        } else {
            let frontanchor = this.textSelection.startsWith('^') ? '^' : '.*'
            let backanchor = this.textSelection.endsWith('$') ? '$' : '.*'
            const regex = new RegExp(frontanchor + this.textSelection + backanchor, 'i')
            return regex.test(card.text)
        }
      } else {
        return true
      }
    },
    keywordFilter(card) {
      if (this.selectedKeywords && this.selectedKeywords.length > 0) {
        return card.keywords && card.keywords.some(cardKeyword => this.selectedKeywords.some(choice => cardKeyword.includes(choice)))
      } else {
        return true
      }
    },
    clearFilters() {
      this.nameSelection = ''
      this.textSelection = ''
      this.selectedSymbols = []
      this.selectedSymbols2 = []
      this.selectedSymbols3 = []
      this.selectedOrigins = []
      this.selectedTypes = []
      this.selectedFormats = []
      this.selectedKeywords = []
    },
    allFiltersMatch(card) {
      let filters = [
                     this.originMatchFilter,
                     this.nameFilter,
                     this.textFilter,
                     this.typeMatchFilter,
                     this.formatMatchFilter,
                     this.keywordFilter,
                     ...this.symbolFilters.map(f => f.filter),
                     ]
      return filters.every(function(f) {
        try {
            return f(card)
        } catch (e) {
            console.error('Error on ' + card.name + ': ' + e.message)
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
