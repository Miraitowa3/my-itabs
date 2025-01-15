<template>
    <Teleport to="body">
        <itab-wallpaper url="https://files.codelife.cc/itab/defaultWallpaper/defaultWallpaper.webp"> </itab-wallpaper>
    </Teleport>
    <AppSider
        v-model="cur"
        v-model:siderList="siderList"
        :isSiderShow="isSiderShow"
        @updateTranslateY="
            () => {
                appMain.updateTranslateY();
            }
        "
    ></AppSider>
    <AppMain ref="appMain" v-model="cur" :siderList="siderList" v-model:isSiderShow="isSiderShow"></AppMain>
</template>

<script setup lang="ts">
import AppMain from "./AppMain.vue";
import AppSider from "./AppSider.vue";
import { navConfig } from "./config";
const isSiderShow = ref(true); //侧边栏是否显示

const appMain = ref<any>();
const cur = ref({
    current: navConfig[0].id,
    currentTab: 0,
});

const siderList = ref<any>(navConfig);

//拖拽
</script>
<style scoped></style>
