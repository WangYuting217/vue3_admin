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
    tmId: number,                   //品牌id
    spuSaleAttrList: null,
    spuImageList: null
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