<template>
    <ContentMenu containerRef="#app-main" :hanlderCallback="hanlderCallback" ref="contentMenu">
        <ul class="menu-list">
            <li class="menu-item hover flex justify-between" @click="showAdd = true">
                <span class="menu-item-title text-[12px]">添加图标</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="add" />
                </i>
            </li>
            <li class="menu-item hover flex justify-between" @click.top="changeWallpaper">
                <span class="menu-item-title text-[12px]">换壁纸</span>
                <span class="flex">
                    <i class="menu-item-icon wall-icon text-[15px]" @click.stop="downLoad">
                        <svg-icon name="menu-download" />
                    </i>
                    <i class="menu-item-icon wall-icon text-[15px]">
                        <svg-icon name="sider-xin" />
                    </i>
                </span>
            </li>
            <li class="menu-item hover flex justify-between">
                <span class="menu-item-title text-[12px]">本地搜索</span>
                <span class="menu-item-icon search-icon"> Ctrl+F </span>
            </li>
            <li class="menu-item hover flex justify-between" v-loading.fullscreen.lock="loading" element-loading-text="数据同步中" @click="unableBackUp">
                <span class="menu-item-title text-[12px]">立即备份</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-beifen" />
                </i>
            </li>
            <li class="menu-item hover flex justify-between" @click.stop="showSetting = true">
                <span class="menu-item-title text-[12px]">设置</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-setting" />
                </i>
            </li>
        </ul>
    </ContentMenu>
    <Setting v-model="showSetting"></Setting>

    <AddIcon v-model="showAdd" />
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { useGlobalStore } from "@/stores/global";
import { updateConfig } from "@/api/user";

import AddIcon from "./components/AddIcon.vue";
import Setting from "@/views/system/Setting.vue";
const baseConfigStore = useBaseConfigStore();
const globalStore = useGlobalStore();
const { wallpaper, icon, sidebar, layout, open, search, time, searchEngine, useSearch, theme } = storeToRefs(baseConfigStore);
const { navConfig } = storeToRefs(globalStore);
const loading = ref(false);
const contentMenu = ref<any>();
const whiteClass = ["app-item-icon", "yiyan-text", "yiyan-from", "se-input", "search-icon", "item-icon-text"];
const showAdd = ref(false);
const showSetting = ref(false);
function hanlderCallback(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const classes = (target.getAttribute("class") || "").split(" ");

    if (classes.some((cls) => whiteClass.includes(cls))) {
        return false;
    }
    return true;
}
function closeMenu() {
    contentMenu.value.closeMenu();
}
function changeWallpaper() {}
function unableBackUp() {
    loading.value = true;
    let data = {
        baseConfig: {
            icon: icon.value,
            sidebar: sidebar.value,
            layout: layout.value,
            open: open.value,
            search: search.value,
            time: time.value,
            searchEngine: searchEngine.value,
            useSearch: useSearch.value,
            theme: theme.value,
            wallpaper: wallpaper.value,
        },
        navConfig: navConfig.value,
    };
    updateConfig(data)
        .then((res: any) => {
            if (res.code === 200) {
                ElMessage.success("备份成功");
            } else {
                ElMessage.error("备份失败");
            }
        })
        .catch(() => {
            ElMessage.error("备份失败");
        })
        .finally(() => {
            loading.value = false;
        });
}
function downLoad() {
    window.open(wallpaper.value.src), "_blank";
}

defineExpose({ closeMenu });
</script>
<style scoped>
.menu-item-title {
    margin-left: 4px;
}
.menu-item {
    transition: background 0.2s;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    padding: 0 4px;
    cursor: pointer;
    margin: 4px 0;
    border-radius: 6px;
    margin-left: 4px;
    align-items: center;
}
.menu-item-title {
    color: #fff;
}
.menu-item-icon {
    color: #fff;
}
.wall-icon {
    width: 20px;
    height: 20px;
    background: #ffffff1a;
    border-radius: 4px;
    margin-left: 4px;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
}
.search-icon {
    color: rgb(209, 209, 209);
    font-size: 12px;
}
.menu-item.hover:hover {
    background-color: #ffffff1a;
}
.wall-icon:hover {
    background: #fff3;
}
</style>
