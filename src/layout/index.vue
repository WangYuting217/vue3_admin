<template>
    <div class="layout_container">
        <!--左侧菜单-->
        <div class="layout_slider">
            <logo></logo>
            <!--左侧菜单静态搭建-->
            <!--滚动组件-->
            <el-scrollbar class="scrollbar">
                <!--菜单组件-->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="route.path"
                    background-color="#001529" text-color="white" active-text-color="yellowgreen">
                    <!--根据路由动态生成菜单-->
                    <AppMenu :menuList="userStore.menuRoutes"></AppMenu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!--顶部导航-->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!--导航组件-->
            <Tabbar></Tabbar>
        </div>
        <!--内容展示区-->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入菜单组件
import AppMenu from './menu/index.vue'
//右侧内容的展示区
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//获取路由组件
import { useRoute } from 'vue-router'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
let route = useRoute()
</script>
<script lang='ts'>
export default {
    name: 'layout'
}
</script>
<style scoped lang='scss'>
.layout_container {
    width: 100%;
    height: 100vh;
}

.layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .el-menu {
            border-right: none;
        }
    }
}

.layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}

.layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    background-color: white;
    transition: all 0.3s;

    &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}
</style>
