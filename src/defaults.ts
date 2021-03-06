import { AxiosRequestConfig } from './type'
import { processHeaders } from './helpers/header'
import { transformRequestData, transformResponseData } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any) {
      processHeaders(headers, data)
      return transformRequestData(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponseData(data)
    }
  ]
}
const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default defaults
