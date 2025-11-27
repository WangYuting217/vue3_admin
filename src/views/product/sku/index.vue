<template>
    <el-card>
        <el-table border style="margin: 10px 0px;" :data="skuArr">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" width="150px" show-overflow-tooltip prop="skuName"> </el-table-column>
            <el-table-column label="描述" width="150px" show-overflow-tooltip prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="150px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg"></img>
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" width="150px" prop="weight"></el-table-column>
            <el-table-column label="价格(元)" width="150px" prop="price"></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="250px">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
                        @click="updateSale(row)"></el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updatesku"></el-button>
                    <el-button type="primary" size="small" icon="InfoFilled"></el-button>
                    <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total " :total="total"
            @current-change="getHasSku" @size-change="handler" />
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { reqCancelSale, reqSaleSku, reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
//分页器当前页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(10)
//存储总个数
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
//组件挂载完毕就发请求
onMounted(() => {
    getHasSku()
})
//因为换页就需要发请求，所以封装在函数里
const getHasSku = async (pager = 1) => {
    //当前分页器的页码
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}
//分页器下拉菜单发生变化时触发
const handler = (pageSizes: number) => {
    getHasSku()
}
//商品的上架与下架
const updateSale = async (row: SkuData) => {
    //如果当前isSale说明当前商品为上架状态，需要发下架请求
    if (row.isSale == 1) {
        await reqCancelSale((row.id as number))
        //提示信息
        ElMessage({ type: 'success', message: '下架成功' })
        //发请求获取当前更新完毕的全部sku
        getHasSku(pageNo.value)
    } else {
        //如果当前isSale说明当前商品为下架状态，需要发上架请求
        await reqSaleSku((row.id as number))
        //提示信息
        ElMessage({ type: 'success', message: '上架成功' })
        //发请求获取当前更新完毕的全部sku
        getHasSku(pageNo.value)
    }
}
//编辑按钮
const updatesku = () => {
    ElMessage({ type: 'success', message: '程序员在努力的更新中...' })
}
</script>

<style scoped></style>