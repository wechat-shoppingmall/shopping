<template>
  <div id="typeNum">
    <div class='newGoods' >
      <img :src="goodsList.src" alt="">
      <div class="right">
        <div class="name ellipsis">{{goodsList.price}}</div>
        <div class="jf">已选择：请选择规格数量</div>
      </div>
    </div>
    <div class="num">
      <div>数量</div>
      <x-number align='left' :min='1'></x-number>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { XNumber } from 'vux'
import { GoodsList } from '@/api/index'

export default {
    name: 'typeNum',
    data() {
        return {
            params:{
                page:1,
                size:1000,
                brandId:'',
            },
            goodsList:{
              src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/2153262481b48a.png',
              price: '60积分',
              desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
              url: '/component/cell'
            },
            specialInfo:'',
        }
    },
    components: {
      XNumber,
    },
    computed: {
        
    },
    methods: {
        ...mapMutations([
            // 'UPDATE_TABBAR'
        ]),
        getGoodsList(params){//从居家-志趣8个分类
          GoodsList(params).then(res=>{
              if(res.errno ==0){//
                  this.goodsList = res.data.goodsList;
              }
          })
        },
    },
    mounted(){
        // console.log('this.$route.params.id',JSON.parse(localStorage.getItem('specificationList')))
        // this.hotBanner = JSON.parse(localStorage.getItem('brandInfo'));
        // this.params.brandId = this.hotBanner.id;
        // this.getGoodsList(this.params);
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss'>
  #typeNum{
    // margin-bottom: 100px;
    background-color: #eee;
    .newGoods{
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color:#333;
      background: #fff;
      font-size: 14px;
      img{
        width: 72px;
        height: 72px;
      }
      .right{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 15px;
        div{
          padding: 5px 0;
        }
      }
    }
    .num{
      background-color: #fff;
    }
    .vux-number-selector{
        padding:3px 5px!important;
        height:auto!important;
        svg{
            width:18px!important;
            height:18px!important;
        }
    }
  }
</style>

