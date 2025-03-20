<template>
    <div>
        <div class="setting-panel mb-5">
            <a class="link">同步到本地</a>
        </div>
        <div class="setting-panel mb-5">
            <a class="link">立即备份</a>
            <a class="link">回复历史数据</a>
        </div>
        <div class="setting-panel">
            <a class="link">导出本地数据</a>
            <a class="link">导出备份数据</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Switch from "@/components/Switch.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
const baseConfigStore = useBaseConfigStore();
const { open } = storeToRefs(baseConfigStore);
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
