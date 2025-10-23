//SPU管理模块的地址
import request from "@/utils/resquest";
import { HasSpuResponseData } from "./type";
enum API {
    HASSPU_URL = '/admin/product/'
}
//获取某一个三级分类下SPU数据接口方法
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`)