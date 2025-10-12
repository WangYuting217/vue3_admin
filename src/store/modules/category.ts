//属性管理中三级分类的小仓库
import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";
//创建小仓库
const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            //存储一级分类数据
            c1Arr: [],
            //存储一级分类的id
            c1ID: ''
        }
    },
    actions: {
        //获取一级分类方法
        async getC1() {
            //发请求获取一级分类的数据
            let result = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        }
    },
    getters: {

    }
})
export default useCategoryStore