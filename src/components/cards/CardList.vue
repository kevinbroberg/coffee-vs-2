<template>
    <div>
        <div class="input">
            Filter by name: 
            <input v-model="filter">
        </div>
        <!-- TODO move filtering logic into a separate component -->
        <input type="checkbox" id="Air" value="Air" v-model="symbolFilter">
        <label for="Air">Air</label>
        <input type="checkbox" id="All" value="All" v-model="symbolFilter">
        <label for="All">All</label>
        <input type="checkbox" id="Chaos" value="Chaos" v-model="symbolFilter">
        <label for="Chaos">Chaos</label>
        <input type="checkbox" id="Death" value="Death" v-model="symbolFilter">
        <label for="Death">Death</label>
        <input type="checkbox" id="Earth" value="Earth" v-model="symbolFilter">
        <label for="Earth">Earth</label>
        <input type="checkbox" id="Evil" value="Evil" v-model="symbolFilter">
        <label for="Evil">Evil</label>
        <input type="checkbox" id="Fire" value="Fire" v-model="symbolFilter">
        <label for="Fire">Fire</label>
        <input type="checkbox" id="Good" value="Good" v-model="symbolFilter">
        <label for="Good">Good</label>
        <input type="checkbox" id="Life" value="Life" v-model="symbolFilter">
        <label for="Life">Life</label>
        <input type="checkbox" id="Order" value="Order" v-model="symbolFilter">
        <label for="Order">Order</label>
        <input type="checkbox" id="Void" value="Void" v-model="symbolFilter">
        <label for="Void">Void</label>
        <input type="checkbox" id="Water" value="Water" v-model="symbolFilter">
        <label for="Water">Water</label>
        
        <div class="cardgrid" :key="card.Name" v-for="card in cardData">
            <CardDetail v-show="regexMatchFilter(card) && symbolMatchFilter(card)" 
                v-bind:card="card" />
        </div>
    </div>
</template>

<script>
import CardDetail from './CardDetail.vue';

export default {
    name: "CardList",
    components: {
        CardDetail
    },
    data() {
        return {
            filter: '',
            symbolFilter: []
        }
    },
    methods: {
        regexMatchFilter(card) {
            const regex = new RegExp(".*" + this.filter + ".*")
            return regex.test(card.Name)
        },
        symbolMatchFilter(card) {
            if (this.symbolFilter.length > 0) {
                return card.Resources.some(sym => this.symbolFilter.includes(sym))
            } else {
                return true
            }
            
        }
    },
    props: ["cardData"]
}
</script>


<style scoped>
    
</style>