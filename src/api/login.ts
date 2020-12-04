import axios from '../utils/axios'

export function login(data: any) {
  return axios({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout(data: any) {
  return axios({
    url: '/api/logout',
    method: 'post',
    data
  })
}