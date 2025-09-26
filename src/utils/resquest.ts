//进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'
//第一步:利用axios对象的create方法，去创建axios实列（其他的配置：基础的路径，超时的时间）
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API || '/api',//基础路径上都会携带/api
    timeout: 5000//超时的时间的设置
})

//第二部：request实列添加请求与响应拦截器
request.interceptors.request.use((config) => {
    //获取用户相关的小仓库：获取仓库内部的token，登陆成功以后带给服务器
    let userStore = useUserStore()
    if(userStore.token){
        config.headers.token = userStore.token
    }
    //config配置对象，heards属性请求头，经常给服务器端携带请求头
    //返回配置对象
    return config;
})

//第三步：响应拦截器
request.interceptors.response.use((response) => {
    //成功回调
    //简化数据
    return response.data
}, (error) => {
    //失败回调：处理http网络错误的
    //定义一个变量：存储网络错误的信息
    let message = ''
    
    //安全地访问错误状态码
    let status = error.response?.status
    
    if (status) {
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break;
            case 403:
                message = '无权访问'
                break;
            case 404:
                message = '请求地址错误'
                break;
            case 500:
                message = '服务器出现问题'
                break;
            default:
                message = '无网络'
        }
    } else {
        message = '网络连接失败'
    }
    
    //提示的错误信息
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})

//对外暴露
export default request