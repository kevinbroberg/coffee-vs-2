<template>
    <div>
        <!-- TODO filter by name -->
        <div v-bind:key="card.title" v-for="card in cardData">
            <CardDetail v-bind:card="card"/>
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
    // cardData expected to be [{ title: "onecard", url: "blahblah/1.jpeg"}, {title : "another", url: "etc"}]
    props: ["cardData"]
}
</script>


<style scoped>

</style>