/** 
 * writen by jonah 2019年5月5日23:18:33
 */

import urls from './urls'
import request from '../util/request.js'

export function indexBanner(obj) {//首页轮播图
    return request({
        url: urls.IndexUrlBanner,
        method: 'get',
        params: ''
    })
}
export function GoodsCount(obj) { //统计商品总数
    return request({
        url: urls.GoodsCount,
        method: 'get',
        params: ''
    })
}
export function IndexUrlNewGoods(obj) { //首页新品首发
    return request({
        url: urls.IndexUrlNewGoods,
        method: 'get',
        params: ''
    })
}
export function IndexUrlHotGoods(obj) { //首页人气推荐
    return request({
        url: urls.IndexUrlHotGoods,
        method: 'get',
        params: ''
    })
}
export function IndexUrlCategory(obj) { //从居家-志趣8个分类
    return request({
        url: urls.IndexUrlCategory,
        method: 'get',
        params:''
    })
}
/* 首页新品，推荐筛选页 */
export function GoodsHot(obj) { //首页新品，推荐筛选页
    return request({
        url: urls.GoodsHot,
        method: 'get',
        params: ''
    })
}
export function GoodsList(obj) { //首页新品，推荐筛选页 商品列表
    return request({
        url: urls.GoodsList,
        method: 'get',
        params: obj
    })
}
export function GoodsCategory(params) { //GoodsCategory: NewApiRootUrl + 'goods/category', //获得分类数据
    return request({
        url: urls.GoodsCategory,
        method: 'get',
        params: params
    })
}
export function SearchIndex(params) { //搜索初始化
    return request({
        url: urls.SearchIndex,
        method: 'get',
        params: ''
    })
}
export function GoodsDetail(params) { //商品详情1
    return request({
        url: urls.GoodsDetail,
        method: 'get',
        params: params
    })
}

export function GoodsRelated(params) { //商品详情页的关联商品（大家都在看）
    return request({
        url: urls.GoodsRelated,
        method: 'get',
        params: params
    })
}
export function CartGoodsCount() { // 获取购物车商品件数
    return request({
        url: urls.CartGoodsCount,
        method: 'get',
        params: ''
    })
}
//TopicList: NewApiRootUrl + 'topic/list', 
export function TopicList(obj) { //专题列表
    return request({
        url: urls.TopicList,
        method: 'get',
        params: obj
    })
}
export function IndexUrlTopic() { //IndexUrlTopic: NewApiRootUrl + 'index/topic', //公益一小时top3
    return request({
        url: urls.IndexUrlTopic,
        method: 'get',
        params: ''
    })
}
export function TopicDetail(obj) { //TopicDetail: NewApiRootUrl + 'topic/detail', //专题详情
    return request({
        url: urls.TopicDetail,
        method: 'get',
        params: obj
    })
}
export function TopicRelated(obj) { //TopicRelated: NewApiRootUrl + 'topic/related', //相关专题
    return request({
        url: urls.TopicRelated,
        method: 'get',
        params: obj
    })
}
export function TopicEnroll(obj) { //TopicEnroll: NewApiRootUrl + 'topic/join', //参加活动
    return request({
        url: urls.TopicEnroll,
        method: 'get',
        params: obj
    })
}
