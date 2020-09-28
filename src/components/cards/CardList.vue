<template>
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
        <div class="scroll">
            <list-scroller :item-component="item" 
                :items-data="scrolledCards" :item-height="2" @bottom="addMore" />
        </div>
        
    </div>
</template>

<script>
import CardDetail from './CardDetail.vue';
import Multiselect from 'vue-multiselect'
import ListScroller from 'vue-list-scroller'

export default {
    name: "CardList",
    components: {
        Multiselect,
        ListScroller
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
            scrollLimit: 3,
            scrollPageSize: 10,
            item: CardDetail
        }
    },
    created() {
        this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
    },
    computed: {
        filteredCards() {
            return this.cardData.filter(card => this.allFiltersMatch(card)).map(this.decorateWithImg)
        },
        scrolledCards() {
            return this.filteredCards.slice(0, this.scrollLimit * this.scrollPageSize)
        }
    },
    methods: {
        addMore() {
            this.scrollLimit = this.scrollLimit + 1
        },
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
            return this.regexMatchFilter(card) && this.originMatchFilter(card) && this.symbolMatchFilter(card) && this.exactNameFilter(card)
        }
    },
    props: ["cardData"]
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    button.page-link {
        display: inline-block;
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset{
        width: 500px !important;
        margin: 20px auto;  
    }
    .scroll {
        overflow-anchor: none;
    }
</style>