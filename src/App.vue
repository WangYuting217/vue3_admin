<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
import request from '@/utils/resquest'
import { onMounted } from 'vue';
import useUserStore from './store/modules/user';

const userStore = useUserStore()

//当组件挂载完毕测试发一个请求
onMounted(() => {
    // request({
    //     url: '/user/login',
    //     method: 'post',
    //     data: {
    //         username: 'admin',
    //         password: '111111'
    //     }
    // }).then(res => {
    //     //console.log(res)
    // })
})
</script>

<style scoped></style>