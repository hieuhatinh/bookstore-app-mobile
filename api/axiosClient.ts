import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://10.0.2.2:3100/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add a request interceptor
// axiosClient.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent
//         return config
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error)
//     },
// )

// axiosClient.interceptors.response.use(
//     function (response) {
//         return response.data
//     },
//     function (error) {
//         return Promise.reject(error)
//     },
// )

export default axiosClient
