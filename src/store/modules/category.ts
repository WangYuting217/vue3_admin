//属性管理中三级分类的小仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import type { CategorySate } from "./types/type";
import { CategoryResponseData } from "@/api/product/attr/type";
//创建小仓库
const useCategoryStore = defineStore('category', {
    state: (): CategorySate => {
        return {
            //存储一级分类数据
            c1Arr: [],
            //存储一级分类的id
            c1Id: '',
            //存储二级分类数据
            c2Arr: [],
            c2Id: '', //二级分类id
            c3Arr: [], //三级分类数据
            c3Id: ''
        }
    },
    actions: {
        //获取一级分类方法
        async getC1() {
            //发请求获取一级分类的数据
            let result: CategoryResponseData = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        //二级分类方法
        async getC2() {
            //发请求获取二级分类的数据
            let result: CategoryResponseData = await reqC2(this.c1Id)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        //三级分类方法
        async getC3(){
            //发请求获取三级分类的数据
            let result:CategoryResponseData = await reqC3(this.c2Id)
            if(result.code == 200){
                this.c3Arr = result.data
            }
        }
    },
    getters: {

    }
})
export default useCategoryStore
