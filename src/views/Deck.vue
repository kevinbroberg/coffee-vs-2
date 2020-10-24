<template>
  <div>
    <button @click="deckAsText" type="button">Download as .txt file</button>
    <vue-good-table
      :columns="columns"
      :rows="deckGroupedByTypes"
      :sort-options ="{enabled: true}"
      :group-options="{enabled: true}"
      @on-row-click="onRowClick"
      >
        <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'qty'">
                {{props.formattedRow[props.column.field]}} <button @click="decrementRow(props)" type="button">-</button>
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
    name: "Deck",
    components: { VueGoodTable },
    data() {
        return {
            columns: [
                {'field': 'Name', 'label': 'Name'},
                {'field': 'qty', 'label': 'Quantity'},
                {'field': 'Type', 'label': 'Type'},
                {'field': 'Difficulty', 'label': 'Difficulty', type: 'number' },
                {'field': 'Control', 'label': 'Control', type: 'number' },
                {'field': 'Set', 'label': 'Set'},
                {'field': 'Block Modifier', 'label': 'Block Modifier', type: 'number' },
                {'field': 'Block Zone', 'label': 'Block Zone'},
                {'field': 'Attack Zone', 'label': 'Attack Zone'},
                {'field': 'Speed', 'label': 'Speed', type: 'number' },
                {'field': 'Damage', 'label': 'Damage', type: 'number' },
                //{'field': 'Vitality', 'label': 'Vitality', type: 'number' },
                //{'field': 'Hand Size', 'label': 'Hand Size', type: 'number' },
                {'field': 'Resources', 'label': 'Resources'},
                {'field': 'CardText', 'label': 'CardText'},
            ]
        }
    },
    computed: {
        stateDeck() {
            return Object.values(this.$store.state.deck)
        },
        deckGroupedByTypes() {
            let myCards = this.stateDeck
            let groups = [...new Set(myCards.map(card => card.Type))]
            return groups.map(g => this.groupedRows(myCards, g))
        }
    },
    methods: {
        onRowClick(params) {
            this.$store.commit('increment', params.row)
        },
        decrementRow(params) {
            // TODO ugh this is not healthy;
            //  the table will emit a onClick for the ROW at the same time as the BUTTON
            //  so double-decrement to overcome the erroneous increment
            // possible race condition behavior if you have qty=2 and click to decrement, then both decs here
            // evaluate before the increment() of the row event does
            this.$store.commit('decrement', params.row)
            this.$store.commit('decrement', params.row)
        },
        groupedRows(cards, type) {
              return {
                mode: 'span',
                label: type,
                html: false, 
                children: cards.filter(c => c.Type == type)
            }
        },
        
        deckAsText() {
            return this.download("deck.txt", this.stateDeck.map(c => c.qty + " " + c.Name).join('\n'))
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