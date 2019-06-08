<template>
  <div class="productDetail">
    <swiper :show-desc-mask='false' v-if='gallery.length>0' auto :list="gallery"  style="width:100%;margin:0 auto;" height="375px"  dots-position="center"></swiper>
    <div class="brandTitle">
      <div class="jf clearfix">
        <div class="fl">
          <span class="red">{{info.info.retail_price}}</span><span class="red fb">积分</span>&nbsp;&nbsp;&nbsp;
          <span>佣金：<span class="fb">{{info.info.user_brokerage_price}}</span>积分</span>
        </div>
        <span class="fr"><i class='iconfont icon-fenxiang' style='font-size: 24px;'></i></span>
      </div>
      <div class="nameBrand">
        <div class="bname">{{info.info.name}}</div>
        <div class="bbran clearfix">
          <div class="btitle">{{info.brand.name}}＞</div>
        </div>
      </div>
      <div class="selectNum clearfix">
        <span class="fl">请选择规格数量</span>
        <i class="iconfont icon-right-arrow fr"></i>
      </div>
    </div> 
    <div class="productDes">
      <div class="ptitle">商品详情</div>
      <div class="picsWords" v-html="info.info.goods_desc">
      </div>
    </div>
    <div class="faq">
      <divider class="ctitle">常见问题</divider>
      <div class="qaa">
        <ul>
          <li v-for="(x,i) in info.issue" :key="i">
            <div class="question">
              <div class="dot"></div>
              {{x.question}}
            </div>
            <div class="answer">{{x.answer}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="relate">
      <divider class="ctitle">大家都在看</divider>
    </div>
    <div class="buyBox clearfix">
      <div class="toHome fl icbox">
        <i class="iconfont icon-home"></i>
      </div>
      <div class="toCollect fl icbox">
        <i class="iconfont icon-shoucang"></i>
      </div>
      <div class="toShoppingCar fl icbox">
        <i class="iconfont icon-gouwuchekong"></i>
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
import { AlertModule,Group,Cell,Swiper,Divider, } from 'vux'
import { GoodsDetail, } from '@/api/index'

export default {
    name: 'productDetail',
    data() {
        return {
          pid:'',//商品ID;
          gallery:[],//轮播图,
          info:'',//积分详情
        }
    },
    components: {
      Group,
      Cell,
      Swiper,
      Divider,
    },
    computed: {
      ...mapGetters([
        'isTabBar'
      ])
    },
    methods: {
      ...mapMutations([
        'UPDATE_TABBAR'
      ]),
      getGoodsDetail(){
        GoodsDetail({id:this.pid}).then(res=>{
          // console.log('res',res);
          this.info = res.data;
          if(res.errno ==0){//
            res.data.gallery.map(x=>{
              x.url = 'javascript:';
              x.img = x.img_url;
              x.title = '';
            })
            this.gallery = res.data.gallery;
          }
        })
      },
    },
    mounted(){
      console.log('id',this.$route.params.id);
      this.pid = this.$route.params.id;
      this.UPDATE_TABBAR({isTabBar:false});
      this.getGoodsDetail();
      // this.getTotalCount();
      // this.getIndexUrlNewGoods();
      // this.getIndexUrlHotGoods();
      // this.getIndexUrlCategory();
      // console.log('fech',fechApi);
      
      
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  .productDetail{
    background:#f4f4f4;
    margin-bottom: 50px;
    .brandTitle{
      background:#fff;
      margin-bottom:10px;
      .jf{
        padding: 10px;
        font-size: 16px;
        color: #E96900;
        border-bottom:1px solid #f4f4f4;
        .red{
          color: #b4282d;
          font-weight: bold;
        }
        .fb{
          font-size: 20px;
        }
      }
      .nameBrand{
        padding: 10px;
        border-bottom:1px solid #f4f4f4;
        .bname{
          color: #333;
          font-size: 15px;
          font-weight: bold;
          line-height: 20px;
        }
        .bbran{
          padding-top: 10px;
          .btitle{
            border-radius: 4px ;
            color:#f48f18;
            float: left;
            border:1px solid #f48f18;
            padding: 4px 6px;
          }
        }
      }
      .selectNum{
        font-size: 14px;
        padding: 10px 15px;
        line-height: 32px;
        border-bottom: 1px solid #f4f4f4;
        i{
          font-size: 30px;
        }
      }
    }
    .productDes{
      background: #fff;
      font-size: 16px;
      padding: 15px;
      .ptitle{
        margin-bottom: 10px;
      }
    }
    .faq{
      background: #fff;
      .qaa{
        padding: 0 15px;
      }
      li{
        .question{
          color:#303030;
          padding: 10px 0px;
        }
        .answer{
          color:#787878;
          padding-left: 6px;
        }
        .dot{
          height:5px;
          width:5px;
          background:#b4282d;
          border-radius:50%;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .relate{
      background-color: #fff;
      .ctitle{
        padding: 30px;
      }
    }
    .buyBox{
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
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

