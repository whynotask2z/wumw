<template>
    <div class=" login_area">
        <a-space direction="vertical" :size="[0, 48]">
            <a-layout class="" hash-priority="high">
                <a-layout-header class="headerStyle">login</a-layout-header>
                <a-layout-content class="contentStyle"> <router-view></router-view></a-layout-content>
                <!-- <a-layout-footer class="footerStyle">Footer</a-layout-footer> -->
            </a-layout>
        </a-space>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.headerStyle {
    text-align: center;
    color: '#fff';
    height: 64px;
    // padding-inline: 50px;
    line-height: 64px;
    border-radius: 10px 10px 0 0;
    background-color: #cccccc;
}

:where(.css-dev-only-do-not-override-19iuou).ant-layout {
    border-radius: 10px;

}

.contentStyle {
    text-align: 'center';
    min-height: 120px;
    border-radius: 0 0 10px 10px;
    line-height: 120px;
    color: '#fff';
    // background-color: "#108ee9",
}



.footerStyle {
    text-align: 'center';
    color: '#fff';
    // background-color: '#cccccc',
}


.login_area {
    // width: 30%;

    display: flex;
    justify-content: center;
    align-content: center;
    // border-radius: 10px;
    // border: 1px solid pink
}

;
</style>