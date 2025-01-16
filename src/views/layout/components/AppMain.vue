<template>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="handleWheel">
        <!-- <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker> -->
        <!-- 头部栏 -->
        <AppHeader />
        <!-- 时间栏 -->
        <AppDate />

        <!-- 搜索栏 -->
        <AppSearch />
        <!-- 图标列表 -->
        <AppGrid ref="appGrid" />
        <!-- 文心一言 -->
        <AppYiyan />
        <!-- 右键菜单 -->
        <GlobalContentMenu />
    </div>
</template>

<script lang="ts" setup>
import AppSearch from "./AppSearch.vue";
import AppGrid from "./AppGrid.vue";
import AppDate from "./AppDate.vue";
import AppYiyan from "./AppYiyan.vue";
import AppHeader from "./AppHeader.vue";
import GlobalContentMenu from "./GlobalContentMenu.vue";

const appGrid = ref<InstanceType<typeof AppGrid>>();
const handleWheel = (e: WheelEvent) => {
    appGrid.value!.debouncedHandleWheel(e);
};
</script>
<style scoped>
.app-main {
    z-index: 1;
}
</style>
