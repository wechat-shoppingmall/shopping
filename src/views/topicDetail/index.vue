<template>
  <div class="topicDetail">
    <div class="goodsList clearfix" v-if="topicDetail" >
        <!-- <img :src="item.scene_pic_url" alt=""> -->
        <div class="content" v-html='topicDetail.content'></div>
    </div>
    <x-button type="warn" style='background:red;' @click.native='joinTopicEnroll'>立即参加（可获取{{topicDetail.price_info}}积分）</x-button>
    <div class='topicList'>
        <div class="promit">活动推荐</div>
        <ul class="goodsList clearfix" v-if="topicRelated.length>0" >
            <li tag="li" v-for='(item,i) in topicRelated' :key='i' class="fl" @click='toDetail(item.id)'>
                <div class="imgBox">
                    <img :src="item.scene_pic_url" alt="">
                </div>
                <div class="title">{{item.title}}</div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Confirm,Cell,Swiper,SwiperItem,XButton } from 'vux'
import { TopicDetail,TopicRelated,TopicEnroll } from '@/api/index'

export default {
    name: 'topicDetail',
    data() {
        return {
          topicDetail:'',
          topicRelated:'',
          topicId:'',
        }
    },
    components: {
      XButton,
      Confirm,
      Swiper,
      SwiperItem,
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
      getTopicDetail(obj){
        TopicDetail(obj).then(res=>{
          if(res.errno ==0){
            this.topicDetail = res.data;
            this.$nextTick(()=>{
                $('.content p').not(0).css({color:'#333',padding: '10px',fontSize:'13px'});
                $('.content p img').css({width:'100%'});
                [...$('.content p')].map(x=>{
                    if(x.innerHTML == '<br>'){
                        $(x).remove();
                    }
                })
            })
          }
        })
      },
      getTopicRelated(obj){
        TopicRelated(obj).then(res=>{
          if(res.errno ==0){
            this.topicRelated = res.data;
          }
        })
      },
      toDetail(id){
        this.$router.push({name:'topicDetail',params:{id:id}})
        this.getTopicDetail({id});
        this.getTopicRelated({id});
        window.scrollTo(0,0);
      },
      joinTopicEnroll(){
        let that = this;
        this.$vux.confirm.show({
            content: '确定要参加此活动吗？',
            onConfirm () {
                TopicEnroll({id:that.topicId}).then(res=>{
                    if(res.errno == 0){
                        that.$vux.alert.show({
                            title: '提示',
                            content: res.data || '报名成功!',
                            buttonText:'继续',
                            onShow () {
                                console.log('Plugin: I\'m showing')
                            },
                            onHide () {
                                console.log('Plugin: I\'m hiding')
                            }
                        })
                    }else if(res.errno == 1){
                        that.$vux.toast.show({
                            text: res.errmsg || '请勿重复报名',
                            type:'warn'
                        })
                    }else if(res.errno == 401){
                        that.$vux.toast.show({
                            text: res.errmsg || '请先登录',
                            type:'warn'
                        })
                    }
                })
            }
        })
        
      }
    },
    mounted(){
    //   console.log('isTabBar',this.$route.params);
      window.scrollTo(0,0);
      this.UPDATE_TABBAR({isTabBar:false});
      this.topicId = this.$route.params.id;
      this.getTopicDetail({id:this.$route.params.id});
      this.getTopicRelated({id:this.$route.params.id});
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  .topicDetail{
    // margin-bottom:54px;
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
        padding: 15px;
        .promit{
            color:#999;
            text-align: center;
            padding: 23px;
            font-size: 16px;
        }
        li{
            width:100%;
            text-align: center;
            background: #fff;
            margin-bottom: 10px;
            .imgBox{
                padding: 10px;
            }
            img{
                width:100%;
            }
            .title{
                overflow: hidden;
                color:#333;
                margin: 10px;
                font-size: 15px;
            }
        }
    }
  }

</style>

