<template>
  <div id="index">
    <search
      class='searchBar'
      v-model="value"
      auto-fixed
      top='0'
      @on-focus="onFocus"
      placeholder='商品搜索，共254款好物'
      ref="search">
      </search>
     
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Search,AlertModule,Group,Cell, } from 'vux'
export default {
    name: 'index',
    data() {
        return {
          results: [],
          value: ''
        }
    },
    components: {
      Search,
      Group,
      Cell,
    },
    computed: {
        
    },
    methods: {
      onFocus () {
        this.$router.push({path:'/search'})
      },
      
    },
    mounted(){
      // AlertModule.show({
      //     title: 'VUX is Cool',
      //     content: 'Do you agree?',
      //     onShow () {
      //       console.log('Module: I\'m showing')
      //     },
      //     onHide () {
      //       console.log('Module: I\'m hiding now')
      //     }
      // })
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss'>
  #index{
    .weui-search-bar{
      background: transparent;
    }
    .weui-search-bar__label{
      top:5px!important;
    }
    .searchBar{
      top:0;
    }
  }

</style>

