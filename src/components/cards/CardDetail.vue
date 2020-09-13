<template>
    <div class="card-detail">
      <div class="preview">
        <img :class="{card, big: big}" :src="card.img" :alt="card.title" @click="clicked()" />
      </div>
      <div class="cardstats">{{card.title}}</div>
    </div>
</template>

<script>
export default {
    name: "CardDetail",
    props: ["card"],
    data() {
      return { big : false }
    },
    methods: {
      clicked() {
        this.big = !this.big
      }
    }
}
</script>

<style scoped>
    .card {
      max-width: 100px;
      cursor: zoom-in
    }

    .big {
      max-width: 500px;
      cursor: zoom-out
    }

    .preview {
      display: inline-block;
      margin: auto;
    }
    
    .cardstats {
      display: inline-block;
      width: 50
    }

    .card-detail {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
</style>