import Mock from 'mockjs'
import loginApi from './login'

// user api
Mock.mock(/\/api\/login/, 'post', loginApi.login)
Mock.mock(/\/api\/logout/, 'post', loginApi.logout)

export default Mock