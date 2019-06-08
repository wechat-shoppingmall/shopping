<template>
  <div id="topicSign">
    <!-- <div class="topic_pic">
      <img :src="dataForm.scene_pic_url">
    </div> -->
    <div v-html="dataForm.content"></div>
    <x-button type="primary" @click.native="getTopicSign">现场签到</x-button>
  </div>
</template>
<script>
import Util from '@/util/util'
import { XButton  } from 'vux'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { topicDetail,TopicSign } from '@/api/topicSign'

export default {
    name: 'category',
    data() {
        return {
            dataForm:{},
            params:{
                page:1,
                size:1000,
                categoryId:0
            },
            goodsList:[],
        }
    },
    components: {
      XButton ,
    },
    computed: {
        
    },
    methods: {
        ...mapMutations([
            'UPDATE_TABBAR'
        ]),
        getTopicDetail(){//获取活动详情
        console.log(this.$route)
            topicDetail(this.$route.query.id).then(res=>{
                if(res.errno ==0){//
                    // console.log('res',res);
                    this.dataForm = res.data;
                }
            })
        },
        getTopicSign(){//活动签到
            TopicSign(this.$route.query.id).then(res=>{
                if(res.errno ==0){//
                    // console.log('res',res);
                    
                }
            })
        },
    },
    mounted(){
        this.UPDATE_TABBAR({isTabBar:false})
        // console.log('this.$route.params.id',this.$route.params.id);
        this.params.categoryId = this.$route.params.id;
        this.getTopicDetail(this.params);
        // this.getGoodsList();
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>

</style>
<style lang='scss' >
  #topicSign{
    img{
      width: 100%;
      margin-bottom: 10px;
    }
    p{
      line-height: 1.5;
    }
  }
</style>


