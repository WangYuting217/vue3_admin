<template>
    <div>
        <!--三级分类全局组件-->
        <Category />
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" size="default" icon="Plus"
                :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
            <el-table style="margin: 10px 0px;" border :data="attrArr">
                <el-table-column label="序号" width="80px" type="index" align="center" />
                <el-table-column label="属性名称" width="120px" prop="attrName" />
                <el-table-column label="属性值名称">
                    <template #="{ row, $index }">
                        <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{
                            item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <!--row:已有的属性对象-->
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit"></el-button>
                        <el-button type="primary" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
//组合式API函数watch
import { watch, ref } from 'vue';
//引入已有属性和属性值接口
import { reqAttr } from '@/api/product/attr';

//获取分类仓库
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr } from '@/api/product/attr/type';
let categoryStore = useCategoryStore()
//存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
watch(() => categoryStore.c3Id, () => {
    //清空上一次属性属性值
    attrArr.value = []
    //保证三级分类有了在发请求
    if (!categoryStore.c3Id) return;
    getAttr()
})
//获取已有品牌属性与属性值方法
const getAttr = async () => {
    //获取分类ID
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    //获取已有的属性和属性值
    await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
</script>

<style scoped></style>