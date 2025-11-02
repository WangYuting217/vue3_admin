//SPU管理模块的地址
import request from "@/utils/resquest";
import { SpuData, HasSpuResponseData, AllTradeMark, SpuHadImg, SaleAttrResponseData, HasSaleAttrResponseDada } from "./type";
enum API {
    //获取已有的SPU数据
    HASSPU_URL = '/admin/product/',
    //获取spu下拉商品数据
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    //获取spu下全部售卖商品的图片
    SPUIMAGE_URL = '/admin/product/spuImageList/',
    //获取spu下销售属性sku地址
    SPUSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    //获取全部销售属性数据[颜色，版本，尺码]
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    //追加一个新的spu
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    //更新已有的spu
    UPDATESPU_URL = '/admin/product/updateSpuInfo'
}
//获取某一个三级分类下SPU数据接口方法
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`)
//获取全部SPU品牌数据接口方法
export const reqAllTrademark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
//获取spu下售卖商品图片接口方法
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHadImg>(API.SPUIMAGE_URL + spuId)
//获取spu下销售属性sku接口方法
export const reqSpuSaleArr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUSALEATTR_URL + spuId)
//全部销售属性数据接口方法
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseDada>(API.ALLSALEATTR_URL)
//追加一个新的spu或更新spu     data:新增spu|已有的spu对象
export const reqAddSpuOrUpdataSpu = (data: SpuData) => {
    //如果有spu对象id，更新已有spu
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }
}
