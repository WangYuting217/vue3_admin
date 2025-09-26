//统一管理用户相关的接口
import request from "@/utils/resquest";
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import type { loginFormData, loginResponseData, useInfoReponseData } from "./type";
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
//枚举用户相关的请求地址
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
    LOGOUT_URL="/admin/acl/index/logout"
}
//登录接口
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = ()=>request.get<any,any>(API.USERINFO_URL)
//退出登录
<<<<<<< HEAD
<<<<<<< HEAD
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)
=======
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)
=======
    LOGOUT_URL = "/admin/acl/index/logout"
}
//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () => request.get<any, useInfoReponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
