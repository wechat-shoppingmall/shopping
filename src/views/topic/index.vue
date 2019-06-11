<template>
  <div class="topic">
    <swiper :show-desc-mask='false' v-if='bannerList.length>0' auto :list="bannerList"  style="width:100%;margin:0 auto;" height="4.79rem"  dots-position="center"></swiper>
    <div class='newGoods'>
      <div class="topT">
        <div class="goodsTitle">活动精选</div>
        <!-- <x-button mini plain link="/rank/isNew">更多</x-button> -->
      </div>
      <ul class="goodsList clearfix" v-if="top3.length>0" >
        <router-link tag="li" v-for='(item,i) in top3' :key='i' class="fl" :to="/topicDetail/+item.id">
          <img :src="item.scene_pic_url" alt="">
        </router-link>
      </ul>
    </div>
    <div class='topicList'>
      <ul class="goodsList clearfix" v-if="topicList.length>0" >
        <router-link tag="li" v-for='(item,i) in topicList' :key='i' class="fl" :to="/topicDetail/+item.id">
          <img :src="item.scene_pic_url" alt="">
          <div class="title">{{item.title}}</div>
          <div class="subtitle">{{item.subtitle}}</div>
          <div class="price_info">参加活动可获得{{item.price_info}}积分</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { AlertModule,Group,Cell,Swiper,SwiperItem,XButton } from 'vux'
import { TopicList,indexBanner,IndexUrlTopic } from '@/api/index'

export default {
    name: 'topic',
    data() {
        return {
          bannerList:[],
          top3:[],
          topicList:[],
          params:{
            page:1,
            size:10,
          }
        }
    },
    components: {
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
      getTopicList(){
        TopicList(this.params).then(res=>{
          if(res.errno ==0){
            this.topicList = res.data.data;
          }
        })
      },
      getIndexUrlTopic(){
        IndexUrlTopic().then(res=>{
          if(res.errno ==0){
            this.top3 = res.data.topicList;
          }
        })
      },
    },
    mounted(){
      // console.log('isTabBar',this.isTabBar);
      this.UPDATE_TABBAR({isTabBar:true});
      this.getBanner();
      this.getIndexUrlTopic();
      this.getTopicList();
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  .topic{
    margin-bottom:54px;
    background-color: #eee;
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
          height:100%;
        }
        &:nth-child(1){
            height:196px;
        }
        &:nth-child(2){
            height:95px;
            margin-bottom:6px;
        }
        &:nth-child(3){
            height:95px;
        }
      }
    }
    .topicList{
        li{
            width:100%;
            text-align: center;
            background: #fff;
            margin-bottom: 10px;
            img{
                width:100%;
            }
            .title{
                overflow: hidden;
                color:#333;
                margin: 10px;
                font-size: 16px;
            }
            .subtitle{
                overflow: hidden;
                color:#999;
                font-size: 12px;
                margin: 10px;
            }
            .price_info{
                overflow: hidden;
                color:#b4282d;
                font-size: 14px;
                margin: 10px;
            }
        }
    }
  }

</style>

