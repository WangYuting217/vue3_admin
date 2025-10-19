<template>
    <div>
        <!--三级分类全局组件-->
        <Category :scene="scene" />
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button @click="addAttr" type="primary" size="default" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
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
                            <el-button type="primary" size="small" icon="Edit" @click="addAttr"></el-button>
                            <el-button type="primary" size="small" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!--添加与修改属性-->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName" />
                    </el-form-item>
                </el-form>
                <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" icon="Plus"
                    @click="addAttrValue">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-table style="margin: 10px 0px;" border :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center">
                    </el-table-column>
                    <el-table-column label="属性值名称">
                        <!--row为当前属性值对象-->
                        <template #="{ row, $index }">
                            <el-input placeholder="请你输入属性值名称" v-model="row.valueName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
//组合式API函数watch
import { watch, ref, reactive } from 'vue';
//引入已有属性和属性值接口
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr';

//获取分类仓库
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
//存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
//卡片card组件内容切换变量
let scene = ref<number>(0)
//收集新增的属性数据
let attrParams = reactive<Attr>({
    attrName: '',//新增属性名字
    attrValueList: [],//新增属性值数组
    categoryId: '',//三级分类ID
    categoryLevel: 3,//三级分类
})
//监听仓库三级分类ID是否发生变化
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
//添加属性按钮回调
const addAttr = () => {
    //每一次添加之前清空上一次数据，在收集数据
    Object.assign(attrParams, {
        attrName: '',//新增属性名字
        attrValueList: [],//新增属性值数组
        categoryId: categoryStore.c3Id,//三级分类ID
        categoryLevel: 3,//三级分类
    })
    //切换添加与修改属性的结构
    scene.value = 1
}
//取消按钮回调
const cancel = () => {
    scene.value = 0
}
//添加属性值按钮回调
const addAttrValue = () => {
    //点击添加属性值时，向数组添加一个属性值对象
    attrParams.attrValueList.push({
        valueName: ''
    })
}
//保存按钮的回调
const save = async () => {
    //发请求
    let result = await reqAddOrUpdateAttr(attrParams)
    if (result.code == 200) {
        //切换场景
        scene.value = 0
        //提示信息
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        //获取全部的已有属性和属性值
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加成功'
        })
    }
}
</script>

<style scoped></style>