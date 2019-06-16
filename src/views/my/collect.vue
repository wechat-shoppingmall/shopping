<template>
  <div class='collect'>
    <div class="tips">左滑可取消收藏</div>
    <swipeout class="vux-1px-tb">
        <swipeout-item ref="swipeoutItem" transition-mode="follow" v-for='x in list' :key='x.index'>
            <div slot="right-menu">
                <div slot="right-menu">
                    <swipeout-button type="warn" @click.native='deleteOne(x)'>删除</swipeout-button>
                </div>
            </div>
            <div slot="content">
                <router-link class="tab-swiper vux-center"  v-if='list.length>0' to='/productDetail/1181004'>
                    <div class="content">
                        <img :src="x.src" alt="">
                        <div class="right">
                            <div class="name">{{x.title}}</div>
                            <div class="subtitle">清新趣粉全棉四件套 青粉拼接</div>
                            <div class="jf">399积分</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </swipeout-item>
    </swipeout>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux';
export default {
    name: 'collect',
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
        }
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    },
    computed: {
        ...mapState([

        ])
    },
    methods: {
        deleteOne(x){
            this.$vux.confirm.show({
                // 组件除show外的属性
                content:'确定取消收藏吗？',
                onCancel : () => {
                    console.log('取消') //当前 vm
                },
                onConfirm : () => {
                    console.log('确定')
                }
            })
        }
    },
    mounted(){

    }
}
</script>

<style lang='scss'>
.collect{
    background: #f4f4f4;
    height:100%;
    .tips{
        background-color: #feeff0;
        height:40px;
        line-height: 40px;
        padding-left: 15px;
        color:#b4282d;
    }
    .tab-swiper{
        background:#fff;
    }
    .vux-swipeout-button-box{
        button{
            height:96px;
        }
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .subtitle{
                color:#888;
            }
            .name,.jf{
                color:#333;
            }
        }
    }
}
</style>
