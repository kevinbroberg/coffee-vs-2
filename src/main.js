import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deck: {}
  },
  mutations: {
    increment (state, card) {
        let qtyObj = state.deck[card.Id] || {qty:0}
        let count = qtyObj.qty
        count = count >= 4 ? 4 : count + 1
        Vue.set(state.deck, card.Id, {...card, qty: count})
    },
    remove(state, card) {
      Vue.delete(state.deck, card.Id)
    },
    decrement (state, card) {
      let qtyObj = state.deck[card.Id] || {qty: 1}
      let count = qtyObj.qty - 1
      if(count > 0) {
        Vue.set(state.deck, card.Id, {...card, qty: count})
      } else {
        Vue.delete(state.deck, card.Id)
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
