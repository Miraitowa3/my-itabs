// src/utils/http.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import userStore from "@/stores/user";

// 定义接口返回的数据结构
interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: "/api", // 从环境变量中读取 API 基础地址
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const user = userStore();
        // 在发送请求之前做些什么，例如添加 token
        const token = user.token;
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<any>) => {

        // 对响应数据做点什么
        const res = response.data;

        return res;
    },
    (error: AxiosError) => {

        if (error.status === 401 ) {
            userStore().setToken(null);
            ElMessage.error("登录失效，请重新登录");
        }
        // 对响应错误做点什么
        console.error(error.message || "Error");
        return Promise.reject(error);
    },
);

// 封装 GET 请求
export function get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.get<T, T>(url, config);
}

// 封装 POST 请求
export function post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.post<T, T>(url, data, config);
}

// 封装 PUT 请求
export function put<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.put<T, T>(url, data, config);
}

// 封装 DELETE 请求
export function del<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.delete<T, T>(url, config);
}

export default service;
