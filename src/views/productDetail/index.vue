<template>
  <div id="index">
    <swiper :show-desc-mask='false' v-if='gallery.length>0' auto :list="gallery"  style="width:100%;margin:0 auto;" height="375px"  dots-position="center"></swiper>
    xiangqing 
  </div>
</template>

<script>
// @ is an alias to /src
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Search,AlertModule,Group,Cell,Swiper,SwiperItem,XButton } from 'vux'
import { GoodsDetail, } from '@/api/index'

export default {
    name: 'productDetail',
    data() {
        return {
          pid:'',//商品ID;
          gallery:[],//轮播图
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
      getGoodsDetail(){
        GoodsDetail({id:this.pid}).then(res=>{
          console.log('res',res);
          if(res.errno ==0){//
            res.data.gallery.map(x=>{
              x.url = 'javascript:';
              x.img = x.img_url;
              x.title = '';
            })
            this.gallery = res.data.gallery;
          }
        })
      },
    },
    mounted(){
      console.log('id',this.$route.params.id);
      this.pid = this.$route.params.id;
      this.UPDATE_TABBAR({isTabBar:true});
      this.getGoodsDetail();
      // this.getTotalCount();
      // this.getIndexUrlNewGoods();
      // this.getIndexUrlHotGoods();
      // this.getIndexUrlCategory();
      // console.log('fech',fechApi);
      
      
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  
</style>

