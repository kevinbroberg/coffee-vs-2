<template>
    <div>
        Filter by name: 
        <input v-model="filter">
        <div class="cardgrid" v-bind:key="card.title" v-for="card in cardData">
            <CardDetail v-show="regexMatchFilter(card)" v-bind:card="card" />
        </div>
        <!-- </div> -->
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
            filter: ''
        }
    },
    methods: {
        regexMatchFilter(card) {
            const regex = new RegExp(".*" + this.filter + ".*")
            return regex.test(card.title)
        }
    },
    // cardData expected to be [{ title: "onecard", url: "blahblah/1.jpeg"}, {title : "another", url: "etc"}]
    props: ["cardData"]
}
</script>


<style scoped>
    
</style>