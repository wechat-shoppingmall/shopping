<template>
  <div id="rank">
    <div class="hotPic">
      <img :src="hotBanner.img_url" :alt="hotBanner.name">
      <div class="info">
        <div class="txt">{{hotBanner.name}}</div>
        <div class="line"></div>
      </div>
    </div>
    <div class="sortBox clearfix">
      <div class="btn fl union" :class='checked=="btn1"?"checked":""' @click='changeCheck("btn1")'>综合</div>
      <div class="btn fl price" :class='checked=="btn2"?"checked":""' @click='sortPrice("btn2")'>
        价格
        <div class="arrow">
          <x-icon type="ios-arrow-up" :class="[isAesc && checked === 'btn2'?'fillColor':'']" size="10"></x-icon>
          <x-icon type="ios-arrow-down" :class="[!isAesc && checked === 'btn2'?'fillColor':'']" size="10"></x-icon>
        </div>
      </div>
      <div class="btn fl classify" :class='checked=="btn3"?"checked":""' @click='openClass("btn3")'>分类</div>
      <div class="classifyBox" v-if='isOpen'>
        <div class="tnt" :class="x.id==params.categoryId?'activeTnt':''" v-for='(x,i) in classifys' :key='i' @click='sortClass(x,i)'>{{x.name}}</div>
      </div>
    </div>
    <div class='newGoods'>
      <ul class="goodsList clearfix" v-if="goodsList.length>0">
        <li v-for='(item,i) in goodsList' :key='i' class="fl">
          <img :src="item.list_pic_url" alt="">
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Search,AlertModule,Group,Cell,Swiper,SwiperItem,XButton } from 'vux'
import { GoodsHot,GoodsList } from '@/api/index'

export default {
    name: 'rank',
    data() {
        return {
            hotBanner:'',
            params:{
                page:1,
                size:1000,
                order:'desc',
                sort:'default',
                categoryId:0
            },
            goodsList:[],
            checked:'btn1',
            isAesc:true,
            classifys:[],//分类按钮
            isOpen:false,//分类按钮盒子打开与否
            activeTnt:-1,//分类列表按钮点亮
        }
    },
    components: {
      Search,
      Group,
      Cell,
      Swiper,
      SwiperItem,
      XButton,
    },
    computed: {
        
    },
    methods: {
        ...mapMutations([
            'UPDATE_TABBAR'
        ]),
        getGoodsHot(){//从居家-志趣8个分类
            GoodsHot().then(res=>{
                if(res.errno ==0){//
                    this.hotBanner = res.data.bannerInfo;
                }
            })
        },
        getGoodsList(params=this.params){//从居家-志趣8个分类
          GoodsList(params).then(res=>{
              if(res.errno ==0){//
                  this.goodsList = res.data.goodsList;
                  this.classifys = res.data.filterCategory;
                  this.isOpen = false;
              }
          })
        },
        changeCheck:Util.debounce(function(btn){
          this.activeTnt = -1;
          this.checked = btn;
          this.isOpen = false;
          this.params = {
            page:1,
            size:1000,
            order:'desc',
            sort:'default',
            categoryId:''
          }
          
          this.params[this.$route.params.id] =1;
          this.getGoodsList(params);
        },200),
        sortPrice:Util.debounce(function(btn){
          this.activeTnt = -1;
          this.isOpen = false;
          this.checked = btn;
          this.isAesc = !this.isAesc;
          this.params.order = this.isAesc?'asc':'desc';
          this.params.sort = 'price';
          this.params[this.$route.params.id] =1;
          this.getGoodsList(this.params);
        },200),
        openClass(btn){
          this.checked = btn;
          this.isOpen = !this.isOpen;
        },
        sortClass(obj,i){
          // console.log('obj',obj,i);
          this.activeTnt = i;
          this.params.categoryId = obj.id;
          let params = {
            page:1,
            size:1000,
            order:'asc',
            sort:'category',
            categoryId:obj.id
          }
          params[this.$route.params.id] =1;
          this.getGoodsList(params);
        }
    },
    mounted(){
        this.UPDATE_TABBAR({isTabBar:false})
        this.params[this.$route.params.id] =1;
        this.getGoodsHot();
        this.getGoodsList(this.params);
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  #rank{
    // margin-bottom: 100px;
    background-color: #eee;
    .hotPic{
        position: relative;
        .info{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .txt{
                color: #fff;
                font-size: 16px;
            }
            .line{
                height: 1px;
                margin: 8px auto;
                background: #fff;
                width: 50%;
            }
        }
    }
    .jf{
      color:#b4282d;
      font-size: 18px;
      padding: 10px 0;
    }
    .fillColor{
      fill: #b4282d;
    }
    .sortBox{
      margin-bottom: 10px;
      position: relative;
      .checked{
        color:#b4282d;
      }
      .btn{
        height: 40px;
        width: 33.333%;
        text-align: center;
        line-height: 40px;
        background: #fff;
      }
      .price{
        display: flex;
        justify-content: center;
      }
      .arrow{
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .classifyBox{
      position: absolute;
        top: 40px;
      padding: 10px;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      border-top: 1px solid #e0e0e0;
      .tnt{
        padding: 6px 9px;
        border: 1px solid #7f7f7f;
        display: inline-block;
        margin: 10px;
        color: #7f7f7f;
      }
      .activeTnt{
        color:#b4282d;
        border: 1px solid #b4282d;
      }
    }
    .newGoods{
    //   margin-bottom: 10px;
      color:#333;
      .goodsList li{
        width: 50%;
        font-size: 15px;
        background: #fff;
        padding:10px;
        img{
          width: 175px;
        }
        
      }
    }
    
  }

</style>

