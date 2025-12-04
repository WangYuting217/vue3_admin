<template>
    <!--label-width 统一文字大小，表单就会变整齐-->
    <el-form label-width="100px" style="max-width: 600px">
        <el-form-item label="sku名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName" />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price" />
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight" />
        </el-form-item>
        <el-form-item label="sku描述">
            <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc" />
        </el-form-item>
        <el-form-item label="平台属性">
            <!--inline=true 竖着排列变为横向排列-->
            <el-form :inline="true" label-width="75px">
                <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                    <!--v-model="item.attrIdAndValueId可以直接给对象添加一个新属性"-->
                    <el-select v-model="item.attrIdAndValueId" style="width: 130px;">
                        <el-option :value="`${item.id}:${attrValue.id}`"
                            v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id"
                            :label="attrValue.valueName" placeholder="请选择"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form-item v-for="(item, index) in saleAttr" :key="item.id" :label="item.saleAttrName">
                <el-select v-model="item.saleIdAndValueId" style="width: 130px;">
                    <el-option :value="`${item.id}:${saleAttrValue.id}`"
                        v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                        :label="saleAttrValue.saleAttrValueName" placeholder="请选择"></el-option>
                </el-select>
            </el-form-item>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="image" ref="table">
                <el-table-column type="selection" width="80px" align="center"> </el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <el-image :src="row.imgUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
//引入请求API
import { reqAttr } from '@/api/product/attr/index'
import { reqAddSku, reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu/index'
import { SkuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
//自定义事件的方法
let $emit = defineEmits(['changescene'])
//创建空数组用于存储数据：平台属性  照片墙   销售属性数据
let attrArr = ref<any>([])
let image = ref<any>([])
let saleAttr = ref<any>([])
//获取table组件实列
let table = ref<any>()
//收集sku参数
let skuParams = reactive<SkuData>(
    {
        //父组件传来的数据
        category3Id: '',
        spuId: '',
        tmId: '',
        //v-model直接获取
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
    }
)
//点击取消按钮回调
const cancel = () => {
    $emit('changescene', { flag: 0, params: '' })
}
//添加一个新的sku,初始化请求方法
const initAddsku = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    //收集数据
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
    //获取平台属性数据
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    //获取照片墙数据
    let result1: any = await reqSpuImageList(spu.id)
    //获取对应的销售属性数据
    let result2: any = await reqSpuHasSaleAttr(spu.id)
    //存储数据：平台属性  照片墙   销售属性数据
    attrArr.value = result.data
    image.value = result1.data
    saleAttr.value = result2.data
}
//设置默认图片的方法回调
const handler = (row: any) => {
    //点击时，全部图片复选框不勾选
    image.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    });
    //选中的才勾选
    table.value.toggleRowSelection(row, true)
    //收集图片地址
    skuParams.skuDefaultImg = row.imgUrl
}
//点击保存按钮的方法
const save = async () => {
    //整理参数
    //1.平台属性
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, [])
    //2.销售属性
    skuParams.skuSaleAttrValueList = saleAttr.value.reduce((prev: any, next: any) => {
        if (next.saleAttrIdAndName) {
            let [saleAttrId, saleAttrValueId] = next.saleAttrIdAndName.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev;
    }, [])
    //发请求
    let result = await reqAddSku(skuParams)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        //通知父组件切换场景为0
        $emit('changescene', { falg: 0, params: '' })
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    } 
}
//对外暴露
defineExpose({ initAddsku })
</script>

<style scoped></style>