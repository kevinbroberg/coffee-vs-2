<template>
<div class="isattack" v-if="card['type'] == 'attack'" >
  Attack {{getSpeed()}} <img :src="getSource(rawzone)" title="Attack" style="vertical-align : -3px;" :alt="switchSource(rawzone)" /> {{getDamage()}} <br />
  </div>
</template>

<script>
export default {
    name: "AttackDisplay",
    props: {
      card: Object
    },
    data() {
      return { 
        rawzone: this.card['attack_zone']
      }
    },
    methods: {
      getSource(s) {
          return require('@/images/attack' + this.switchSource(s) + '.png')
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
      },
      getDamage() {
        return this.card['damage'] // these were made to be durable to badly formed card data, but why bother with that when I can just form it well
      },
      getSpeed() {
        return this.card['speed']
      }
    }
}
</script>