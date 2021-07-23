<template>
    <div class="scroll">
        <!-- <list-scroller :item-component="item"  -->
            <!-- :items-data="scrolledCards" :item-height="2" @bottom="addMore" /> -->
    </div>
</template>

<script>
// import CardDetail from './CardDetail.vue'
// import ListScroller from 'vue-list-scroller'

export default {
    name: "CardGrid",
    components: {
        // ListScroller
    },
    data() {
        return {
            scrollLimit: 3,
            scrollPageSize: 10,
            item: CardDetail
        }
    },
    computed: {
        scrolledCards() {
            return this.filteredCards.slice(0, this.scrollLimit * this.scrollPageSize)
        }
    },
    methods: {
        addMore() {
            this.scrollLimit = this.scrollLimit + 1
        }
    },
    props: ["filteredCards"]
}
</script>

