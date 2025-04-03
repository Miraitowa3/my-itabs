<template>
    <div>
        <div class="setting-panel mb-5">
            <a class="link">同步到本地</a>
        </div>
        <div class="setting-panel mb-5">
            <a class="link">立即备份</a>
            <a class="link">恢复历史数据</a>
        </div>
        <div class="setting-panel">
            <a class="link" @click.top="backUp()">导出本地数据</a>
            <el-upload accept=".mTabdata" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                <a class="link">导入备份数据</a>
            </el-upload>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { useGlobalStore } from "@/stores/global";
import type { UploadProps, UploadUserFile } from "element-plus";
const baseConfigStore = useBaseConfigStore();
const globalStore = useGlobalStore();
const { wallpaper, icon, sidebar, layout, open, search, time, searchEngine, useSearch, theme } = storeToRefs(baseConfigStore);
const { navConfig } = storeToRefs(globalStore);

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
