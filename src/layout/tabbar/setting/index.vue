<template>
    <el-button size='small' icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size='small' icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size='small' icon="Setting" circle></el-button>
    <img :src="useStore.avatar" style="width: 24px;height: 24px;margin: 0px 10px;border-radius:50%;"></img>
    <!--下拉菜单-->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ useStore.username }}
            <el-icon>
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
//获取用户相关小仓库
import useUserStore from '@/store/modules/user';
//获取更新按钮的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayOutSettingStore()
let useStore = useUserStore()
//获取路由器对象
let router = useRouter()
//获取路由对象
let route = useRoute()
//点击按钮，更换刷新属性
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏按钮
const fullScreen = () => {
    //DOM对象的一个属性：可以用来判断当前是不是全屏[全屏:true,不是全屏:false]
    let full = document.fullscreenElement;
    if (!full) {
        //文档跟节点的方法requestFullscreen,实现全屏
        document.documentElement.requestFullscreen();
    } else {
        //不是全屏模式-->退出全屏
        document.exitFullscreen();
    }
}
//退出登录点击回调
const logout = async () => {
    //第一：向服务器发请求[退出登录接口]   不需要做
    //第二：仓库关于用户相关的数据清空[token|username|avatar]
    //第三：跳转到登陆页面
    await useStore.userLogout()
    //跳转到登陆页面
    router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
}</script>
<style scoped></style>
