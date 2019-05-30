<template>
  <div class='root'>
    <el-carousel v-if='carouseData.imgList.length>0'  :height="carouseData.carouselHeight" :arrow='carouseData.arrow'>
        <el-carousel-item v-for="(item,index) in carouseData.imgList" :key="index">
        <img :src="item.src" alt="">
        <slot name='content1' v-if='index === 0'></slot>
        <slot name='content2' v-if='index === 1'></slot>
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      carouselHeight:''
    }
  },
  props:['carouseData'],
  methods: {

  },
  mounted(){
    // let screenWidth = window.screen.width-0;
    // this.carouselHeight = (screenWidth*823/1440)+'px';
  },
}
</script>

<style lang='scss'>
.el-carousel__arrow{
  width: 50px;
  height: 50px;
  i{
    font-size: 50px!important;
  }
}
.el-carousel__arrow--right {
    right: 10%;
    margin-top: 1%;
}
.el-carousel__arrow--left {
    left: 10%;
    margin-top: 1%;
}
.el-carousel__indicators{
  bottom:100px!important;
}
.words{
    position: absolute;
    top: 20%;
    left: 20%;
    text-align: left;
    p{
      span{
        display: inline-block;
        line-height: 30px;
      }
      &:nth-child(1){
        font-size:20px;
        font-family:SourceHanSansCN-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      &:nth-child(2){
        font-size:73px;
        font-family:SourceHanSansCN-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin: 20px 0;
      }
      &:nth-child(3){
        font-size:20px;
        font-family:SourceHanSansCN-Normal;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin: 20px 0;
      }
      &:nth-child(4){
        font-size:16px;
        font-family:SourceHanSansCN-Normal;
        font-weight:400;
        color:rgba(255,255,255,1);
      }

    }
}
</style>
