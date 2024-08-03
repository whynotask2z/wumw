<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

</script>

<template>
  <a-config-provider :locale="zhCN">
    <!-- 一级路由 -->
    <RouterView />
  </a-config-provider>
</template>

<style lang="less" scoped></style>
