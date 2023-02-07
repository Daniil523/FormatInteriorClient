import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://termino523.beget.tech',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth-token')

    if (authToken) {
      config.headers.authorization = `Token ${authToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
