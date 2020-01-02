import axios from '../../src/index'
import { config } from 'shelljs';

// interface ResponseData<T = any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/extend/user')
//     .then(res => res.data)
//     .catch(err => console.error(err))
// }


// async function test() {
//   const user = await getUser<User>()
//   if (user) {
//    console.log(user.result.name)
//   }
// }

// test()
// interface ResponseData<T = any> {
// 	code: number
// 	result: T
// 	message:string
// }
// interface User {
// 	name: string
// 	age: number
// }
// function getUser<T>() {
// 	return axios<ResponseData<T>>('/extend/user').then(res => res.data).catch(err => console.error(err))
// }
// async function test() {
// 	const user = await getUser<User>()
// 	if (user) {
// 		console.log(user.result.name)
// 	}
// }
// test()
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})
axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor =  axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})
axios.interceptors.response.eject(interceptor)
axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})