import { isPlainObject } from './util'
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
