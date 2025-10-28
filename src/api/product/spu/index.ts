//SPU管理模块的地址
import request from "@/utils/resquest";
import { HasSpuResponseData, AllTradeMark, SpuHadImg, SaleAttrResponseData, HasSaleAttrResponseDada } from "./type";
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
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList/'
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