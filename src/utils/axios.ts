import { Modal } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import store from '../store'
import { logout } from '../store/actions/user'

interface IFResponseData {
  code: number,
  data?: any,
  message?: string
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().user.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    // TODO: antd message box
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
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