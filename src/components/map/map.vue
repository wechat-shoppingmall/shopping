<template>
  <div class='JMap'>
    <!-- <keep-alive> -->
      <div id="container"></div> 
    <!-- </keep-alive> -->
  </div>
</template>

<script>

import {mapGetters, mapMutations ,mapActions} from 'vuex';
export default {
  name: '',
  data () {
    return {
      MAP:'',
      infoWindow:'',
      toccMarkers:[],
      overlayGroups:'',// 创建覆盖物群组，并将 marker 传给 OverlayGroup
      // cluster:'',//聚合点
      // traffic:'',//交通路况
      highLightArea:'',//高亮显示
    }
  },
  props:['mapData'],
  computed: {
     ...mapGetters([
       'mapComponent',
       'cluster',//聚合点
       'traffic',
    ])
  },
  methods: {
    ...mapMutations([
      // `mapMutations` 也支持载荷：
      'initMap' ,// 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'initCluster',
      'initTraffic',
      'initAuthCode',
    ]),
    initToccMap(){
      if(!this.mapComponent){
        this.MAP = new AMap.Map('container', {
            zoom:10,//级别
            center: [114.322450,29.841260],//中心点坐标
            resizeEnable: true
        });
        this.initMap(this.MAP);
      }else{
        $('.JMap').html(this.mapComponent.getContainer())
        this.MAP = this.mapComponent;
        this.mapComponent.clearMap();
        this.cluster && this.cluster.clearMarkers();
        this.MAP.setZoomAndCenter(10, [114.322450,29.841260]);
      }
      this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(5, -30)});
    },
    handlerClick(e){//marker点击事件
      // console.log('dclick',e.target,e.target.content,e.target.getPosition())
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.MAP, e.target.getPosition());
      this.MAP.setZoomAndCenter(this.MAP.getZoom(), e.target.getPosition());
    },
    addMarkersEvents(){
        // this.MAP.clearMap();
        if(this.cluster){
          // console.log('markers',this.cluster.getMarkers())
          this.MAP.remove(this.cluster.getMarkers())
        }
        this.cluster && this.cluster.clearMarkers( );
        if(this.mapData.markers.length>0){
          this.toccMarkers = this.mapData.markers;
          if(!this.mapData.isAsyncClick){
            this.toccMarkers.map(x=>{
              AMap.event.addListener(x,'click',this.handlerClick);
            });
          }
          this.initCluster(new AMap.MarkerClusterer(//聚合点
            this.MAP,     // 地图实例
            this.toccMarkers,    // 海量点组成的数组
            {maxZoom:17}
          ));
        }
        if(this.mapData.Traffic){//实时交通
           if(!this.traffic){
            this.initTraffic(new AMap.TileLayer.Traffic({
              'autoRefresh': true,     //是否自动刷新，默认为false
              'interval': 180,         //刷新间隔，默认180s
            })) 
            // console.log('this.traffic',this.traffics)
            this.MAP.add(this.traffic); //通过add方法添加图层
           }
        }else{
          this.MAP.remove(this.traffic)
          this.initTraffic('');
        }
        if(this.mapData.districtExplorer){//高亮显示某个区域
          if(!this.highLightArea){
            AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer)=>{
                this.initPage(DistrictExplorer);
            });
          }
        }else{
          this.highLightArea = '';
        }
    },
    getAllRings(feature) {
      var coords = feature.geometry.coordinates,
          rings = [];
      for (var i = 0, len = coords.length; i < len; i++) {
          rings.push(coords[i][0]);
      }
      return rings;
    },
    getLongestRing(feature) {
      var rings = this.getAllRings(feature);
      rings.sort(function(a, b) {
          return b.length - a.length;
      });
      return rings[0];
    },
    initPage(DistrictExplorer) {
      //创建一个实例
      let that = this;
      this.highLightArea = new DistrictExplorer({
          map: that.MAP
      });

      var countryCode = 100000, //全国
          provCodes = [ ],
          cityCodes = [
              421200 //咸宁市
          ];

      this.highLightArea.loadMultiAreaNodes(
        //只需加载全国和市，全国的节点包含省级
        [countryCode].concat(cityCodes),
        function(error, areaNodes) {
            var countryNode = areaNodes[0],
                cityNodes = areaNodes.slice(1);
            var path = [];
            //首先放置背景区域，这里是大陆的边界
            path.push(that.getLongestRing(countryNode.getParentFeature()));
            for (var i = 0, len = provCodes.length; i < len; i++) {
                //逐个放置需要镂空的省级区域
                path.push.apply(path, that.getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])));
            }
            for (var i = 0, len = cityNodes.length; i < len; i++) {
                //逐个放置需要镂空的市级区域
                path.push.apply(path, that.getAllRings(cityNodes[i].getParentFeature()));
            }
            //绘制带环多边形
            //https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
            var polygon = new AMap.Polygon({
                bubble: true,
                lineJoin: 'round',
                strokeColor: 'red', //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: 'black', //填充色
                fillOpacity: 0.65, //填充透明度
                map: that.MAP,
                path: path
            });
        }
      )
    },
    // 视频接入 登录
    initVideoMap(){
      let that = this;
      var data = {'user_name' : 'sa','password' : '123456'};
      $.ajax({
        type : "post",
        url : "http://58.52.146.188:3018/api/sys_mng/login",
        data : 'params=' + JSON.stringify(data),
        dataType : "jsonp",
        jsonp : "callback",
        jsonpCallback : "jsonpCallback",
        success : function(data) {
          // console.log('视频登录',data)
          if (data.result == 0) {
            that.initAuthCode(data.auth_code)
          }
        }
      });
    },
  },
  mounted(){
    // console.log('mapComponent',this.mapComponent)
    this.initToccMap();

    // 登录调视频
    this.initVideoMap();
  },
  watch:{
    mapData(val){
      if(val){
        // console.log(this.MAP.getZoom(),val,this.MAP.getCenter())
        val.configMap.zoom = this.MAP.getZoom()
        val.configMap.center = this.MAP.getCenter()
        this.MAP.setZoomAndCenter(this.MAP.getZoom(), this.MAP.getCenter());
        this.addMarkersEvents();
      }
    }
  },
  beforeDestroy() {
    AMap.event.removeListener(this.handlerClick);
  //   this.MAP.destroy();
    this.toccMarkers = null;
  },
}
</script>

