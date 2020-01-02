import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../type'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { flatHeaders } from '../helpers/header'
import transform from './transform'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    transformResData(res)
    return res
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flatHeaders(config.headers, config.method!)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformResData(response: AxiosResponse): AxiosResponse {
  return (response.data = transform(
    response.data,
    response.headers,
    response.config.transformResponse
  ))
}
export default dispatchRequest
