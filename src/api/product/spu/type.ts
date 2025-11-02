//服务器全部接口返回的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
//spu数据类型
export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | string,           //品牌id
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImg[]
}
//数组：元素都是spu数据类型
export type Records = SpuData[];
//已有SPU接口返回数据类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
//所有品牌数据的类型
export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}
//所有品牌接口返回类型
export interface AllTradeMark extends ResponseData {
    data: TradeMark[]
}
//商品图片的类型
export interface SpuImg {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    imgName: string,
    imgUrl: string
}
//spu图片墙返回数据类型
export interface SpuHadImg extends ResponseData {
    data: SpuImg[]
}
//sku销售属性值对象类型
export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    baseSaleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}
//sku销售属性值数组类型
export type SaleAttrValueList = SaleAttrValue[]
//sku销售属性对象
export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SaleAttrValueList
}
//spu销售属性接口返回数据类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}
//全部销售属性数据的类型
export interface HasSaleAttr {
    id: number,
    name: string
}
//全部销售属性返回数据的类型
export interface HasSaleAttrResponseDada extends ResponseData {
    data: HasSaleAttr[]
}