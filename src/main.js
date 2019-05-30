import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import "babel-polyfill";
import 'normalize.css' // A modern alternative to CSS resets
import './style/global.scss' // A modern alternative to CSS resets
import animate from 'animate.css'
import Util from './util/util'
import { mapMutations, mapGetters } from 'vuex';
import ToccMap from './components/map'
Vue.use(ToccMap)

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
Vue.directive('posInt', function(el){//自定义输入框只能输入非0整数
  var input = el;
  input.onkeyup = function (e) {
    if (e.target.value.length == 1) {
      e.target.value = e.target.value.replace(/[^1-9]/g, '');
    } else {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    }
  };
});

// Vue.mixin({
  // computed: {
  //   ...mapGetters([
  //     'mapComponent'
  //   ])
  // },
  // methods: {
  //   ...mapMutations([
  //     'destroydMap'
  //   ])
  // },
  // mounted() {
  //   console.log('this.mapComponent', this.mapComponent)
  // },
  // beforeDestroy() {
  //   this.mapComponent.destroy()
  //   this.destroydMap();
  //   console.log('map', this.mapComponent)
  // },
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')