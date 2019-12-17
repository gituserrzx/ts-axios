import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/$24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') //空格变加号
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  if (typeof params === 'string') {
    return url + params
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serialParams = parts.join('&')

  if (serialParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serialParams
  }
  return url
}
