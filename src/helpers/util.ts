const toString = Object.prototype.toString
export const isDate = function(val: any): val is Date {
  return toString.call(val) == '[object Date]'
}
export const isObject = function(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
export const isPlainObject = function(val: any): val is Object {
  return toString.call(val) == '[object Object]'
}
