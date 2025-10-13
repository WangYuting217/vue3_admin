//属性相关的API文件
import request from "@/utils/resquest";
import type { CategoryResponseData } from "./type";
//枚举属性管理模块接口地址
enum API {
    //一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    //二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    //三级分类接口地址
    C3_url = '/admin/product/getCategory3/'
}
//一级分类接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//二级分类接口方法
export const reqC2 = (category1ID: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1ID)
//三级分类接口方法
export const reqC3 = (category2ID: number | string) => request.get<any, CategoryResponseData>(API.C3_url + category2ID)