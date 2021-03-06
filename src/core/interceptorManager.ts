import { RejcetedFn, ResolvedFn } from '../type'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejcetedFn
}
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejcetedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
