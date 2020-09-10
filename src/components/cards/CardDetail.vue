<template>
    <div class="card-detail">
        {{card.title}}
        <img :src="card.url" :alt="card.title" height="100">
        <!-- <img src="@/assets/card_images/badguys.jpeg" :alt="card.title" height="100"> -->
    </div>
</template>

<script>
export default {
    name: "CardDetail",
    props: ["card"],
    methods: {
    }
}
</script>

<style scoped>
    .card-detail {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }

  .is-complete {
    text-decoration: line-through;
  }

  .del {
    background: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
  }
</style>