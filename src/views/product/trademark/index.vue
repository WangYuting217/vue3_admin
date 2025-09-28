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
        <el-table style="margin: 10px 0px" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index" />
            <!--table-column：默认展示数据div-->
            <el-table-column label="品牌名称">
                <template #="{ row, $index }">
                    <h1>{{ row.tmName }}</h1>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页器组件
            pagination
                v-model:current-page 分页器当前页码 
                v-model:page-size 每页显示数据条数
                :page-sizes 下拉菜单数据
                :background 分页器按钮背景色
                layout 分页器六个子组件的布局调整-->
        <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total " :total="total" />
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkRespinseData } from '@/api/product/trademark/type';
//当前页码
let page = ref<number>(1)
//每一页展示多少条数据
let limit = ref<number>(3)
//存储已有品牌数据的总数
let total = ref<number>(0)
//存储已有品牌数据
let trademarkArr = ref<Records>([])
//获取已有品牌的接口封装为一个函数：在任何情况下使用数据，调用函数即可
const getHasTrademark = async () => {
    let result: TradeMarkRespinseData = await reqHasTrademark(page.value, limit.value)
    if (result.code == 200) {
        //存储已有品牌的总个数
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
//组件挂载完毕--发一次请求，获取品牌数据
onMounted(() => {
    getHasTrademark()
})
</script>

<style scoped></style>
