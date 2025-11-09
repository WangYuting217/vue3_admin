<template>
    <el-form label-width="100px" style="max-width: 600px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" v-model="spuParams.spuName" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="spuParams.tmId" placeholder="请你选择品牌" style="width:150px">
                <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input v-model="spuParams.description" placeholder="请你输入描述" type="textarea" />
        </el-form-item>
        <el-form-item label="SPU照片">
            <!--v-model:file-list 展示默认图片
            action 上传图片的接口地址:图片上传路径书写/api,代理服务器
            list-type  文件展示的样子
            :on-preview 点击文件列表中已上传的文件时的钩子
            :on-remove 文件列表移除文件时的钩子-->
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload/" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!--销售属性下拉菜单-->
            <el-select v-model="saleAttrIdAndName"
                :placeholder="unSelectSaleAttr ? `还未选择${unSelectSaleAttr.length}个` : '无'" style="width:150px">
                <!--收集未选择的销售属性id和名字，用:进行分开-->
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                    :label="item.name" />
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndName ? false : true" style="margin-left:10px;"
                type="primary" size="default" icon="plus">添加销售属性</el-button>
            <!--table展示销售属性与属性值-->
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!--row当前spu已有的销售属性对象-->
                    <template #="{ row, $index }">
                        <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin: 0px 3px;"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input v-model="row.saleAttrValue" v-if="row.flag == true" @blur="toLook(row)"
                            placeholder="请输入"></el-input>
                        <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, index }">
                        <el-button type="danger" size="small" icon="Delete"
                            @click="saleAttr.splice(index, 1)"></el-button>
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
import { ref, computed } from 'vue';
import { reqAllTrademark, reqSpuImageList, reqSpuSaleArr, reqAllSaleAttr } from '@/api/product/spu/index'
import type { SpuData, HasSaleAttr, SaleAttr, SpuImg, TradeMark, AllTradeMark, SpuHadImg, SaleAttrResponseData, HasSaleAttrResponseDada, SaleAttrValue } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changescene'])
//点击取消按钮：通知父组件切换场景1，展示 spu属性
const cancel = () => {
    $emit('changescene', 0)
}
//存储已有spu数据
let AllTradeMark = ref<TradeMark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//以显示的销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部销售数据
let AllsaleAttr = ref<HasSaleAttr[]>([])
//存储已有的spu对象
let spuParams = ref<SpuData>({
    category3Id: '',//收集的三级分类id
    spuName: '',//spu名字
    description: '',//描述
    tmId: '',//品牌id
    spuImageList: [],
    spuSaleAttrList: []
})
//收集还未选择的销售属性id与名字
let saleAttrIdAndName = ref<string>('')
//点击图片弹出的对话框隐藏与显示控制
let dialogVisible = ref<boolean>(false)
//存储图片预览地址
let dialogImageUrl = ref<string>('')
//子组件发请求
const initHaSpuData = async (spu: SpuData) => {
    //存储已有的spu对象,将来在模板中展示
    spuParams.value = spu
    //spu:即为父组件传递过来的已有的SPU对象[不完整]
    //获取全部品牌数据
    let result: AllTradeMark = await reqAllTrademark();
    //获取图片
    let result1: SpuHadImg = await reqSpuImageList((spu.id as number));
    //获取已有的销售数据
    let result2: SaleAttrResponseData = await reqSpuSaleArr((spu.id as number));
    //获取整个销售数据
    let result3: HasSaleAttrResponseDada = await reqAllSaleAttr();
    //存储全部品牌,图片，销售属性的数据
    AllTradeMark.value = result.data
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    saleAttr.value = result2.data
    AllsaleAttr.value = result3.data
}
//点击照片墙预览时触发的钩子
const handlePictureCardPreview = (file: any) => {
    //对话框弹出
    dialogVisible.value = true
    //照片地址赋值
    dialogImageUrl.value = file.url
}
//点击照片墙文件移除时触发的钩子
const handleRemove = () => {

}
//上传图片之前触发的钩子约束文件大小和类型
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件务必小于3兆'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必使PNG|JPG|GIF'
        });

    }
}
//计算当前spu还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部销售属性：颜色，版本，尺码
    //已有销售属性：颜色，版本
    let unSelectAttr = AllsaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectAttr
})
//添加销售属性按钮
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
    //准备新的销售属性对象带给服务器
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleAttr.value.push(newSaleAttr)
    //清空收集的数据
    saleAttrIdAndName.value = ''
}
//点击+按钮回调,变成编辑模式
const toEdit = (row: SaleAttr) => {
    //点击按钮时,变为编辑模式
    row.flag = true
    row.saleAttrValue = ''
}
//表单失焦点后变为查看模式
const toLook = (row: SaleAttr) => {
    row.flag = false
    //收集属性值的id和属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row
    //整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    //非法情况判断
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    //判断属性值是否在数组当中存在
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return
    }
    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
}
//对外暴露
defineExpose({ initHaSpuData })
</script>

<style scoped></style>