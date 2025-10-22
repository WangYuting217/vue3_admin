<template>
    <div>
        <el-card>
            <!--卡片顶部添加品牌按钮-->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
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
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.id}吗?`" width="250px" @confirm="deleteTramark(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
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
            <el-pagination @current-change="getHasTrademark" @size-change="sizeChange" v-model:current-page="page"
                v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
                layout="prev, pager, next, jumper,->,sizes,total " :total="total" />
        </el-card>
        <!--dialog对话框组件：添加品牌和修改已有品牌的时候
                v-model:用户控制对话框的显示与隐藏  true显示 false隐藏
                title:对话框左上角标题-->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!--upload组件属性：action图片上传路径书写/api,代理服务器 -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!--具名插槽：footer-->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqAddOrUpdateTrademark, reqHasTrademark, reDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkRespinseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage, type UploadProps } from 'element-plus'
import { Message } from '@element-plus/icons-vue/dist/types';
//当前页码
let page = ref<number>(1)
//每一页展示多少条数据
let limit = ref<number>(3)
//存储已有品牌数据的总数
let total = ref<number>(0)
//存储已有品牌数据
let trademarkArr = ref<Records>([])
//用户对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
//定义新增品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
//获取el-form组件实例
let formRef = ref()
//获取已有品牌的接口封装为一个函数：在任何情况下使用数据，调用函数即可
const getHasTrademark = async (pager = 1) => {
    page.value = pager
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

//分页器当前页码发生变化时触发
//对于当前页码发生变化自定义事件时，组件pagination父组件回传了数据(当前的页码)
//const changePages = () => {
//当页码发生变化时再次发请求获取对应已有品牌数据战术
//getHasTrademark()
//}
const sizeChange = () => {
    //当前每一页的数据量发生变化时，当前页码归1
    //page.value = 1
    getHasTrademark()
}

//添加品牌按钮的回调
const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true
    //清空收集数据
    trademarkParams.id = 0 //id得清空，以防用户上一步点击的修改，对话框题目还显示修品牌
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    /*第一种写法：ts问好法,有formRef调用clearValidate方法清除校验
    formRef.value?.clearValidate('logoUrl')
    formRef.value?.clearValidate('tmName')*/
    nextTick(() => { //nextTick更新后的dom,就有formRef了
        formRef.value.clearValidate('logoUrl')
        formRef.value.clearValidate('tmName')
    })

}
//修改品牌按钮时回调
//row：当前已有的品牌
const updateTrademark = (row: TradeMark) => {
    //对话框显示
    dialogFormVisible.value = true

    //展示已有品牌的数据
    //ES6合并对象代替后面三行代码trademarkParams.tmName/logoUrl/id = row.tmName/logoUrl/id
    Object.assign(trademarkParams, row)
    //清空校验规则错误提示信息
    nextTick(() => {
        formRef.value.clearValidate('logoUrl')
        formRef.value.clearValidate('tmName')
    })
}
//对话框取消按钮
const cancel = () => {
    //对话框隐藏
    dialogFormVisible.value = false
}
//对话框确认按钮
const confirm = async () => {
    //在发请求之前，对整个表单校验
    //调用这个方法进行全部表单项校验，校验全部通过在执行后面的语句
    await formRef.value.validate()
    let result: any = await reqAddOrUpdateTrademark(trademarkParams)
    //添加|修改品牌品牌成功
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false
        //弹出提交成功的提示信息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        //再次发请求获取已有全部的品牌数据
        getHasTrademark(trademarkParams.id ? page.value : 1)
    } else {
        //添加品牌失败
        //关闭对话框
        dialogFormVisible.value = false
        //弹出提交成功的提示信息
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        })
    }
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //钩子在图片上传之前触发,上传文件之前约束文件类型与大小
    //要求：上传文件格式png|jpg|gif 4M
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件大小小于4M'
            })
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式务必PNG|JPG|GIF'
        })
        return false;
    }
}

//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址，添加一个新的品牌时候带给服务器
    trademarkParams.logoUrl = response.data
    //图片上传成功，清除对应图片校验结果
    formRef.value.clearValidate('logoUrl')
}

//品牌名称自定义校验规则方法，失去焦点时执行
/*rule：规则对象    value:输入的内容     callBack:执行的函数  */
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}

//品牌LOGO图片的自定义校验规则
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack();
    } else {
        //校验未通过返回的错误提示信息
        callBack(new Error('LOGO图片务必上传'))
    }
}
//表单校验规则对象
const rules = {
    tmName: [
        //required：这个字段必须校验，表单项前面出来五角星
        //trigger：代表触发校验规则时机[blur,change]
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}

//删除品牌，气泡确认框的确定
const deleteTramark = async (id: number) => {
    let result = await reDeleteTrademark(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasTrademark(trademarkArr.value.length > 2 ? page.value : page.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
