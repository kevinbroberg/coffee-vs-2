<template>
    <div>
        <div v-bind:key="card.title" v-for="card in params">
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
    // params expected to be [{ title : "onecard"}, {title : "another"}]
    props: ["params"]
}
</script>


<style scoped>

</style>