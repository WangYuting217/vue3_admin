//分类相关的数据ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//分类ts类型
export interface CategorObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

//相应分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
    data: CategorObj[]
}

//属性值对象的ts类型
export interface AttrValue {
    id: number,
    valueName: string,
    attrId: number
}
//存储每一个属性值对象的数组类型
export type AttrValueList = AttrValue[]
//属性对象类型
export interface Attr {
    id: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: AttrValueList
}
//存储每一个属性对象的数组类型
export type AttrList = Attr[]
//属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
    data: Attr[]
}