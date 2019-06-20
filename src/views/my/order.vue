<template>
  <div class='myOrder'>
    <tab :line-width=2 active-color='#b4282d' v-model="area">
      <tab-item class="vux-center" :selected="demo2 === index" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="area" height='100%' :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <template v-if='area===0'>
          <div class="tab-swiper vux-center" v-for='x in list' :key='x.index' v-if='list.length>0'>
            <div class="htitle">
              <span>活动信息</span>
              <span>已报名</span>
            </div>
            <div class="content">
              <img :src="x.src" alt="">
              <div class="right">{{x.title}}</div>
            </div>
          </div>
          <div v-if='list.length===0' class='noList'>
            <i class="iconfont icon-wushuju"></i>
            <div>无订单数据</div>
          </div>
        </template>
        <template v-if='area===1'>
          待收货
        </template>
        <template v-if='area===2'>
          已完成
        </template>
        <template v-if='area===3'>
          已取消
        </template>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { Tab, TabItem,Swiper,SwiperItem,Panel   } from 'vux'
export default {
    name: 'myOrder',
    data () {
      return {
        list: [{
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/2153262481b48a.png',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/2230003573eb49.jpg',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          }
        }, {
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/22365163598c6f.png',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          }
        }],
        area: 0,
        demo2: '',
        list2:[
            '全部',
            '待收货',
            '已完成',
            '已取消',
        ]
      }
    },
    computed: {
        ...mapState([

        ])
    },
    components: {
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Panel ,
    },
    methods: {
      
    },
    mounted(){
      // console.log('id',this.$route.params.id)
      this.demo2 = this.$route.params.id-0;
    },
}
</script>

<style lang='scss' >
.myOrder{
  background:#f4f4f4;
  padding-top:43.98px;
  height:100%;
  // height:calc(100% - 43.98px);
  .vux-tab-wrap{
    position:fixed;
    width:100%;
    top:0;
  }
  .vux-slider{
    // margin-top:43.98px;
    height:100%;
  }
  .htitle{
    height: 46px;
    padding: 0 15px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab-swiper{
    background:#fff;
    margin-bottom: 10px;
  }
  .content {
    height: 96px;
    padding:0 15px;
    border-top:1px solid #eee;
    display:flex;
    align-items:center;
    img{
      width: 72px;
      height: 72px;
    }
    .right{
      flex: 1;
      height: 72px;
      margin-left: 15px;
      padding-top: 10px;
    }
  }
  .vux-swiper{overflow: auto!important;}
  .vux-swiper-item::before,
  .vux-swiper-item::after{
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    visibility: hidden;
    clear: both;
  }
  .vux-swiper::before,
  .vux-swiper::after{
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    visibility: hidden;
    clear: both;
  }
  .noList{
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i{
      font-size: 90px;
      color: #999;
    }
  }
}
</style>
