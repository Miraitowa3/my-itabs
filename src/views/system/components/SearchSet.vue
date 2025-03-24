<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-19 18:59:30
 * @LastEditors: lyq
 * @LastEditTime: 2025-03-24 09:42:58
 * @FilePath: /mTab/my-itabs/src/views/system/components/SearchSet.vue
-->
<template>
    <div>
        <div class="setting-panel">
            <!-- 图标尺寸 样式选择 -->
            <Switch title="显示搜索栏" v-model="search.show" />
            <Slider title="搜索栏高度" unit="px" :attrs="{ min: 35, max: 60, step: 1 }" v-model="search.height" />
            <!-- //todo:图标圆角中min不要设置否则会出bug -->

            <Slider title="搜索栏圆角" unit="px" :attrs="{ min: 0, max: 50, step: 2 }" v-model="search.radius" />
            <Slider title="搜索栏透明" unit="" :attrs="{ min: 0.1, max: 1, step: 0.1 }" v-model="search.bgColor" />
        </div>
        <div class="setting-panel mt-[10px]">
            <!-- 图标尺寸 样式选择 -->
            <Switch title="搜索历史" v-model="search.history" />
        </div>
        <div class="setting-panel mt-[10px]">
            <!-- 图标尺寸 样式选择 -->
            <Switch title="关闭翻译" v-model="search.translateHide" />
        </div>
        <div class="setting-panel mt-[10px]">
            <!-- 图标尺寸 样式选择 -->
            <Select title="默认翻译" :list="translateList" v-model="search.translate" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Select from "@/components/Select.vue";
import Switch from "@/components/Switch.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
const baseConfigStore = useBaseConfigStore();
const { search } = storeToRefs(baseConfigStore);
const translateList = ref([
    { label: "火山翻译", value: "https://translate.volcengine.com/translate?text=%s" },
    { label: "百度翻译", value: "en-US" },
    { label: "DeepL翻译", value: "ja-JP" },
]);
</script>
<style scoped lang="scss"></style>
