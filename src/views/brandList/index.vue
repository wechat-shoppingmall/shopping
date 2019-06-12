<template>
  <div class="brandList">
    <div class="hotPic">
      <img :src="hotBanner.list_pic_url" :alt="hotBanner.name">
      <div class="info">
        <div class="txt">{{hotBanner.name}}</div>
        <div class="line"></div>
      </div>
    </div>
    <div class="brandTxt">
        {{hotBanner.simple_desc}}
    </div>
    <div class='newGoods'>
      <ul class="goodsList clearfix" v-if="goodsList.length>0">
        <router-link tag='li' v-for='(item,i) in goodsList' :key='i' class="fl" :to='/productDetail/+item.id'>
          <img :src="item.list_pic_url" alt="">
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Search,AlertModule,Group,Cell,Swiper,SwiperItem,XButton } from 'vux'
import { GoodsList } from '@/api/index'

export default {
    name: 'brandList',
    data() {
        return {
            hotBanner:'',
            params:{
                page:1,
                size:1000,
                brandId:'',
            },
            goodsList:[],
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
        getGoodsList(params){//从居家-志趣8个分类
          GoodsList(params).then(res=>{
              if(res.errno ==0){//
                  this.goodsList = res.data.goodsList;
              }
          })
        },
    },
    mounted(){
        this.UPDATE_TABBAR({isTabBar:false})
        // console.log('this.$route.params.id',this.$route.query.brandInfo)
        this.hotBanner = JSON.parse(localStorage.getItem('brandInfo'));
        this.params.brandId = this.hotBanner.id;
        this.getGoodsList(this.params);
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  .brandList{
    // margin-bottom: 100px;
    background-color: #eee;
    .hotPic{
        position: relative;
        img{
            height: 145px;
            width: 100%;
        }
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
    .brandTxt{
        font-size: 16px;
        padding: 15px;
        color: #666;
        background: #fff;
        margin-bottom: 10px;
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

