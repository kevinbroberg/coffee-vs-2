<template>
  <div>
    <button @click="deckAsText" type="button">Download as .txt file</button>
    <!-- text box is editable and attempts to replace $state with user input (when they click a "Save"?) -->
    <vue-good-table
      :columns="columns"
      :rows="deckGroupedByTypes"
      :sort-options ="{enabled: true}"
      :group-options="{enabled: true}"
      >
        <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'qty'">
                <button @click="incrementRow(props)" type="button">+</button>
                {{props.formattedRow[props.column.field]}}
                <button @click="decrementRow(props)" type="button">-</button>
            </span>
            <span v-else-if="props.column.field == 'Resources'">
                <!-- coming soon; replace with resource symbol icons -->
                {{props.formattedRow[props.column.field]}}
            </span>
            <span v-else>
                {{props.formattedRow[props.column.field]}}
            </span>
        </template>
    </vue-good-table>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
export default {
    name: "DeckDataGrid",
    components: { VueGoodTable },
    data() {
        return {
            columns: [
                {'field': 'name', 'label': 'Name'},
                {'field': 'qty', 'label': 'Quantity'},
                {'field': 'type', 'label': 'Type'},
                {'field': 'difficulty', 'label': 'Difficulty', type: 'number' },
                {'field': 'control', 'label': 'Control', type: 'number' },
                {'field': 'extension', 'label': 'Set'},
                {'field': 'block_modifier', 'label': 'Block Modifier', type: 'number' },
                {'field': 'block_zone', 'label': 'Block Zone'},
                {'field': 'attack_zone', 'label': 'Attack Zone'},
                {'field': 'speed', 'label': 'Speed', type: 'number' },
                {'field': 'damage', 'label': 'Damage', type: 'number' },
                //{'field': 'vitality', 'label': 'Vitality', type: 'number' },
                //{'field': 'hand Size', 'label': 'Hand Size', type: 'number' },
                {'field': 'resources', 'label': 'Resources'},
                {'field': 'text', 'label': 'Text'},
            ]
        }
    },
    computed: {
        stateDeck() {
            return Object.values(this.$store.state.deck)
        },
        deckGroupedByTypes() {
            let myCards = this.stateDeck
            let groups = [...new Set(myCards.map(card => card.type))]
            return groups.map(g => this.groupedRows(myCards, g))
        }
    },
    methods: {
        incrementRow(params) {
            this.$store.commit('increment', params.row)
        },
        decrementRow(params) {
            this.$store.commit('decrement', params.row)
        },
        groupedRows(cards, type) {
              return {
                mode: 'span',
                label: type,
                html: false, 
                children: cards.filter(c => c.type == type)
            }
        },
        
        deckAsText() {
            return this.download("deck.txt", this.stateDeck.map(c => c.qty + " " + c.name).join('\n'))
        },
        download(filename, contents) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
            element.setAttribute('download', filename);

            element.style.display = 'none';

            element.click();
        }
    }
}
</script>

<style scoped>
</style>