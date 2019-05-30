import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ()=>{
  return new Vuex.Store({
    state: {
      direction: 'reverse'
    },
    getters: {
      direction: state => state.direction,
    },
    mutations: {
      UPDATE_DIRECTION(state, data) {
        state.direction = data.direction;
      },
      
    },
    actions: {

    }
  })

} 