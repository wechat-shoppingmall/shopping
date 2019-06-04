import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ()=>{
  return new Vuex.Store({
    state: {
      direction: 'reverse',
      isTabBar:true
    },
    getters: {
      direction: state => state.direction,
      isTabBar: state => state.isTabBar,
    },
    mutations: {
      UPDATE_DIRECTION(state, data) {
        state.direction = data.direction;
      },
      UPDATE_TABBAR(state, data) {
        state.isTabBar = data.isTabBar;
      },
      
    },
    actions: {

    }
  })

} 