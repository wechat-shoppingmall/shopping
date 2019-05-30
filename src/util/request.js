import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'production'?'':'/develop',//api的base_url 
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // console.log('config',config)
  return config
}, error => {
  // Do something with request error
  console.log('错误：') // for debug
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  /**
  * code为非0是抛错 可结合自己业务进行修改
  */
    const res = response.data
    // console.log('res',res,response)
    if (response.status !== 200) {
        // console.log('jkl;jkl;jkl')
      Message({
        message: res.msg,  //错误消息
        type: 'error',
        // duration: 3 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 403 ) {
        MessageBox.confirm('登录超时，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            window.location.href = '#/login'
            location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
// export default{
//   get(url, param={}) {
//     return new Promise((resolve, reject) => {
//       service({
//         method: 'get',
//         url,
//         params: param,
//         // cancelToken: new CancelToken(c => {
//         //   cancel = c
//         // })
//       }).then(res => { //axios返回的是一个promise对象
//         resolve(res) //resolve在promise执行器内部 
//       }).catch(err => {
//         console.log(err, '异常')
//       })

//     })
//   },
//   //post请求
//   post(url, param={}) {
//     return new Promise((resolve, reject) => {
//       service({
//         method: 'post',
//         url,
//         data: param,
//         // cancelToken: new CancelToken(c => {
//         //   cancel = c
//         // })
//       }).then(res => {
//         resolve(res)
//       }).catch(err => {
//         console.log(err, '异常')
//       })
//     })
//   },
//   put(url, data = {}) {
//     return new Promise((resolve, reject) => {
//       service({
//         method: 'put',
//         url,
//         data,
//       }).then(res => {
//         resolve(res);
//       }).catch(err => {
//         console.log(err, '异常')
//       })
//     })
//   }
// }
export default service
