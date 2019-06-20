<template>
  <div id="typeNum">
    <div class='newGoods' >
      <img :src="productInfo.info.list_pic_url" alt="">
      <div class="right">
        <div class="name ellipsis">价格：{{productInfo.info.retail_price}}积分</div>
        <div class="jf">已选择：请选择规格数量</div>
      </div>
    </div>
    <div class="num">
      <div>数量</div>
      <x-number align='left' :min='1'></x-number>
    </div>
    <div class="buyBox clearfix">
      <div class="toHome fl icbox">
        <i class="iconfont icon-zhuye"></i>
      </div>
      <div class="toCollect fl icbox">
        <i class="iconfont icon-shoucang1"></i>
      </div>
      <div class="toShoppingCar fl icbox" badge="2"><!-- CartCount -->
        <i class="iconfont icon-gouwuche"></i>
        <badge v-if='CartCount' :text="CartCount.cartTotal.goodsCount">
        </badge>
      </div>
      <div class="btnBox fl clearfix">
        <div class="lijiBuy fl btn">立即购买</div>
        <div class="addShopcar fl btn">加入购物</div>
      </div>
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
          productInfo:'',
          params:{
              page:1,
              size:1000,
              brandId:'',
          },
          CartCount:'',//购物车信息
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
        // getGoodsList(params){//从居家-志趣8个分类
        //   GoodsList(params).then(res=>{
        //       if(res.errno ==0){//
        //           this.goodsList = res.data.goodsList;
        //       }
        //   })
        // },
    },
    mounted(){
        console.log('this.$route.params.id',JSON.parse(localStorage.getItem('productInfo')))
        this.productInfo = JSON.parse(localStorage.getItem('productInfo'));
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
      padding: 15px;
      .vux-cell-primary input[type='number']{
        height:26px!important;
      }
      .weui-cell{
        padding-left:0!important;
      }
    }
    .vux-number-selector{
      padding:3px 5px!important;
      height:auto!important;
      svg{
          width:18px!important;
          height:18px!important;
      }
    }
    .weui-cell:before{
      border:none!important;
    }
    .buyBox{
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      .vux-badge{
        position: absolute;
      }
      .icbox{
        width: 60px;
        height:50px;
        line-height: 50px;
        text-align: center;
        i{
          color:#666;
          font-size: 22px;
        }
      }
      .btnBox{
        width:calc(100% - 180px);
        .btn{
          width: 50%;
          height:50px;
          line-height: 50px;
          text-align: center;
          font-size: 14px;
        }
        .addShopcar{
          background-color: #b4282d;
          color: #fff;
        }
      }
    }
  }
</style>

