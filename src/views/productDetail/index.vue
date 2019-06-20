<template>
  <div class="productDetail">
    <swiper :show-desc-mask='false' v-if='gallery.length>0' auto :list="gallery"  style="width:100%;margin:0 auto;" height="375px"  dots-position="center"></swiper>
    <div class="brandTitle" v-if='info'>
      <div class="jf clearfix">
        <div class="fl">
          <span class="red">{{info.info.retail_price}}</span><span class="red fb">积分</span>&nbsp;&nbsp;&nbsp;
          <span>佣金：<span class="fb">{{info.info.user_brokerage_price}}</span>积分</span>
        </div>
        <span class="fr"><i class='iconfont icon-fenxiang' style='font-size: 24px;'></i></span>
      </div>
      <div class="nameBrand">
        <div class="bname">{{info.info.name}}</div>
        <div class="bbran clearfix" v-if="info.brand">
          <div class="btitle" @click='toBrandList(info.brand)'>{{info.brand.name}}＞</div>
        </div>
      </div>
      <div class="selectNum clearfix" @click='toTypeNum(info)'>
        <span class="fl">请选择规格数量</span>
        <i class="iconfont icon-right-arrow fr"></i>
      </div>
    </div> 
    <div class="productDes" v-if='info'>
      <div class="ptitle">商品详情</div>
      <div class="picsWords" v-html="info.info.goods_desc"></div>
    </div>
    <div class="faq" v-if='info'>
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
    <div class="relate"  v-if="related.length>0">
      <divider class="ctitle">大家都在看</divider>
      <ul class="goodsList clearfix" >
        <!-- <li  v-for='(item,i) in related' :key='i' class="fl" :to="/productDetail/+item.id"> -->
        <li  v-for='(item,i) in related' :key='i' class="fl" @click="toDetail(item)">
          <img :src="item.list_pic_url" alt="">
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </li>
      </ul>
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
        <div class="lijiBuy fl btn" @click='toTypeNum(info)'>立即购买</div>
        <div class="addShopcar fl btn" @click='toTypeNum(info)'>加入购物</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Group,Swiper,Divider,Badge  } from 'vux'
import { GoodsDetail,GoodsRelated,CartGoodsCount } from '@/api/index'

export default {
    name: 'productDetail',
    data() {
        return {
          pid:'',//商品ID;
          gallery:[],//轮播图,
          info:'',//积分详情:
          related:[],//大家都在看
          CartCount:'',//购物车信息
        }
    },
    components: {
      Swiper,
      Divider,
      Badge,
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
          if(res.errno ==0){//
            this.info = res.data;
            res.data.gallery.map(x=>{
              x.url = 'javascript:';
              x.img = x.img_url;
              x.title = '';
            })
            this.gallery = res.data.gallery;
            this.$nextTick(()=>{
              $('.picsWords p img').css({width:'100%'});
            })
          }
        })
      },
      getGoodsRelated(){
        GoodsRelated({id:this.pid}).then(res=>{
          if(res.errno ==0){//
            this.related = res.data.goodsList;
          }
        })
      },
      getCartGoodsCount(){
        CartGoodsCount().then(res=>{
          if(res.errno ==0){//
            this.CartCount = res.data;
          }
        })
      },
      toDetail(item){
        this.pid = item.id;
        this.getGoodsDetail();
        this.getGoodsRelated();
        window.scrollTo(0,0);
      },
      toBrandList(item){
        localStorage.setItem('brandInfo',JSON.stringify(item))
        this.$router.push({path:'/brandList'})
      },
      toTypeNum(obj){
        localStorage.setItem('productInfo',JSON.stringify(obj));
        this.$router.push({path:'/typeNum'});
      }
    },
    mounted(){
      // console.log('id',this.$route.params.id);
      this.pid = this.$route.params.id;
      this.UPDATE_TABBAR({isTabBar:false});
      this.getGoodsDetail();
      this.getGoodsRelated();
      this.getCartGoodsCount();
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
.picsWords{
  p img{
    width: 100%!important;
  }
}
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
      font-size: 13px;
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
      .goodsList li{
        width: 50%;
        font-size: 15px;
        img{
          width: 175px;
        }
        .name,.jf{
          text-align: center;
          padding:3px 0;
        }
        .jf{
          color:#b4282d;
          font-size: 16px;
        }
      }
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

