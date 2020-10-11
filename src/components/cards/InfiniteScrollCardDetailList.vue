<template>
    <div class="scroll">
        <list-scroller :item-component="item" 
            :items-data="scrolledCards" :item-height="2" @bottom="addMore" />
    </div>
</template>

<script>
import CardDetail from './CardDetail.vue'
import ListScroller from 'vue-list-scroller'

export default {
    name: "InfiniteScrollCardDetailList",
    components: {
        ListScroller
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