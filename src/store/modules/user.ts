//创建用户相关的小仓库 
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import type { loginFormData, loginResponseData, useInfoReponseData } from "@/api/user/type";
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
import { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute } from '@/router/routes'
//创建小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
            username: '',
            avatar: ''
        }
    },
    //异步|逻辑的地方
    actions: {
        //用户登录的方法
<<<<<<< HEAD
<<<<<<< HEAD
        async userLogin(data: any) {
            //登录请求
            let result: any = await reqLogin(data);
=======
<<<<<<< HEAD
        async userLogin(data: any) {
            //登录请求
            let result: any = await reqLogin(data);
=======
        async userLogin(data: loginFormData) {
            //登录请求
            let result: loginResponseData = await reqLogin(data);
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
        async userLogin(data: any) {
            //登录请求
            let result: any = await reqLogin(data);
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
            //登录请求：成功200->token
            //登录请求：失败201->登陆失败错误的信息
            if (result.code == 200) {
                //pinia仓库存储token
                //由于pinia|vuex存储数据其实利用js对象
                this.token = (result.data as string)

                //本地存储持久化存储一份
                SET_TOKEN((result.data as string))
                //能保证当前async函数返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        //获取用户信息方法
        async userInfo() {
            //获取用户的信息进行存储仓库当中[用户头像，名字]
<<<<<<< HEAD
<<<<<<< HEAD
            let result = await reqUserInfo()
=======
<<<<<<< HEAD
            let result = await reqUserInfo()
=======
            let result: useInfoReponseData = await reqUserInfo()
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
            let result = await reqUserInfo()
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
            //如果获取用户信息成功，存储一下用户信息
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录
        async Logout() {
            //退出登录请求
<<<<<<< HEAD
<<<<<<< HEAD
            let result = await reqLogout()
=======
<<<<<<< HEAD
            let result = await reqLogout()
=======
            let result: any = await reqLogout()
>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
            let result = await reqLogout()
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
            if (result.code == 200) {
                this.token = ""
                this.username = ""
                this.avatar = ""
                REMOVE_TOKEN()
                return 'ok' //让组件判断退出成功还是失败，成功返回成功的promise
            } else {
                return Promise.reject(new Error(result.message))
            }
        }

    },
    getters: {

    }
})
//对外暴露获取小仓库方法
export default useUserStore