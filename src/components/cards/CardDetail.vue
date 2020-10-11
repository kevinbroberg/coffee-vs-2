<template>
    <div class="card-detail">
      <div class="preview">
        <img :class="{big: big}" :src="data.img" :alt="data.Name" @click="clicked()" />
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
        big: false
      }
    },
    methods: {
      clicked() {
        this.big = !this.big
      }
    }
}
</script>

<style scoped>
    .big {
      max-width: 100%;
      max-height: 100%;
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