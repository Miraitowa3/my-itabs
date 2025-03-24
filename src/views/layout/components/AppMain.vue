<template>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="handleWheel">
        <!-- <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker> -->
        <!-- 头部栏 -->
        <AppHeader />
        <!-- 时间栏 -->
        <AppDate />

        <!-- 搜索栏 -->
        <AppSearch v-if="search.show" />
        <!-- 图标列表 -->
        <AppGrid ref="appGrid" />
        <!-- 文心一言 -->
        <AppYiyan v-if="layout.yiyan" />
        <!-- 右键菜单 -->
        <GlobalContentMenu ref="GlobalContentMenuRef" />
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { useSiderStore } from "@/stores/global";

const global = useSiderStore();
const { cur } = storeToRefs(global);
import AppSearch from "./AppSearch.vue";
import AppGrid from "./AppGrid.vue";
import AppDate from "./AppDate.vue";
import AppYiyan from "./AppYiyan.vue";
import AppHeader from "./AppHeader.vue";
import GlobalContentMenu from "./GlobalContentMenu.vue";
const baseConfigStore = useBaseConfigStore();
const { layout, search } = storeToRefs(baseConfigStore);
const appGrid = ref<InstanceType<typeof AppGrid>>();
const GlobalContentMenuRef = ref<InstanceType<typeof GlobalContentMenu>>();
const handleWheel = (e: WheelEvent) => {
    appGrid.value!.debouncedHandleWheel(e);
};
watch(
    () => cur.value,
    () => {
        if (GlobalContentMenuRef.value) {
            GlobalContentMenuRef.value.closeMenu();
        }
    },
    {
        deep: true,
    },
);
</script>
<style scoped>
.app-main {
    z-index: 1;
}
</style>
