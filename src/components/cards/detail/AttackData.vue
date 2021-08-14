<template>
<div class="isattack" v-if="card['Type'] == 'Attack'" >
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
        rawzone: this.card['Attack Zone']
      }
    },
    methods: {
      getSource(s) {
          return require('@/assets/icons/attack' + this.switchSource(s) + '.png')
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
        return this.card['Damage'] || this.card['Attack Damage'] || "??" // || ...
      },
      getSpeed() {
        return this.card['Speed'] || this.card['Attack Speed'] || "??" // || ...
      }
    }
}
</script>