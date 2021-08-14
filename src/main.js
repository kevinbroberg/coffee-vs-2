import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() { 
    // this.$store.dispatch('getAllCards') // this was an idea to load the cards into Vuex, which was bad
                                           // but it's a good idea to load into some better store than json
    // this.$store.dispatch('loadSavedDecks') // load previous decks from local storage
  }
}).$mount('#app')
