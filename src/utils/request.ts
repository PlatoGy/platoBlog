import axios from 'axios'
import { ElMessage,ElMessageBox } from 'element-plus'
import useToken from '@/store/token'
import pinia from '@/store/index' 
const token = useToken(pinia)
// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
  })
  
  // request interceptor
  service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (token.token) {
        // let each request carry token
        // please modify it according to the actual situation
        config.headers['Authorization'] = 'Bearer ' + token.token
      }
      // config.headers['from'] = 1
      // config.headers['mode'] = 1
      // config.headers['storeId'] = store.getters.storeId
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
  
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
      if (response.headers && response.headers.refreshtoken) {
        let token = response.headers.refreshtoken || ''
        token.dispatch('setToken', token)
      }
      return res
    },
    error => {
      console.log('Error::: ' + error) // for debug
      ElMessage({
        // elmessage: error.elmessage,
        message: '网络错误，请刷新重试',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
  )
  export default service
