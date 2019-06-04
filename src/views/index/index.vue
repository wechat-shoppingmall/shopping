<template>
  <div id="index">
    <search
      class='searchBar'
      v-model="value"
      auto-fixed
      top='0'
      @on-focus="onFocus"
      :placeholder='totalCount'
      ref="search">
      </search>
    <swiper :show-desc-mask='false' v-if='bannerList.length>0' auto :list="bannerList"  style="width:100%;margin:0 auto;" height="4.79rem"  dots-position="center"></swiper>
    <div class='newGoods'>
      <div class="topT">
        <div class="goodsTitle">新品首发</div>
        <x-button mini plain link="/rank/isNew">更多</x-button>
      </div>
      <ul class="goodsList clearfix" v-if="newGoodsList.length>0">
        <li v-for='(item,i) in newGoodsList' :key='i' class="fl">
          <img :src="item.list_pic_url" alt="">
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </li>
      </ul>
    </div>
    <div class='recommend'><!-- 人气推荐 -->
      <div class="topT">
        <div class="goodsTitle">人气推荐</div>
        <x-button mini plain link="/rank/isHot">更多</x-button>
      </div>
      <ul class="goodsList" v-if="hotGoodsList.length>0">
        <li v-for='(item,i) in hotGoodsList' :key='i' class='clearfix'>
          <img :src="item.list_pic_url" alt="" class="fl">
          <div class="rP fl" >
            <div class="name ellipsis">{{item.name}}</div>
            <div class="brief ellipsis">{{item.goods_brief}}</div>
            <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
          </div>
        </li>
      </ul>
    </div>
    <div class='newGoods' v-for='(x,index) in categoryList' :key='index' v-if="categoryList.length>0">
      <div class="topT">
        <div class="goodsTitle">{{x.name}}</div>
        <x-button mini plain :link="/category/+x.id">更多</x-button>
      </div>
      <ul class="goodsList clearfix">
        <li v-for='(item,i) in x.goodsList' :key='i' class="fl">
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
import { indexBanner,GoodsCount,IndexUrlNewGoods,IndexUrlHotGoods,IndexUrlCategory, } from '@/api/index'

export default {
    name: 'index',
    data() {
        return {
          results: [],
          value: '',
          bannerList:[],
          totalCount:'',
          newGoodsList:[],
          hotGoodsList:[],
          categoryList:[],
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
        ...mapGetters([
          'isTabBar'
        ])
    },
    methods: {
      ...mapMutations([
        'UPDATE_TABBAR'
      ]),
      onFocus () {
        this.$router.push({path:'/search'})
      },
      getBanner(){
        indexBanner().then(res=>{
          // console.log('res',res);
          if(res.errno ==0){
            res.data.banner.map(x=>{
              x.url = 'javascript:';
              x.img = x.image_url;
              x.title = '';
            })
            this.bannerList = res.data.banner;
          }
        })
      },
      getTotalCount(){
        GoodsCount().then(res=>{
          // console.log('res',res);
          if(res.errno ==0){//
            this.totalCount = `商品搜索，共${res.data.goodsCount}款好物`;
          }
        })
      },
      getIndexUrlNewGoods(){//新品首发
        IndexUrlNewGoods().then(res=>{
          // console.log('res',res);
          if(res.errno ==0){//
          // console.log('res',res);
            this.newGoodsList = res.data.newGoodsList;
          }
        })
      },
      getIndexUrlHotGoods(){//人气推荐
        IndexUrlHotGoods().then(res=>{
          // console.log('res',res);
          if(res.errno ==0){//
          // console.log('res',res);
            this.hotGoodsList = res.data.hotGoodsList;
          }
        })
      },
      getIndexUrlCategory(){//从居家-志趣8个分类
        IndexUrlCategory().then(res=>{
          if(res.errno ==0){//
            this.categoryList = res.data.categoryList;
          }
        })
      },
    },
    mounted(){
      // console.log('isTabBar',this.isTabBar);
      this.UPDATE_TABBAR({isTabBar:true});
      this.getBanner();
      this.getTotalCount();
      this.getIndexUrlNewGoods();
      this.getIndexUrlHotGoods();
      this.getIndexUrlCategory();
      // console.log('fech',fechApi);
      
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
<style lang='scss' scoped>
  #index{
    margin-bottom: 100px;
    background-color: #eee;
    .weui-search-bar{
      background: transparent;
    }
    .weui-search-bar__label{
      top:5px!important;
    }
    .searchBar{
      top:0;
    }
    .topT{
      display:flex;
      flex-flow:row nowrap;
      align-items:center;
      justify-content:space-between;
      height: 1.6rem;
      line-height:1.6rem;
      .goodsTitle{
        display:inline-block;
        font-size:15px;
        color:#1a1a1a;
      }
      button{
        margin: 0;
        border-radius: 20px;
        padding: 0px 12px;
        font-size: 12px;
      }
    }
    .jf{
      color:#b4282d;
      font-size: 18px;
      padding: 10px 0;
    }
    .newGoods{
      padding: 0 10px 30px;
      background: #fff;
      margin-bottom: 10px;
      color:#333;
      .goodsList li{
        width: 50%;
        font-size: 15px;
        img{
          width: 175px;
        }
        
      }
    }
    .recommend{
      padding: 0 10px 30px;
      background: #fff;
      color:#333;
      li{
        img{
          width: 120px;
        }
        .rP{
          width:calc(100% - 120px);
          .name{
            font-size: 15px;
            padding: 8px 0;
          }
          .brief{
            color:#999;
            padding: 0 0 15px 0;
          }
        }
      }
    }
  }

</style>

