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
      <ul class="goodsList clearfix" v-if="newGoodsList.length>0" >
        <router-link tag="li" v-for='(item,i) in newGoodsList' :key='i' class="fl" :to="/productDetail/+item.id">
          <img :src="item.list_pic_url" alt="" v-if='item.list_pic_url'>
          <img src="../../assets/images/timg.jpg" alt="" v-if='!item.list_pic_url'>
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </router-link>
      </ul>
    </div>
    <div class='recommend'><!-- 人气推荐 -->
      <div class="topT">
        <div class="goodsTitle">人气推荐</div>
        <x-button mini plain link="/rank/isHot">更多</x-button>
      </div>
      <ul class="goodsList" v-if="hotGoodsList.length>0">
        <router-link tag="li" v-for='(item,i) in hotGoodsList' :key='i' class='clearfix' :to="/productDetail/+item.id">
          <img :src="item.list_pic_url" alt="" class="fl">
          <div class="rP fl" >
            <div class="name ellipsis">{{item.name}}</div>
            <div class="brief ellipsis">{{item.goods_brief}}</div>
            <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
          </div>
        </router-link>
      </ul>
    </div>
    <div class='newGoods' v-for='(x,index) in categoryList' :key='index' v-if="categoryList.length>0">
      <div class="topT">
        <div class="goodsTitle">{{x.name}}</div>
        <x-button mini plain :link="/category/+x.id">更多</x-button>
      </div>
      <ul class="goodsList clearfix">
        <router-link tag="li" v-for='(item,i) in x.goodsList' :key='i' class="fl" :to="/productDetail/+item.id">
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
import { indexBanner,GoodsCount,IndexUrlNewGoods,IndexUrlHotGoods,IndexUrlCategory,getSignature,getOpenId } from '@/api/index'

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
      getUrlParam(code) {
        //获取url 参数
        console.log("getUrlParam start...");
        var reg = new RegExp("(^|&)" + code + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },
      getCodeApi() {
        var local = window.location.href;
        console.log("local-->"+local);
        if(local.indexOf("com") != -1){
          //获取code
          console.log("getCodeApi start...");
          // const appid = "wx2baee88974266ac0"; 
          const code = this.getUrlParam("code");
          console.log(code);
          //  local = 'https://www.zizuzf.com/api/wechat/getopenid?currurl=steward';
          if (code == null || code == "") {
            var appid = "";
            let params={
                jsURL:local
                // .split("#")[0]
            }
            getSignature(params).then(res => {
              if(res.code == 0){
                appid = res.data.appId;
                console.log("appid-->"+appid);
                localStorage.access_token=res.data.access_token
                let url =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                appid +
                "&redirect_uri=" +
                encodeURIComponent(local) +
                "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
                console.log("url-->"+url);  
                window.location.href = url;
              }else{
                console.log(res.msg)
              }
            })
            .catch(res => {
              console.log(res);
            });
            console.log(appid,165)
            console.log("local-->"+local);
            
          } else {
            console.log("getOpenIdApi start..."+code);
            // localStorage.access_token=res.data.access_token
            getOpenId(code).then(res => {
              console.log(res);
              if(res.code == 0){
                localStorage.setItem("gzh_token", res.data.openid);
              }else{
                console.log(res.msg)
              }
            })
            .catch(res => {
              console.log(res);
            });
          }
        }else{
          localStorage.setItem("openId", "openid");
        }
      },        
      // toDetail(id){
      //   this.$route.push({path:})
      // }
    },
    mounted(){
      // console.log('isTabBar',this.isTabBar);
      this.UPDATE_TABBAR({isTabBar:true});
      this.getBanner();
      this.getTotalCount();
      this.getIndexUrlNewGoods();
      this.getIndexUrlHotGoods();
      this.getIndexUrlCategory();
      this.getCodeApi()
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
      // top:5px!important;
      line-height: 20px!important;
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
          height: 175px;
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

