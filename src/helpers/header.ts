import { isPlainObject, deepMerge } from './util'
import { Method } from '../type'
function normalizedHeaderName(header: any, normalizedName: string): void {
  if (!header) {
    return
  }
  Object.keys(header).forEach(name => {
    if (name != normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      header[normalizedName] = header[name]
      delete header[name]
    }
  })
}
export function processHeaders(header: any, data: string): object {
  normalizedHeaderName(header, 'Content-Type')
  if (isPlainObject(data)) {
    if (header && !header['Content-Type']) {
      header['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return header
}
export function parseHeaders(headers: string) {
  var params = Object.create(null)
  if (!headers) {
    return params
  }
  headers.split('\r\n').forEach(item => {
    let [key, value] = item.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    params[key] = value
  })
  return params
}
export function flatHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'patch', 'options', 'put', 'post', 'common']
  methodsToDelete.forEach(key => {
    delete headers[key]
  })
  return headers
}