<style lang='scss' scoped>
.JMap,
#container {width:100%; height:100%;}
</style>
<style lang='scss'>
/* map 点标记样式*/
.amap-info-content{
  background:#20889c!important;
  font-size:12px;
  line-height:20px;
  color:#fff;
  padding:20px 10px 10px 10px;
}
.amap-info-content>p>span{
  margin-right:5px;
}
.amap-info-content .amap-info-close{
  right:10px!important;
}
.bottom-center .amap-info-sharp {
    border-top: 8px solid #20889c;
}

.tabs {
  width:680px;
  input {
    opacity: 0;    
  }
  label {
    cursor: pointer;
    border:1px solid #ccc;
    color: #fff;
    padding: 5px 15px;
    float: left;
    &:nth-child(2){
      margin-left: 10px;
    }
  }

  label:hover {
      background: #2dece1;
  }
  input:checked + label {
      background: #2dece1;
      color: #000;
  }
  
  .panels {
      float: left;
      clear: both;
      position: relative;
      width: 100%;
      min-height:400px;
  }
  .panel {
      width: 100%;
      opacity: 0;
      position: absolute;
      box-sizing: border-box;
      p{
        line-height:34px;
        padding-left:10px;
      }
      .videos{
        width:100%;
        >div{
          float:left;
          margin:10px 10px;
        }
      }
  }       
}
.tabs input:nth-of-type(1):checked ~ .panels .panel:first-child,
.tabs input:nth-of-type(2):checked ~ .panels .panel:nth-child(2){
  opacity: 1;
  -webkit-transition: .9s;
}
</style>

