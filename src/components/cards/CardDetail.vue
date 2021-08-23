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
      // should I store the image locally rather than setting it on the data? is this fucky somehow?
    },
    created() {
      this.getImage()
    },
    data() {
      return { 
        // big: false
      }
    },
    methods: {
      getImage() {
        // https://stackoverflow.com/questions/50659676/how-to-load-image-src-url-in-vuejs-asyncronously
        setTimeout(() => {
          this.data.img = require('@/images/card_images/' + this.data.asset);
        }, 1)
      },
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
      display: inline-block;
      margin: auto;
        max-width : 50vw;
        max-height : 25vh;
        border-radius: 5px;
        box-shadow: 0 2px 3px #666;
        vertical-align: bottom;
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