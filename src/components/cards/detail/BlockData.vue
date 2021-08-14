<template>
<div class="hasblock" v-if="rawzone">
  <span>
    Block : +{{card['Block Modifier']}} <img :src="getSource(rawzone)" title="Block" style="vertical-align : -3px;" /> <br/>
  </span>
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
        getSource(s) {
            return require('@/assets/icons/block' + this.switchSource(s) + '.png')
        },
        switchSource(s) {
            s = s.toLowerCase();
            if (s.startsWith('h')) {
            return 'high';
        }
        if (s.startsWith('m')) {
            return 'mid';
        }
        if (s.startsWith('l')) {
            return 'low';
        }
      }
    }
}
</script>