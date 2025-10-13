<template>
    <div>
        <!--三级分类全局组件-->
        <Category />
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" size="default" icon="Plus"
                :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
            <el-table style="margin: 10px 0px;" border>
                <el-table-column label="序号" width="80px" type="index" align="center" />
                <el-table-column label="属性名称" width="120px" />
                <el-table-column label="属性值名称" />
                <el-table-column label="操作" width="120px" />
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore()
</script>

<style scoped></style>