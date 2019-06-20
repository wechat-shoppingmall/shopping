<template>
  <div class="my">
    <div class="headPic">
        <flexbox>
            <flexbox-item :span="3">
                <div class="flex-demo">
                    <img src="../../assets/images/icon_xz.png" alt="">
                </div>
            </flexbox-item>
            <flexbox-item :span="6"><div class="flex-demo">Try my best</div></flexbox-item>
            <flexbox-item ><div class="flex-demo jf"><span style='font-size:17px;'>0</span>积分</div></flexbox-item>
        </flexbox>
    </div>
    <div class='commission'><!-- 佣金 -->
        <div class="jf">0积分</div>
        <div class="yongjin">总分销佣金</div>
    </div>
    <div class="myTopic">
      <div class="title clearfix">
        <div class="left fl">我的公益</div>
        <router-link tag='div' class="right fr" to='/myTopic/0'>查看全部公益活动<i class="iconfont icon-right-arrow"></i></router-link>
      </div>
      <div class="topArea clearfix">
        <router-link tag='div' class="hasApply fl" to='/myTopic/1'>
          <i class="iconfont icon-yibaoming"></i>
          <span>已报名</span>
        </router-link>
        <router-link tag='div' class="hasSign fl" to='/myTopic/2'>
          <i class="iconfont icon-qiandao"></i>
          <span>已签到</span>
        </router-link>
        <router-link tag='div' class="hasComplete fl" to='/myTopic/3'>
          <i class="iconfont icon-wancheng"></i>
          <span>已完成</span>
        </router-link>
      </div>
    </div>
    <div class="myTopic">
      <div class="title clearfix">
        <div class="left fl">我的订单</div>
        <router-link tag='div' class="right fr" to='/myOrder/0'>查看全部订单<i class="iconfont icon-right-arrow"></i></router-link>
      </div>
      <div class="topArea clearfix">
        <router-link tag='div' class="hasApply fl red" to='/myOrder/1'>
          <i class="iconfont icon-daishouhuo"></i>
          <span>待收货</span>
        </router-link>
        <router-link tag='div' class="hasSign fl red" to='/refund'>
          <i class="iconfont icon-tuikuan"></i>
          <span>退货/退款</span>
        </router-link>
      </div>
    </div>
    <div class="myTopic">
      <div class="title clearfix">
        <div class="left fl">我的服务</div>
      </div>
      <div class="topArea clearfix">
        <router-link tag='div' class="hasApply fl" to='/cart'>
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </router-link>
        <div class="hasSign fl">
          <i class="iconfont icon-yaoqinghaoyou"></i>
          <span>邀请好友</span>
        </div>
        <div class="hasSign fl">
          <i class="iconfont icon-tuijianshangpin"></i>
          <span>推荐商品</span>
        </div>
        <router-link tag='div' class="hasSign fl" to='/collect'>
          <i class="iconfont icon-shoucang1"></i>
          <span>我的收藏</span>
        </router-link>
        <router-link tag='div' class="hasSign fl" to='/footPrint'>
          <i class="iconfont icon-wodezuji1"></i>
          <span>我的足迹</span>
        </router-link>
        <router-link tag='div' class="hasSign fl" to='/feedback'>
          <i class="iconfont icon-yijianfankui"></i>
          <span>意见反馈</span>
        </router-link>
        <router-link tag='div' class="hasSign fl" to='/address'>
          <i class="iconfont icon-dizhiguanli"></i>
          <span>地址管理</span>
        </router-link>
        <div class="hasSign fl">
          <i class="iconfont icon-wodefensi"></i>
          <span>我的粉丝</span>
        </div>
        <div class="hasSign fl">
          <i class="iconfont icon-liaotian"></i>
          <span>联系客服</span>
        </div>
      </div>
    </div>
    <div class="logout">退出登录</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Flexbox, FlexboxItem,XButton } from 'vux'
import { TopicList,indexBanner,IndexUrlTopic } from '@/api/index'

export default {
    name: 'my',
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
      Flexbox,
      FlexboxItem,
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
    //   this.getBanner();
    //   this.getIndexUrlTopic();
    //   this.getTopicList();
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  .my{
    margin-bottom:54px;
    background-color: #eee;
    .jf{
        color:#b4282d;
        font-size: 14px;
        font-weight: normal;
    }
    .headPic{
        background:#fff;
        color:#333;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        .vux-flexbox{
            padding: 18px 0;
        }
        img{
            width: 80px;
        }
    }
    .commission{
        background:#fff;
        padding: 20px 0 20px 40px;
        margin-bottom: 10px;
        &>div{
            padding: 2px;
        }
        .yongjin{
            color:#999;
        }
    }
    .myTopic{
      background:#fff;
      margin-bottom: 10px;
      .title{
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
          font-size: 16px;
          border-bottom: 1px solid #f4f4f4;
          .right i{
            font-size: 24px;
            vertical-align: middle;
          }
      }
      .topArea>div{
        width: 93px;
        height: 93px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #333;
        i{
          font-size: 25px;
          margin-bottom: 5px;
        }
      }
    }
    .red{
      color:#b4282d!important;
      i{
        font-size: 30px!important;
      }
    }
    .logout{
      text-align: center;
      background: #fff;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color:#333;
    }
  }

</style>

