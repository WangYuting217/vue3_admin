<<<<<<< HEAD
<<<<<<< HEAD
//登录接口需要携带参数ts类型
=======
<<<<<<< HEAD
//登录接口需要携带参数ts类型
=======
//用户相关的数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
    username: string,
    password: String
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//定义登录接口返回数据类型      extends继承
export interface loginResponseData extends ResponseData {
    data: string,
}

//定义获取用户信息返回数据类型
export interface useInfoReponseData extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}

>>>>>>> 0cc4b7a (定义接口类型)
>>>>>>> 16dc8e3 (定义接口数据类型)
=======
//登录接口需要携带参数ts类型
>>>>>>> cd5d6a41c317693c78360ac39368762d8110234b
