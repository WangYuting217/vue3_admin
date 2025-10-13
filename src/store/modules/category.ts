//属性管理中三级分类的小仓库
import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";
import type { CategorySate } from "./types/type";
import { CategoryResponseData } from "@/api/product/attr/type";
//创建小仓库
const useCategoryStore = defineStore('category', {
    state: (): CategorySate => {
        return {
            //存储一级分类数据
            c1Arr: [],
            //存储一级分类的id
            c1Id: ''
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
        }
    },
    getters: {

    }
})
export default useCategoryStore
