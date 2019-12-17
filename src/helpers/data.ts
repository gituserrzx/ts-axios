import { isPlainObject } from './util'
export function transformRequestData(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
