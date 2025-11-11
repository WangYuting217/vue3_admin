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
            <el-form :inline="true">
                <el-form-item label="手机一级">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电池容量">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运行内存">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机身内存">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="CPU型号">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="屏幕尺寸">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form-item label="颜色">
                <el-select placeholder="请选择" style="width: 150px;">
                    <el-option></el-option>
                </el-select>
            </el-form-item>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border>
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片"></el-table-column>
                <el-table-column label="名称"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
let $emit = defineEmits(['changescene'])
//点击取消按钮回调
const cancel = () => {
    $emit('changescene', { flag: 0, params: '' })
}
</script>

<style scoped></style>