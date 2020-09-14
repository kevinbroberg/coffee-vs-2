<template>
    <div>
        <div>
            <multiselect v-model="nameFilter" :options="filteredCards.map(c => c.Name)" :close-on-select="true" :clear-on-select="false" 
            :searchable="true" placeholder="Filter by name">
            </multiselect>
        </div>
        <div>
            <multiselect v-model="symbolFilter" :options="symbolOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="false" placeholder="Filter by symbol">
            </multiselect>
        </div>
        <div>
            <multiselect v-model="originFilter" :options="originOptions" :multiple="true" :close-on-select="false" 
            :clear-on-select="false" :searchable="true" placeholder="Filter by set">
            </multiselect>
        </div>
        
        <div class="cardgrid" :key="card.Name" v-for="card in filteredCards">
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
            nameFilter: '',
            symbolFilter: [],
            originFilter: []
        }
    },
    created() {
        this.originOptions = [...new Set(this.cardData.map(card => card.Set))]
    },
    computed: {
        filteredCards() {
            return this.cardData.filter(card => this.allFiltersMatch(card))
        }
    },
    methods: {
        regexMatchFilter(card) {
            const regex = new RegExp(".*" + this.nameFilter + ".*")
            return regex.test(card.Name)
        },
        symbolMatchFilter(card) {
            if (this.symbolFilter.length > 0) {
                return card.Resources.some(sym => this.symbolFilter.includes(sym))
            } else {
                return true
            }
        },
        originMatchFilter(card) {
            // names like "setFilter" seemed to get misunderstood by javascript lmao
            if (this.originFilter.length > 0) {
                return this.originFilter.includes(card.Set)
            } else {
                return true
            }
        },
        allFiltersMatch(card) {
            return this.regexMatchFilter(card) && this.originMatchFilter(card) && this.symbolMatchFilter(card)
        }
    },
    props: ["cardData"]
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    
</style>