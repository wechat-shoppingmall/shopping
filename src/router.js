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