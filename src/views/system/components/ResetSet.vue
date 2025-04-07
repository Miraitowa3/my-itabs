<template>
    <div>
        <div class="setting-panel flex items-center justify-between">
            <p class="mr-[5px]" style="line-height: 16px">重置设置 <br /><span class="d-sub text-xs">重置成默认配置，如壁纸、布局，但不会重置图标</span></p>
            <el-button type="primary" @click.stop="baseConfigStore.resetLayout">重置</el-button>
        </div>
        <div class="setting-panel mt-[10px] flex items-center justify-between">
            <p class="mr-[5px]" style="line-height: 16px">重置图标 <br /><span class="d-sub text-xs">重置您的图标成默认</span></p>
            <el-button type="primary" @click.stop="global.resetNavConfig">重置</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { useGlobalStore } from "@/stores/global";

const baseConfigStore = useBaseConfigStore();
const global = useGlobalStore();
</script>
<style scoped lang="scss">
.d-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    height: var(--d-button-height);
    white-space: nowrap;
    cursor: pointer;
    padding: var(--d-button-padding);
    border-radius: var(--d-button-radius);
    background: var(--d-button-custon-bg, var(--d-button-bg));
    color: var(--d-button-color);
    font-size: var(--d-button-text-size);
    overflow: hidden;
    position: relative;
}
.d-sub {
    color: var(--d-sub);
}
:deep(.el-button) {
    height: 24px;
    padding: 5px 11px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
}
.d-button {
    --bg-input: #f0f1f4;
    --d-main: #222;
    --d-button-padding: 8px 15px;
    --d-button-height: 32px;
    --d-button-radius: 6px;
    --d-button-bg: var(--bg-input);
    --d-button-color: var(--d-main);
    --d-button-text-size: 14px;
    --d-button-custon-bg: var(--1182d8e4);
}

.bb {
    border-bottom: 1px solid var(--dividing-line);
}
.d-button-size-small {
    --d-button-padding: 5px 11px;
    --d-button-height: 24px;
    --d-button-text-size: 12px;
}
.d-button-type-primary {
    --primary-color: #1890ff;
    --d-button-bg: var(--primary-color);
    --d-button-color: #fff;
}
</style>
