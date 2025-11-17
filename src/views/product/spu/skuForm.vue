<template>
    <!--label-width 统一文字大小，表单就会变整齐-->
    <el-form label-width="100px" style="max-width: 600px">
        <el-form-item label="sku名称">
            <el-input placeholder="SKU名称" />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" />
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" />
        </el-form-item>
        <el-form-item label="sku描述">
            <el-input placeholder="sku描述" type="textarea" />
        </el-form-item>
        <el-form-item label="平台属性">
            <!--inline=true 竖着排列变为横向排列-->
            <el-form :inline="true" label-width="75px">
                <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select style="width: 130px;">
                        <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id"
                            :label="attrValue.valueName" placeholder="请选择"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form-item v-for="(item, index) in saleAttr" :key="item.id" :label="item.saleAttrName">
                <el-select placeholder="请选择" style="width: 130px;">
                    <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                        :label="saleAttrValue.saleAttrValueName"></el-option>
                </el-select>
            </el-form-item>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="image">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <el-image :src="row.imgUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
//引入请求API
import { reqAttr } from '@/api/product/attr/index'
import { reqSpuImageList, reqSpuSaleArr } from '@/api/product/spu/index'
import { ref } from 'vue';
//自定义事件的方法
let $emit = defineEmits(['changescene'])
//创建空数组用于存储数据：平台属性  照片墙   销售属性数据
let attrArr = ref<any>([])
let image = ref<any>([])
let saleAttr = ref<any>([])
//点击取消按钮回调
const cancel = () => {
    $emit('changescene', { flag: 0, params: '' })
}
//添加一个新的sku,初始化请求方法
const initAddsku = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    //获取平台属性数据
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    //获取照片墙数据
    let result1: any = await reqSpuImageList(spu.id)
    //获取对应的销售属性数据
    let result2: any = await reqSpuSaleArr(spu.id)
    //存储数据：平台属性  照片墙   销售属性数据
    attrArr.value = result.data
    image.value = result1.data
    saleAttr.value = result2.data
    console.log(result2)
}
//对外暴露
defineExpose({ initAddsku })
</script>

<style scoped></style>