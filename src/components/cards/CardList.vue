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
        <div class="offset">
            <nav aria-label="Page navigation example">
                <button type="button" class="page-link" @click="page--" v-if="page != 1"> Previous </button>
                <button type="button" class="page-link" @click="page = pageNumber" v-bind:key="pageNumber" v-for="pageNumber in pages.slice(page-1, page+5)"> {{pageNumber}} </button>
                <button type="button" class="page-link" @click="page++" v-if="page < pages.length"> Next </button>
            </nav>
        </div>
        <div class="cardgrid" :key="card.Name" v-for="card in paginatedCards">
            <CardDetail v-bind:card="card" /> <!-- v-show="allFiltersMatch(card)" -->
        </div>
    </div>
</template>

<script>
import CardDetail from './CardDetail.vue';
import Multiselect from 'vue-multiselect'

export default {
    name: "CardList",
    components: {
        CardDetail,
        Multiselect
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
            item: CardDetail,
            page: 1,
            perPage: 50,
        }
    },
    created() {
        this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
    },
    computed: {
        filteredCards() {
            return this.cardData.filter(card => this.allFiltersMatch(card)).map(this.decorateWithImg)
        },
        paginatedCards() {
            const start = (this.page - 1) * this.perPage
            return this.filteredCards.slice(start, start + this.perPage)
        },
        pages() {
            const size = Math.ceil(this.filteredCards.length / this.perPage)
            return [...Array(size).keys()].map(n => n+1)
        }
    },
    methods: {
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
</style>