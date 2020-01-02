import { isPlainObject } from './util'
export function transformRequestData(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      //尝试转化成对象
      data = JSON.parse(data)
    } catch (e) {}
  }
  return data
}
