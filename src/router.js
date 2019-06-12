import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

Vue.use(Router)

 const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: "首页", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/index/index.vue')
    },
    {
      path: '/rank/:id',
      name: 'rank',
      meta: {
        title: "智慧康养平台", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/rank/index.vue')
    },
    {
      path: '/category/:id',
      name: 'category',
      meta: {
        title: "分类", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/category/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        title: "搜索", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/search/index.vue')
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      meta: {
        title: "商品详情", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/productDetail/index.vue')
    },
    {
      path: '/brandList',//品牌商品列表
      name: 'brandList',
      meta: {
        title: "智慧康养平台", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/brandList/index.vue')
    },
    {
      path: '/typeNum', //品牌商品列表
      name: 'typeNum',
      meta: {
        title: "商品详情", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/typeNum/index.vue')
    },
    {
      path: '/topic', //品牌商品列表
      name: 'topic',
      meta: {
        title: "活动", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/topic/index.vue')
    },
    {
      path: '/topicDetail/:id', //品牌商品列表
      name: 'topicDetail',
      meta: {
        title: "活动详情", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/topicDetail/index.vue')
    },
    {
      path: '/my', //品牌商品列表
      name: 'my',
      meta: {
        title: "我的", //要现实的title
        show: true               //设置导航隐藏显示
      },
      component: () => import('./views/my/index.vue')
    },


    {//活动签到页
      path: '/topicSign',
      name: 'topicSign',
      meta: {
        title: "活动签到页", //要现实的title
        show: false               //设置导航隐藏显示
      },
      component: () => import('./views/topicSign/index.vue')
    },    
    
  ]
})


// router.beforeEach((to, from, next) => {
  

  // NProgress.start();
  // window.scrollTo(0,0);
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  // next();
  // NProgress.done()
// })
export default router;