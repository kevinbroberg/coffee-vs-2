<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="deck"/>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
export default {
    name: "Deck",
    components: { VueGoodTable },
    data() {
        return {
            columns: [
                {'field': 'Name', 'label': 'Name'},
                {'field': 'Type', 'label': 'Type'},
                {'field': 'Difficulty', 'label': 'Difficulty', type: 'number' },
                {'field': 'Control', 'label': 'Control', type: 'number' },
                {'field': 'Set', 'label': 'Set'},
                {'field': 'Block Modifier', 'label': 'Block Modifier', type: 'number' },
                {'field': 'Block Zone', 'label': 'Block Zone'},
                {'field': 'Attack Zone', 'label': 'Attack Zone'},
                {'field': 'Speed', 'label': 'Speed', type: 'number' },
                {'field': 'Damage', 'label': 'Damage', type: 'number' },
                {'field': 'Vitality', 'label': 'Vitality', type: 'number' },
                {'field': 'Hand Size', 'label': 'Hand Size', type: 'number' },
                {'field': 'Resources', 'label': 'Resources'},
                {'field': 'CardText', 'label': 'CardText'},
            ]
        }
    },
    computed: {
        deck() {
            return Object.values(this.$store.state.deck)
        }
    }
}
</script>

<style scoped>
</style>