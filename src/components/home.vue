<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :openKeys="openKeys"
                @openChange="menuChange" @click="menuClikck">
                <a-menu-item key="index-welcome">
                    <pie-chart-outlined />
                    <span>welcome 2</span>
                </a-menu-item>

                <a-sub-menu key="iot">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>设备管理</span>
                        </span>
                    </template>
                    <a-menu-item key="iot-product">
                        <template #icon> <video-camera-outlined /> </template>通用模型
                    </a-menu-item>
                    <a-menu-item key="iot-category"> <template #icon> <video-camera-outlined />
                        </template>产品分类</a-menu-item>
                    <a-menu-item key="5"> <template #icon> <video-camera-outlined /> </template>产品管理</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>系统管理</span>
                        </span>
                    </template>
                    <a-menu-item key="6">系统管理 1</a-menu-item>
                    <a-menu-item key="8">系统管理 2</a-menu-item>
                </a-sub-menu>

            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layoutHeader" style="">
                <header-layout v-model:collapsed="collapsed" />
                <!-- <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
                <a-breadcrumb style="margin: 20px ">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
            </a-layout-header>

            <a-layout-content style="margin: 0 16px">

                <router-view />
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import HeaderLayout from './HeaderLayout.vue';
import {
    UserOutlined,
    PieChartOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()
const collapsed = ref(false);

//selectedKeys初始值通过路由获取可以使刷新后也打开之前的页
let name = route.name || 'index-welcome';
//根据路由获取需要展开的侧边栏项
let suffix = name.split('-')[0];
const selectedKeys = ref([name]);
const openKeys = ref(suffix == 'index' ? [] : [suffix]);

//实现侧边栏同时只会展开一个，其他的都会收起
const menuChange = keys => {
    let len = keys.length;
    if (len === 0) return;
    openKeys.value = [keys[len - 1]]
}
const menuClikck = ({ item, key, keyPath }) => {
    key = '/' + key.replace('-', '/')
    console.log(key, "key");
    if (route.path !== key) router.push(key)
}

</script>
<style scoped>
.layoutHeader {
    display: flex;
    background-color: #ffff
}

#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>