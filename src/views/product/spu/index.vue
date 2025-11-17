<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <!--v-if|v-show都可以实现显示和隐藏，但if会销毁，show不会销毁，挂载一次就可隐藏显示-->
            <div v-show="scene == 0">
                <el-button @click="addSpu" type="primary" size="default" icon="Plus"
                    :disabled="categoryStory.c3Id ? false : true">添加SPU</el-button>
                <!--展示已有的SPU数据-->
                <el-table style="margin: 10px 0px;" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作">
                        <!--row为已有的sku对象-->
                        <template #="{ row, index }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSku(row)"></el-button>
                            <el-button @click="updateSpu(row)" type="primary" size="small" icon="Edit"
                                title="修改SPU"></el-button>
                            <el-button type="primary" size="small" icon="InfoFilled" title="查看SKU"></el-button>
                            <el-button type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页器-->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total " :total="total"
                    @current-change="getSpu" @size-change="changesize" />
            </div>
            <!--添加和修改spu-->
            <spuForm ref="spuform" v-show="scene == 1" @changescene="changescene"></spuForm>
            <!--添加sku-->
            <skuForm ref="skuform" v-show="scene == 2" @changescene="changescene"></skuForm>
        </el-card>
    </div>
</template>
<script setup lang='ts'>
import { ref, watch } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { Records, HasSpuResponseData, SpuData } from '@/api/product/spu/type';
import { reqHasSpu } from '@/api/product/spu';
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
//场景的数据
let scene = ref<number>(0) //0显示已有spu,1添加和修改spu,2添加sku结构
//分页器默认页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(3)
let categoryStory = useCategoryStore()
//存储已有的Spu数据
let records = ref<Records>([])
//存储已有spu总个数
let total = ref<number>(0)
//获取子组件实列spuform
let spuform = ref<any>()
//获取子组件实列skuform
let skuform = ref<any>()
//监听三级分类id是否发生变化
watch(() => categoryStory.c3Id, () => {
    records.value = []
    //务必有三级分类id
    if (!categoryStory.c3Id) return;
    getSpu()
})
//此方法可获得某一三级分类下的SPU
const getSpu = async (pager = 1) => { //默认第一页
    pageNo.value = pager
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStory.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
//此方法为一页多少个数据发生变化时重新发请求数据
const changesize = () => {
    getSpu()
}
//点击添加spu按钮回调
const addSpu = () => {
    //切换场景1，添加与修改已有的spu结构->spuForm
    scene.value = 1
    //点击添加spu按钮，调用子组件方法初始化数据
    spuform.value.initAddSpu(categoryStory.c3Id)
}
//修改spu按钮切换场景
const updateSpu = (row: SpuData) => {
    scene.value = 1
    //调取子组件实列方法获取完整的已有的spu数据
    spuform.value.initHaSpuData(row)
}
//子组件Spuform绑定的自定义事件：目的是子组件通知父组件场景为0
const changescene = (obj: any) => {
    //子组件supform点击取消按钮变为场景0，展示已有属性
    scene.value = obj.flag
    //保存成功调转页面0，再次获取全部的已有的spu
    if (obj.params == 'update') {
        //更新留在当页
        getSpu(pageNo.value)
    } else {
        //添加返回第一页
        getSpu()
    }
}
//点击添加sku按钮回调
const addSku = (row: SpuData) => {
    //点击添加sku回调按钮，切换场景2
    scene.value = 2
    //点击添加sku，调用子组件方法初始化数据
    skuform.value.initAddsku(categoryStory.c1Id, categoryStory.c2Id, row)
}
</script>

<style scoped></style>
