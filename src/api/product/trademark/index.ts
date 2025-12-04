//品牌管理模块接口
import request from '@/utils/resquest'
import type { TradeMarkRespinseData, TradeMark } from './type'
//枚举品牌管理模块接口地址
enum API {
    // 获取已有品牌接口（分页）:
    TRADEMARK_URL = "/admin/product/baseTrademark",
    //添加品牌接口
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    //修改品牌接口
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    // 删除品牌接口: /admin/product/baseTrademark/remove/{id}
    DELETE_URL = '/admin/product/baseTrademark/remove/'
}
//获取已有品牌接口方法
// page: 获取第几页
// limit: 每页条数
export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TradeMarkRespinseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)

//添加与修改已有品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        //修改已有品牌
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        //新增品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

//删除品牌接口方法
export const reDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id)