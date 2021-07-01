/* eslint-disable no-magic-numbers */
import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    console.log('request err: ', JSON.stringify(err))
    if (!err.response && err.config.url.indexOf('/flow/local') > -1) {
      // Dialog.alert({ message: '网络繁忙，请稍后再试！' })
    }

    return Promise.reject(err)
  }
)

function transformUrl(url, method, body) {
  const middle = url.lastIndexOf('?')
  if (method === 'GET') {
    const len = url.length - 1
    if (middle > -1 && middle === len) {
      url = url.substring(0, middle)
    }
    if (middle === -1) {
      url = `${url}?`
    }
    if (typeof body === 'object' && body !== null) {
      url += JSON.stringify(body)
    }
    if (typeof body === 'string') {
      url += body
    }
  }
  return url
}
export default function request(config) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'X-Seal-App-Id': process.env.VUE_APP_APPID,
    }
    const {
      method,
      type,
      data,
      headers,
      hideLoading,
      requestByUrl,
      baseURL,
    } = config
    let { url } = config
    if (!url || typeof url !== 'string') {
      return
    }
    const requestConf = {
      baseURL: baseURL || process.env.VUE_APP_HOSPDEMO_BASEURL,
      method,
      responseType: type || 'json',
      headers: Object.assign(defaultHeaders, headers || {}),
      maxRedirects: 5,
    }

    requestConf.url = transformUrl(config.url, config.method, config.data)
    requestConf.data = data
    if (requestByUrl) {
      // 通过location.href请求
      window.location.href = requestConf.url

      return
    }
    if (!hideLoading) {
      // Toast.loading({ duration: 0, forbidClick: true })
    }
    axios(requestConf).then(
      response => {
        if (!response.data) {
          Message.error('请求异常')
          reject(new Error('请求异常'))

          return
        }
        const { code, message } = response.data
        if (!code) {
          resolve(response.data)
          return
        }

        Message.error(message)
        reject(new Error(message))
      },
      err => {
        const errResp = err.response
        if (!errResp) {
          Message.error('网络异常')
          reject(new Error('网络异常'))
          return
        }

        if (errResp.status === 504) {
          Message.error('网关超时')
          reject(new Error('网关超时'))
          return
        }
        Message.error('网络异常')
        reject(new Error('网络异常'))
      }
    )
  })
}
