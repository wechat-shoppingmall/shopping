<template>
  <div class="search">
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      placeholder='四件套'
      ref="search"></search>
      <div class="historySearch bgc">
        <div class="title clearfix">
          <div class="tk fl">历史记录</div>
          <i class="iconfont icon-delete fr"></i>
        </div>
        <div class="keyWords clearfix">
          <ul>
            <li>阿道夫</li>
          </ul>
        </div>
      </div>
      <div class="hotSearch bgc clearfix">
        <div class="title">热门搜索</div>
        <div class="keyWords">
          <ul>
            <li>阿道夫</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Search,AlertModule,Group,Cell, } from 'vux'
import { SearchIndex, } from '@/api/index'
export default {
    name: 'search',
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
      ...mapMutations([
          'UPDATE_TABBAR'
      ]),
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
      },
      initSearch(){
        SearchIndex().then(res=>{
          console.log('res',res);
          
        })
      }
    },
    mounted(){
      this.initSearch();
      this.UPDATE_TABBAR({isTabBar:false})
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
  .search{
    padding-top: 44px;
    min-height:100%;
    background: #f4f4f4;
    .weui-search-bar{
      background: transparent;
    }
    .weui-search-bar__label{
      top:5px!important;
    }
    .title{
      
      color:#333;
      font-size: 13px;
    }
    .keyWords{
      color:#333;
      padding: 15px 0;
    }
    .bgc{
      background: #fff;
      padding: 15px;
    }
    .historySearch{
      margin-bottom: 10px;
    }
    ul{
      li{
        float: left;
        padding: 5px 8px;
        border: 1px solid #999;
      }
    }
  }

</style>

