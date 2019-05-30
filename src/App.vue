<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    <!-- <loading ></loading> -->
    
  </div>
</template>

<script>
import {mapState, mapGetters ,mapMutations} from 'vuex'
import loading from '@components/loading/index.vue'
export default {
  name: 'app',
  components: {
    loading,
  },
  data(){
    return{
      history:''
    }
  },
  computed:{
    ...mapGetters([
      'direction'
    ])
  },
  watch:{
   $route(to,from){
    const toIndex = this.history.getItem(to.path);
    const fromIndex = this.history.getItem(from.path);

    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        this.UPDATE_DIRECTION({
          direction: 'forward'
        })
      } else {
        this.UPDATE_DIRECTION({
          direction: 'reverse'
        })
      }
    } else {
      ++this.historyCount;
      this.history.setItem('count', this.historyCount);
      to.path !== '/' && this.history.setItem(to.path, this.historyCount);
      this.UPDATE_DIRECTION({
        direction: 'forward'
      })
    }
    // next()
    //  this.$nextTick(() => {
    //    var loadObjBK = document.getElementById('loadingWave'),
    //      startNum = 100;
    //    loadObjBK.style.display = 'block';
    //    loadObjBK.style.opacity = 1;
    //    var timerBk = setInterval(function () {
    //      if (startNum > 0) {
    //        var cutNum = parseInt(Math.random() * 18) + 1;
    //        startNum = startNum - cutNum;
    //        loadObjBK.style.opacity = startNum / 100;
    //      } else {
    //        clearInterval(timerBk);
    //        loadObjBK.style.display = 'none';
    //      }
    //    }, 30);
    //  })
   }
  },
  methods: {
    ...mapMutations([
      'UPDATE_DIRECTION'
    ])
  },
  mounted(){
    this.history = window.sessionStorage;
    this.history.clear()
    this.historyCount = this.history.getItem('count') * 1 || 0;
    this.history.setItem('/', 0);
  }
}
</script>

<style>
html,body{
  height:100%;
}

#app {
  height: 100%;
  width: 100%;
  z-index: 1;
}
.vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all .45s;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
