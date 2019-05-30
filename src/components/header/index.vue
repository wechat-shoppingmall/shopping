<template>
    <div id='head_top'>
        <!-- <div class="top">
            <div class="headerTitle">
                <a style='text-decoration: none;'>咸宁市“智慧交通”安全应急综合管理信息化平台</a>
            </div>
            <div class="menu">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="transparent"
                    text-color="#fff"
                    :router='true'
                    active-text-color="#2dece1"
                    >
                    <el-menu-item index="/index">指挥调度系统</el-menu-item>
                    <el-menu-item index="/EPM">应急预案管理</el-menu-item>
                    <el-menu-item index="/EM">事件管理</el-menu-item>
                    <el-menu-item index="/Administrator">超级管理员</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="lineF"></div> -->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data() {
            return {
                activeIndex: '',
                menuColor:'#fff',
                // logoUrl:require(' ../../../assets/images/index/logo2.png'),
            };
        },
        props: [],
        watch:{
           $route(val){
            //    return this.activeIndex =  val.path === '/disposeEmergency'?'/index':val.path;
           }
        },
        computed: {
            ...mapState([

            ]),
           
        },
        methods: {
            handleSelect(key, keyPath) {
                
            },
           
        },
        mounted(){
            
            
        },
    }

</script>

<style lang="scss">
   
</style>
