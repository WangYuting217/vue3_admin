//SKU模块接口管理
import request from "@/utils/resquest";
import type { SkuResponseData } from './type'
//枚举相关地址
enum API {
    //获取已有的商品数据sku
    SKU_URL = '/admin/product/list/',
    //上架
    SALE_URL = '/admin/product/onSale/',
    //下架
    CANCEL_URL = '/admin/product/cancelSale/'
}

//获取sku接口
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//上架接口
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)
//下架接口
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCEL_URL + skuId)