import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: {}
  },
  actions: {
  },
  mutations: {
    // TODO ? externalize storing card data, deck => list of (qty, ID) tuples. Maybe a good excuse to learn Typescript
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
    setQty (state, card, qty) {
      // TODO Red Eye Capsule needs a "limit" attr, which should be obeyed here
      qty = qty > 4 ? 4 : qty;
      qty = qty < 0 ? 0 : qty;
      Vue.set(state.deck, card.Id, {...card.Id, qty: qty })
    }
  }
})