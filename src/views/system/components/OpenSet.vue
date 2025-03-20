<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-19 18:59:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2025-03-19 19:13:06
 * @FilePath: /mTab/my-itabs/src/views/system/components/OpenSet.vue
-->
<template>
    <div>
        <div class="setting-panel">
            <!-- 图标尺寸 样式选择 -->
            <Switch title="新标签页打开搜索结果" v-model="open.iconBlank" />
        </div>
        <div class="setting-panel mt-[10px]">
            <!-- 图标尺寸 样式选择 -->
            <Switch title="新标签页打开图标" v-model="open.searchBlank" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Switch from "@/components/Switch.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
const baseConfigStore = useBaseConfigStore();
const { open } = storeToRefs(baseConfigStore);
</script>
<style scoped lang="scss"></style>
