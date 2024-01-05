import axios from 'axios'

function getSession(key) {
  const json = window.sessionStorage.getItem(key)
  return JSON.parse(json)
}

//读取环境
export const BASE_API = import.meta.env.VITE_APP_BASE_API
// console.log(BASE_API, 'VITE_APP_BASE_API')

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (getSession('token')) {
      config.headers.common['Authorization'] = `${getSession('token')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code && res.code !== 200) {
      return Promise.resolve(res)
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
