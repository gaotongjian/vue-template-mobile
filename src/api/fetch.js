import axios from 'axios'
import router from '../router'
import { API_URL } from '../.env'
import { Toast, Indicator } from 'mint-ui'

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 12000
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'
// request拦截器

axios.interceptors.request.use(config => {
  // Do something before request is sent
  let webAuth = JSON.parse(window.localStorage.getItem('webAuth'))
  if (webAuth) config.headers.Authorization = 'Bearer ' + webAuth.access_token
  config.headers.Accept = 'application/json,text/plain'
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(
  response => {
    Indicator.close()
    return response
  },
  error => {
    Indicator.close()
    const response = error.response
    let errors = ''
    if (response && response.status) {
      const status = response.status
      const errMsg = response.data.error
      if (status === 401) {
        switch (errMsg) {
          case 'Unauthenticated.':
            errors = '授权失败，请重新登录！'
            router.replace('login')
            break
          case 'invalid_credentials':
            errors = '登录失败，账号或密码错误！'
            break
          default:
            errors = '暂无权限！'
        }
      } else if (status === 422) {
        console.log('表单校验失败！', response.data)
        Object.keys(response.data.errors).map((n) => {
          errors += response.data.errors[n][0]
        })
      } else if (status === 403) {
        errors = '您没有权限!'
      } else if (status === 503) {
        errors = '系统维护中...'
      } else {
        errors = errMsg || '请求失败！' + response.errMsgText
      }
    }
    if (errors) {
      Toast(errors)
      console.log(errors)
    }
    return Promise.reject(error.response)
  }
)
export default {
  $get (url, data, show = true) {
    if (show) Indicator.open()
    const cb = arguments.pop()
    axios.get(API_URL + url, {
      params: data
    }).then((response) => {
      typeof cb === 'function' && cb(response.data)
      return Promise.resolve(response.data)
      // callback(response, cb, show)
    }).catch((error) => {
      return Promise.resolve(error)
      // console.log('getError', error)
      // callback(error.response, cb, show)
    })
  },

  $post (url, data, show = true) {
    if (show) Indicator.open()
    const cb = arguments.pop()
    axios.post(API_URL + url, data).then((response) => {
      typeof cb === 'function' && cb(response.data)
      return Promise.resolve(response.data)
    }).catch((error) => {
      // console.log('postError', error)
      return Promise.resolve(error)
    })
  }
}
