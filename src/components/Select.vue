<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-19 20:18:37
 * @LastEditors: lyq
 * @LastEditTime: 2025-03-20 14:33:44
 * @FilePath: /mTab/my-itabs/src/components/Select.vue
-->
<template>
    <div class="slider flex items-center justify-between">
        <span class="slider-title" v-if="title">{{ title }} </span>
        <el-select v-model="value" size="small" v-bind="attrs">
            <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { SwitchProps } from "element-plus";
const value = defineModel<SwitchProps["activeValue"]>();

const props = defineProps<{
    title?: string;
    attrs?: Partial<SwitchProps> & { style: any };
    list: Array<{ value: string; label: string }>;
}>();
</script>

<style scoped lang="scss">
.slider {
    line-height: 36px;
    font-size: 13px;
    .slider-title {
        min-width: 60px;
    }
    .slider-value {
        text-align: right;
    }
}
</style>
