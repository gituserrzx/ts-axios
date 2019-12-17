import { AxiosRequestConfig } from './type'
import xhr from './xhr'
import { transformRequestData } from './helpers/data'
import { buildUrl } from './helpers/url'
import { processHeaders } from './helpers/header'
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transfromHeaders(config)
  config.data = transformData(config)
  console.log(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}
function transformData(config: AxiosRequestConfig): string {
  return transformRequestData(config.data)
}
function transfromHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
