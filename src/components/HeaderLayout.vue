<template>
    <div>
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="emit('update:collapsed', false)" />
        <menu-fold-outlined v-else class="trigger" @click="emit('update:collapsed', true)" />
    </div>
</template>

<script setup>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
//接受属性 自定义事件「通过子组件执行emit的update方法修改父组件传递collapsed的值来实现展开和关闭，」
defineProps(['collapsed']);
const emit = defineEmits(['update:collapsed'])
</script>

<style lang="less" scoped></style>