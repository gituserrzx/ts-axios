// import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type'
// import xhr from './core/xhr'
// import { transformRequestData } from './helpers/data'
// import { buildUrl } from './helpers/url'
// import { transformResponseData } from './helpers/data'
// import { processHeaders } from './helpers/header'
// function axios(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   console.log(xhr(config))
//   return  xhr(config).then(res => {
//     res.data = transformResData(res)
//     return res
//   })

// }
// function processConfig(config: AxiosRequestConfig): void {
//   config.url = transformURL(config)
//   config.headers = transfromHeaders(config)
//   config.data = transformData(config)
// }
// function transformURL(config: AxiosRequestConfig): string {
//   const { url, params } = config
//   return buildUrl(url!, params)
// }
// function transformData(config: AxiosRequestConfig): string {
//   return transformRequestData(config.data)
// }
// function transfromHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
// function transformResData(response: AxiosResponse): AxiosResponse {
//   return  response.data =  transformResponseData(response.data)
// }

import { AxiosStatic, AxiosRequestConfig } from './type'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios
