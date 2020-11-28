<template>
    <div class="card-detail">
      <div class="preview">
        <img class="preview" :src="data.img" :alt="data.Name"
          @click="increment()" @click.right="decrement" @contextmenu.prevent />
      </div>
      <div class="cardstats">{{data}}</div>
    </div>
</template>

<script>
export default {
    name: "CardDetail",
    props: {
      data: Object
    },
    data() {
      return { 
        // big: false
      }
    },
    methods: {
      increment() {
        this.$store.commit('increment', this.data)
      },
      decrement() {
        this.$store.commit('decrement', this.data)
      },
    }
}
</script>

<style scoped>
    .preview {
      max-height: 50;
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