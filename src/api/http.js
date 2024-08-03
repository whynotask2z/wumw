import axios from "axios";
import { message } from "ant-design-vue";
const http = axios.create({
    baseURL: "",
    timeout: 3000
})
const safeURL = ['/captchaImage', "/login"]
http.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    let url = config.url;
    url = url.replace(/^\/[^\/]+/, "")
    if (safeURL.includes(url)) {
        //no token
        config.headers['isToken'] = 'false';
    } else {
        //need token
        let token = localStorage.getItem("TK");
        if (token) {
            config.headers["Authorization"] = token;
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http;