import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: '/prod-api'
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // if (localStorage.getItem('Authorization')) {
        //     config.headers.Authorization = localStorage.getItem('Authorization');
        // }
        return config;
        //     error => {
        //         return Promise.reject(error);
        //     },
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res
    })

    //发送真正的网络请求
    return instance(config)
}