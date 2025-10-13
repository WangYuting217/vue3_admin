<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select style="width:150px" v-model="categoryStore.c1ID">
                    <!--label：展示的数据,value:为select下拉菜单收集的数据-->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                        :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width:150px">
                    <el-option label="北京"></el-option>
                    <el-option label="上海"></el-option>
                    <el-option label="深圳"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width:150px">
                    <el-option label="北京"></el-option>
                    <el-option label="上海"></el-option>
                    <el-option label="深圳"></el-option>
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

</script>

<style scoped></style>