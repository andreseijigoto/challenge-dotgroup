import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000
})

const getAuthorizationToken = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_TOKEN_API}`

  return config
}

baseApi?.interceptors.request.use(getAuthorizationToken, (error) => Promise.reject(error))

export { baseApi }
