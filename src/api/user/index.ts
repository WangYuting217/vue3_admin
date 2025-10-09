//统一管理用户相关的接口
import request from "@/utils/resquest";
import type { loginFormData, loginResponseData, useInfoReponseData } from "./type";
//枚举用户相关的请求地址（开发环境使用 mock: /api/user/*）
enum API {
    LOGIN_URL = "/user/login",
    USERINFO_URL = "/user/info",
    LOGOUT_URL = "/user/logout"
}
//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () => request.get<any, useInfoReponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)


