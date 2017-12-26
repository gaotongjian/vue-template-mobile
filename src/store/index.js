import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tab: 'home',
  tabPath: {}
}
const actions = {}
const mutations = {
  changeTab (state, tab) {
    state.tab = tab
  },
  changeTabPath (state, obj) {
    Object.assign(state.tabPath, obj)
  }
}
const getters = {
  tab: state => state.tab,
  tabPath: state => state.tabPath
}

export default new Vuex.Store({
  // modules: {},
  state,
  getters,
  actions,
  mutations
})
