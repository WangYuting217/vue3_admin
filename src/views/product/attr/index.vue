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
                    @click="addAttrValue()">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-table style="margin: 10px 0px;" border :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center">
                    </el-table-column>
                    <el-table-column label="属性值名称">
                        <!--row为当前属性值对象-->
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => { inputArr[$index] = vc }" v-if="row.flag" @blur="toLook(row, $index)"
                                size="small" placeholder="请你输入属性值名称" v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{row,index}">
                            <el-button type="danger" size="small" icon="Delete" @click="attrParams.attrValueList.splice(index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
//组合式API函数watch
import { watch, ref, reactive, nextTick } from 'vue';
//引入已有属性和属性值接口
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr';

//获取分类仓库
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
//存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
//动态响应卡片card组件内容切换变量
let scene = ref<number>(1)
//收集新增的属性数据
let attrParams = reactive<Attr>({
    attrName: '',//新增属性名字
    attrValueList: [],//新增属性值数组
    categoryId: '',//三级分类ID
    categoryLevel: 3,//三级分类
})
//动态响应编辑模式和展示模式
let flag = ref<boolean>(true)
//动态响应ref数据
let inputArr = ref<any>([])
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
        valueName: '',
        flag: true //控制每一个属性值的编辑模式和展示模式
    })
    //获取最后el-input组件焦点
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
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
//输入属性值后失去焦点回调
const toLook = (row: AttrValue, $index: number) => {
    //非法情况判断1,属性值不能为空
    if (row.valueName.trim() == '') {
        //删除掉空的属性值
        attrParams.attrValueList.splice($index, 1)
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    //非法情况2，不能重复
    let repeat = attrParams.attrValueList.find((item) => {
        //将当前失去焦点的属性值对象从当前数组扣除去判断
        if (item != row) {
            return item.valueName === row.valueName;
        }
    })
    if (repeat) {
        //将重复的属性值从数组中干掉
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }
    //变成展示模式
    row.flag = false
}
//展示模式点击变回编辑模式
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true
    //响应式数据发生变化，获取更新的DOM(组件实例)
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
</script>

<style scoped></style>