import { Modal } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import store from '../store'
import { logout } from '../store/actions/user'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import { request } from 'https'

interface IFResponseData {
  code: number,
  data?: any,
  message?: string
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000
})

let requestCount = 0

function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin size='large'/>, dom)
  }
  requestCount++
}

function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    setTimeout(() => {
      document.body.removeChild(document.getElementById('loading')!)
    }, 500)
  }
}

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().user.token
    if (token) {
      config.headers.Authorization = token
    }
    if (config.headers.isLoading !== false) {
      showLoading()
    }
    return config
  },
  (error) => {
    if (error.config.headers.isLoading !== false) {
      hideLoading()
    }
    // TODO: antd message box
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.headers.isLoading !== false) {
      hideLoading()
    }
    return response.data
    /* const res = response.data as IFResponseData
    if (res.code !== 20000) {
      // TODO: Message box
      return Promise.reject('error')
    } else {
      return response.data
    } */
  },
  (error) => {
    if (error.config.headers.isLoading !== false) {
      hideLoading()
    }
    const { status } = error.response
    if (status === 403) {
      Modal.confirm({
        title: "Are sure logout?",
        content:
          "you have been logout as you haven't react for a long time",
        okText: "relogin",
        cancelText: "cancel",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch<any>(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance