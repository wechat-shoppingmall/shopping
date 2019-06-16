<template>
  <div class='cart'>
    <div class="tab-swiper vux-center" v-for='x in list' :key='x.index' v-if='list.length>0'>
        <div class="content">
            <check-icon :value.sync="x.checked"></check-icon>
            <img :src="x.src" alt="">
            <div class="right">
                <div class="title clearfix">
                    <template v-if="!isEdit">
                        <div class="tl fl ellipsis">{{x.title}}</div>
                        <div class="tr fl">X1</div>
                    </template>
                    <template v-if='isEdit'>
                        <div class="fr">已选择：＞</div>
                    </template>
                </div>
                <div class="dArea">
                    <div class="">399积分</div>
                    <div class="" v-if='isEdit'>
                        <x-number></x-number>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="buyBox clearfix">
      <div class="check fl icbox">
        <check-icon :value.sync="isCheckedAll">全选({{checkeds.length}})</check-icon>
      </div>
      <div class="jf fl" badge="2">
        459积分
      </div>
      <div class="btnBox fl clearfix">
        <div class="lijiBuy fl btn" @click='eidt'>{{isEdit?'完成':'编辑'}}</div>
        <div class="addShopcar fl btn">{{isEdit?'删除所选':'下单'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {Checker, CheckerItem,CheckIcon,XNumber   } from 'vux';
export default {
  name: 'cart',
  data () {
    return {
        list: [{
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/2153262481b48a.png',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell',
          checked:true,
        }, {
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/2230003573eb49.jpg',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          checked:true,
        }, {
          src: 'https://clean-server.oss-cn-beijing.aliyuncs.com/dqx/20190531/22365163598c6f.png',
          title: '关注留守儿童的志愿活动',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          checked:true,
        }],
        isEdit:''//编辑
    }
  },
  components:{
      Checker, 
      CheckerItem,
      CheckIcon,
      XNumber ,
  },
  computed: {
     ...mapState([

    ]),
    checkeds(){
        return this.list.filter(x=>{
            return x.checked;
        })
    },
    isCheckedAll:{
        get(){
            return this.checkeds.length === this.list.length;
        },
        set(val){
            this.list.map(x=>x.checked = val)
        }
    }
  },
  watch:{
    
  },
  methods: {
    change (val, label) {
        console.log('change', val, label)
    },
    eidt(){
        this.isEdit = !this.isEdit;
        this.isEdit?this.isCheckedAll = false:'';
    }
  },
  mounted(){

  },
}
</script>

<style lang='scss'>
.cart{
    background: #f4f4f4;
    height:100%;
    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
        color:#b4282d!important;
    }
    .tab-swiper{
        background:#fff;
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            height: 72px;
            margin-left: 15px;
            padding: 10px 0;
            .tl{
                width: 90%;
            }
            .tr{
                width:10%;
            }
            .dArea{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .buyBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        height:50px;
        display: flex;
        align-items: center;
        .icbox{
            line-height: 50px;
            text-align: center;
        i{
            color:#666;
            font-size: 22px;
        }
    }
    .jf{
        flex:1;
        padding-left: 10px;
    }
    .btnBox{
        .btn{
            height:50px;
            line-height: 50px;
            text-align: center;
            font-size: 14px;
        }
        .lijiBuy  {
            margin-right:10px;
        }
        .addShopcar{
            // padding: 0px 38px;
            background-color: #b4282d;
            color: #fff;
            width:130px;
        }
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
    .weui-cell{
        padding:0px!important;
    }
    .weui-cell__ft {
        a,input{
            height:26px!important;
        }
    }
}
</style>
