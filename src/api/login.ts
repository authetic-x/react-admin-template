import axios from '../utils/axios'

export function loginRequest(data: any) {
  return axios({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logoutRequest(data: any) {
  return axios({
    url: '/api/logout',
    method: 'post',
    data
  })
}