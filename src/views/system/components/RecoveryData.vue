<template>
    <el-dialog v-model="show" width="640px" :show-close="true" class="recovery-data">
        <h1 class="">历史备份节点列表</h1>
        <p class="inform">我们为您保留云端5个备份节点，云端历史备份需要登录后手动备份</p>
        <div class="cloud-histry">
            <h2>云端历史备份节点</h2>
            <p class="cloud-tips">此功能需要登录使用，登录后可以查看多设备之间历史节点</p>
            <ul class="history-list">
                <li class="mt-[5px] flex items-center justify-between" v-for="(item, index) in historyList" :key="index">
                    <span class="d-sub">{{ dayjs(item.create_time).format("YYYY年MM月DD日 HH:mm:ss") }}</span>
                    <div>
                        <span class="d-main d-hover cursor-pointer" @click="downloadHistory(item.id)"
                            ><i class="d-icon mr-[5px] text-[14px]" style="vertical-align: -3px"> <svg-icon name="download"></svg-icon> </i>从此节点恢复 </span
                        ><i title="删除当前备份" class="d-icon d-hover ml-[5px] cursor-pointer text-[16px]" style="vertical-align: -3px" @click="delHistory(item.id)">
                            <svg-icon name="del"></svg-icon>
                        </i>
                    </div>
                </li>
                <p v-if="historyList.length === 0 && !loading">暂无历史节点备份</p>
            </ul>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { useGlobalStore } from "@/stores/global";
import { getHistory, delhistory, getConfig } from "@/api/user";
import userStore from "@/stores/user";
import dayjs from "dayjs";
import { ElDialog } from "element-plus";
const baseConfigStore = useBaseConfigStore();
const globalStore = useGlobalStore();
const { navConfig } = storeToRefs(globalStore);

const { wallpaper, icon, sidebar, layout, open, search, time, searchEngine, useSearch, theme } = storeToRefs(baseConfigStore);
const $user = userStore();
const show = defineModel<boolean>();
const historyList = ref<any>([]);
const loading = ref(false);
if ($user.token) {
    loading.value = true;
    getHistory()
        .then((res: any) => {
            if (res.code === 200) {
                historyList.value = res.data;
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
function getList() {
    getHistory()
        .then((res: any) => {
            if (res.code === 200) {
                historyList.value = res.data;
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
function delHistory(id: string) {
    delhistory({ id })
        .then((res: any) => {
            if (res.code === 200) {
                getList();
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
function downloadHistory(id: string) {
    ElMessageBox({
        title: "恢复数据",
        message: "确定从此节点恢复吗？",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        center: true,
        type: "warning",
    }).then(() => {
        getConfig({ id })
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
                    ElMessage({
                        type: "success",
                        message: "恢复成功",
                    });
                }
            })
            .finally(() => {});
    });
}
</script>
<style lang="scss" scoped>
.recovery-data {
    h1 {
        text-align: center;

        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 700;
    }
    .inform {
        text-align: center;
        padding-right: 20px;
        padding-left: 20px;
        margin-bottom: 20px;
        font-size: 12px;
        color: var(--d-sub);
    }
    .cloud-histry {
        text-align: left;
        padding: 50px;
        font-size: 12px;
        padding-top: 10px;
        h2 {
            margin-top: 20px;

            font-size: 16px;
            font-weight: 700;
            color: var(--d-main);
        }
        .cloud-tips {
            margin-bottom: 10px;
            color: var(--d-sub);
        }
        .history-list {
            height: 180px;
            overflow-y: auto;
            margin: 0 -20px;
            li {
                margin-top: 20px;
                .d-hover:hover {
                    color: var(--d-hover) !important;
                }
                padding: 0 20px;
                .d-sub {
                    color: var(--d-sub);
                }
                .d-main {
                    color: var(--d-main);
                }
                .d-icon {
                    height: 1em;
                    width: 1em;
                    line-height: 1em;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            & > p {
                text-align: center;
                color: var(--d-sub);
            }
        }
    }
}
</style>
<style lang="scss">
.recovery-data {
    &.el-dialog {
        border-radius: 20px;
    }
}
</style>
