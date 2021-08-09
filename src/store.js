import Vue from 'vue'
import Vuex from 'vuex'
// import cards from '@/assets/cards.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: {},
    name2Card: {}
  },
  actions: {
    /*
    getAllCards ({ commit }) {
      for (let key in cards) { // seriously what the FUCK javascript, it's a for loop over an array, GIVE ME THE OBJECTS NOT THE INDICES
        let card = cards[key]
        commit('loadCard', card)
      }
      // This was an attempt to make the DeckLoader page work, and create a lookup table of each card. It is atrociously nonperformant, and
      // I really ought to offload this work to a tested query language handler, which is going to be the first big refactor
    }
    */
  },
  mutations: {
    increment (state, card) {
      let qtyObj = state.deck[card.Id] || { qty: 0 }
      let count = qtyObj.qty
      // TODO Red Eye Capsule needs a "limit" attr, which should be obeyed here
      count = count >= 4 ? 4 : count + 1
      Vue.set(state.deck, card.Id, {...card, qty: count})
    },
    remove(state, card) {
      Vue.delete(state.deck, card.Id)
    },
    decrement (state, card) {
      let qtyObj = state.deck[card.Id] || { qty: 1 }
      let count = qtyObj.qty - 1
      if(count > 0) {
        Vue.set(state.deck, card.Id, {...card, qty: count})
      } else {
        Vue.delete(state.deck, card.Id)
      }
    },
    // loadCard(state, card) {
    //   Vue.set(state.name2Card, card.Name, card)
    // },
    // addToDeck(state, name) {
    //   if (state.name2Card[name]) {
    //     state.commit('increment', state.name2Card[name])
    //   } else {
    //     console.log(`Unrecognized card ${name}`)
    //   }
    // }
  }
})