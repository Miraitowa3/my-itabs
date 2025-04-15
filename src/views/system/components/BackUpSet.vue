<template>
    <div>
        <div class="setting-panel mb-5">
            <a class="link" @click="tongbu" style="line-height: 24px">同步到本地</a>
        </div>
        <div class="setting-panel mb-5">
            <a class="link" @click="unableBackUp" v-loading.fullscreen.lock="loading" element-loading-text="数据同步中">立即备份</a>
            <a class="link" @click="show = true">恢复历史数据</a>
        </div>
        <div class="setting-panel">
            <a class="link" @click.top="backUp()">导出本地数据</a>
            <el-upload accept=".mTabdata" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                <a class="link">导入备份数据</a>
            </el-upload>
        </div>
    </div>
    <RecoveryData v-model="show" v-if="show" />
</template>

<script lang="ts" setup>
import RecoveryData from "./RecoveryData.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import { updateConfig, getConfig } from "@/api/user";
import { useGlobalStore } from "@/stores/global";
import type { UploadProps, UploadUserFile } from "element-plus";
import userStore from "@/stores/user";
const $user = userStore();
const baseConfigStore = useBaseConfigStore();
const show = ref(false);
const globalStore = useGlobalStore();
const { wallpaper, icon, sidebar, layout, open, search, time, searchEngine, useSearch, theme } = storeToRefs(baseConfigStore);
const { navConfig } = storeToRefs(globalStore);
const loading = ref(false);
let timer: null | NodeJS.Timeout = null;
function saveFile(content: any, filename: string, contentType = "text/plain") {
    const blob = new Blob([JSON.stringify(content, null)], { type: contentType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";
    a.click();

    // 释放内存
    timer = setTimeout(() => URL.revokeObjectURL(url), 100);
}
function backUp() {
    const data = {
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
    saveFile(data, "backup.mTabdata");
}
function tongbu() {
    if (!$user.token) {
        ElMessage.warning("请登陆后使用同步功能！");
        return;
    }
    getConfig({})
        .then((res: any) => {
            if (res.code === 200) {
                const data = res.data.config;
                icon.value = data.baseConfig.icon;
                sidebar.value = data.baseConfig.sidebar;
                layout.value = data.baseConfig.layout;
                open.value = data.baseConfig.open;
                search.value = data.baseConfig.search;
                time.value = data.baseConfig.time;
                searchEngine.value = data.baseConfig.searchEngine;
                useSearch.value = data.baseConfig.useSearch;
                theme.value = data.baseConfig.theme;
                wallpaper.value = data.baseConfig.wallpaper;
                navConfig.value = data.navConfig;
                ElMessage.success("同步成功");
            } else {
                ElMessage.error("同步失败");
            }
        })
        .catch(() => {
            ElMessage.error("同步失败");
        })
        .finally(() => {});
}
function unableBackUp() {
    if (!$user.token) {
        ElMessage.warning("请登陆后使用同步功能！");
        return;
    }
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
const handleChange: UploadProps["onChange"] = (uploadFile) => {
    if (!uploadFile.raw) {
        return;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e) => {
        if (!e.target?.error) {
            try {
                const data = JSON.parse(e.target?.result as string);
                icon.value = data.baseConfig.icon;
                sidebar.value = data.baseConfig.sidebar;
                layout.value = data.baseConfig.layout;
                open.value = data.baseConfig.open;
                search.value = data.baseConfig.search;
                time.value = data.baseConfig.time;
                searchEngine.value = data.baseConfig.searchEngine;
                useSearch.value = data.baseConfig.useSearch;
                theme.value = data.baseConfig.theme;
                wallpaper.value = data.baseConfig.wallpaper;
                navConfig.value = data.navConfig;

                ElMessage.success("恢复成功");
            } catch (error) {
                console.log(error);

                ElMessage.error("数据格式可能不正确");
            }
        }
    };
    reader.readAsText(uploadFile.raw);
};
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
});
</script>
<style scoped lang="scss">
.setting-panel {
    a {
        text-decoration: none;
        color: #1890ff;
        display: block;
    }
    .link {
        &:hover {
            font-weight: 700;
        }
    }
}
</style>
