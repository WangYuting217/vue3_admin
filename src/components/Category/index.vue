<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select style="width:150px" v-model="categoryStore.c1Id" @change="handle">
                    <!--label：展示的数据,value:为select下拉菜单收集的数据-->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                        :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width:150px" v-model="categoryStore.c2Id" @change="handle1">
                    <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                        :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width:150px" v-model="categoryStore.c3Id">
                    <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                        :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
//挂载完毕的方法
import { onMounted } from 'vue';
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category';
//获取仓库
let categoryStore = useCategoryStore()
//挂载完毕，通知仓库发请求获取一级分类数据
onMounted(() => {
    getC1()
})
//通知仓库发请求获取一级分类方法
const getC1 = () => {
    categoryStore.getC1()
}
//一级分类下拉菜单的change事件(选中值的时候触发，保证携带一级分类ID)
const handle = () => {
    //需将二级三级数据清空
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    categoryStore.getC2()

}
//二级分类下拉菜单的change事件(选中值时触发，保证携带二级分类ID)
const handle1 = () => {
    //清空三级分类数据
    categoryStore.c3Id = ''
    categoryStore.getC3()
}
</script>

<style scoped></style>