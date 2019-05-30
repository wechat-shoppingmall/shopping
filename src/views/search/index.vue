<template>
  <div id="index">
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      placeholder='四件套'
      ref="search"></search>
     
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
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      }
      
    },
    mounted(){
        this.$refs.search.setFocus()
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
    
  }

</style>

