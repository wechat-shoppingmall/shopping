/** 
 * writen by jonah 2019年5月5日23:18:33
 */
import urls from './urls'
import request from '../util/request.js'

export function topicDetail(id) {//获取活动详情
    return request({
        url: urls.topicDetail+'?id='+id,
        method: 'get',
        params: ''
    })
}
export function TopicSign(id) { //统计商品总数
    return request({
        url: urls.TopicSign+'?id='+id,
        method: 'get',
        params: ''
    })
}
