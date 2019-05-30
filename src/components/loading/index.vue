<template>
  <div class='root'>
     <!-- 加载 -->
    <div id="loadingWave" class="bgChange">
        <div id="loadingWave-center">
            <div id="loadingWave-center-absolute">
            	<!-- <div class="loadTipsAct">数据加载中，请稍后</div> -->
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
                <div class="object"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: '',
  data () {
    return {

    }
  },
  computed: {
     ...mapState([

    ])
  },
  methods: {

  },
  mounted(){

  },
}
</script>

<style lang='scss' scoped>

</style>
