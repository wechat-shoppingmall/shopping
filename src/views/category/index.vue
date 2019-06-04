<template>
  <div id="rank">
    <div class="categoryBtn">
        <ul class='clearfix'>
            <li class='btn fl' @click='getGoodsList(x,i)' :class="x.id==params.categoryId?'activeBtn':''" v-for="(x,i) in categorys" :key='i'>{{x.name}}</li>
        </ul>
    </div>
    <div class='newGoods'>
      <ul class="goodsList clearfix" v-if="goodsList.length>0">
        <li v-for='(item,i) in goodsList' :key='i' class="fl">
          <img :src="item.list_pic_url" alt="">
          <div class="name ellipsis">{{item.name}}</div>
          <div class="jf">{{item.retail_price}}<span style='font-size:16px;'>积分</span></div>
        </li>
      </ul>
      <divider v-if="goodsList.length==0">暂无数据</divider>
    </div>
  </div>
</template>
<script>
import Util from '@/util/util'
import {mapState, mapGetters ,mapMutations} from 'vuex'
import { Divider  } from 'vux'
import { GoodsCategory,GoodsList } from '@/api/index'

export default {
    name: 'category',
    data() {
        return {
            categorys:[],
            params:{
                page:1,
                size:1000,
                categoryId:0
            },
            goodsList:[],
        }
    },
    components: {
      Divider ,
    },
    computed: {
        
    },
    methods: {
        ...mapMutations([
            'UPDATE_TABBAR'
        ]),
        getGoodsCategory(){//从居家-志趣8个分类
            GoodsCategory({id:this.$route.params.id}).then(res=>{
                if(res.errno ==0){//
                    // console.log('res',res);
                    this.categorys = res.data.brotherCategory;
                }
            })
        },
        getGoodsList:Util.debounce(function(obj,i){//从居家-志趣8个分类
            if(obj)this.params.categoryId = obj.id;
            GoodsList(this.params).then(res=>{
                if(res.errno ==0){//
                    this.goodsList = res.data.goodsList;
                }
            })
        },200),
    },
    mounted(){
        this.UPDATE_TABBAR({isTabBar:false})
        // console.log('this.$route.params.id',this.$route.params.id);
        this.params.categoryId = this.$route.params.id;
        this.getGoodsCategory(this.params);
        this.getGoodsList();
    },
    beforeDestroy() {

    },
}
</script>
<style lang='scss' scoped>
  #rank{
    background-color: #eee;
    .jf{
      color:#b4282d;
      font-size: 18px;
      padding: 10px 0;
    }
    .fillColor{
      fill: #b4282d;
    }
    .categoryBtn{
        overflow-x: scroll;
        ul{
            height: 42px;
            display: flex;
            align-items: center;
            overflow-y: hidden;
            flex-wrap: nowrap;
            background: #fff;
            .btn{
                padding: 12px 17px;
                white-space: nowrap;
                font-size: 14px;
            }
            .activeBtn{
                color:#b4282d;
                border-bottom:1px solid #b4282d;
            }
        }
    }
    .newGoods{
      color:#333;
      .goodsList li{
        width: 50%;
        font-size: 15px;
        background: #fff;
        padding:10px;
        img{
          width: 175px;
        }
      }
    }
    .vux-divider{
        background:#fff;
    }
  }

</style>

