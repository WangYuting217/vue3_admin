<template>
    <el-card>
        <!--卡片顶部添加品牌按钮-->
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!--表格组件：用于展示已有平台数据
            table
                border:设置表格纵向是否有边框
            table-column 列
                lable:某一哥列表
                width:这个列表的宽
                align:这一列的对齐方式-->
        <el-table style="margin: 10px 0px" border>
            <el-table-column label="序号" width="80px" align="center" />
            <el-table-column label="品牌名称" />
            <el-table-column label="品牌LOGO" />
            <el-table-column label="品牌操作" />
        </el-table>
        <!--分页器组件
            pagination
                v-model:current-page 分页器当前页码
                v-model:page-size 每页显示数据条数
                :page-sizes 下拉菜单数据
                :background 分页器按钮背景色
                layout 分页器六个子组件的布局调整-->
        <el-pagination v-model:current-page="page" v-model:page-size="limit"
            :page-sizes="[3,5,7,9]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total " :total="400"/>
    </el-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
//当前页码
let page = ref<number>(1)
//每一页展示多少条数据
let limit = ref<number>(3)
</script>

<style scoped></style>