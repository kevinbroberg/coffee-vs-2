<template>
<div class="elements">
  <img v-for="elem in card.Resources" v-bind:key=elem :src="pic(elem)" :alt=elem /> <br/>
</div>
</template>

<script>
export default {
    name: "BlockDisplay",
    props: {
      card: Object
    },
    data() {
      return { 
        rawzone: this.card['Block Zone']
      }
    },
    methods: {
        pic(s) {
            return require('@/assets/icons/' + this.switchSource(s) + '.png')
        },
        switchSource(s) {
          return s.toLowerCase();
      }
    }
}
</script>