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
        let count = state.deck[card.id] || 0
        Vue.set(state.deck, card.Name, {...card, qty: count + 1})
    },
    decrement (state, card) {
        let count = state.deck[card.id]
        if(count) {
          Vue.set(state.deck, card.Name, {...card, qty: count - 1})
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
