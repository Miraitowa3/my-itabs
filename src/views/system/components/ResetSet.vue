<template>
    <div>
        <div class="setting-panel flex items-center justify-between">
            <p class="mr-[5px]" style="line-height: 16px">重置设置 <br /><span class="d-sub text-xs">重置成默认配置，如壁纸、布局，但不会重置图标</span></p>
            <button class="d-button d-button-size-small d-button-type-primary">重置</button>
        </div>
        <div class="setting-panel mt-[10px] flex items-center justify-between">
            <p class="mr-[5px]" style="line-height: 16px">重置图标 <br /><span class="d-sub text-xs">重置您的图标成默认</span></p>
            <button class="d-button d-button-size-small d-button-type-primary">重置</button>
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
    --d-sub: #939393;
    color: var(--d-sub);
}
</style>
