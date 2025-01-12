<template>
    <Teleport to="body">
        <itab-wallpaper url="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5ggol7.png?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_95/format,webp"> </itab-wallpaper>
    </Teleport>
    <AppSider
        v-model="cur"
        v-model:siderList="siderList"
        @updateTranslateY="
            () => {
                appMain.updateTranslateY();
            }
        "
    ></AppSider>
    <AppMain ref="appMain" v-model="cur" :siderList="siderList"></AppMain>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppMain from "./AppMain.vue";
import AppSider from "./AppSider.vue";

const appMain = ref<any>();
const cur = ref({
    current: "首页",
    currentTab: 0,
});

const siderList = ref([
    {
        title: "首页",
        icon: "red",
        id: "首页",
    },
    {
        title: "程序员",
        icon: "pink",
        id: "程序员",
    },
    {
        title: "设计",
        icon: "green",
        id: "设计",
    },
    {
        title: "摸鱼",
        icon: "blue",
        id: "摸鱼",
    },
    {
        title: "软件工具",
        icon: "orange",
        id: "软件工具",
    },
]);

//拖拽
</script>
<style scoped></style>
