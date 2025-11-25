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
                    <el-button type="primary" size="small" icoon="Top"></el-button>
                    <el-button type="primary" size="small" icoon="Edit"></el-button>
                    <el-button type="primary" size="small" icoon="InfoFilled"></el-button>
                    <el-button type="primary" size="small" icoon="Delete"></el-button>
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
import { reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
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
</script>

<style scoped></style>