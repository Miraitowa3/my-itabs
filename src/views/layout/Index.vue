<template>
    <Teleport to="body">
        <itab-wallpaper
            url="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5ggol7.png?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_95/format,webp"
        >
        </itab-wallpaper>
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
import { navConfig } from "./config";

const appMain = ref<any>();
const cur = ref({
    current: navConfig[0].id,
    currentTab: 0,
});

const siderList = ref<any>(navConfig);

//拖拽
</script>
<style scoped></style>
