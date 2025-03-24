<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <Switch title="显示时间" v-model="time.show" />
            <div class="box relative flex flex-wrap items-center justify-around rounded-md p-2">
                <div
                    class="d-toggle"
                    :class="{ 'is-checked': time[item.key] === 'inline' || time[item.key] === 'true' || time[item.key] === '600' }"
                    v-for="(item, index) in toggleList"
                    :key="item.label"
                >
                    <el-checkbox v-model="time[item.key]" :true-value="item['true-value']" :false-value="item['false-value']" />

                    {{ item.label }}
                </div>
            </div>
            <p class="bb mb-[10px] w-full"></p>

            <Slider title="大小" unit="%" :attrs="{ min: 20, max: 130, step: 1 }" v-model="time.size" />
            <div class="slider flex items-center justify-between">
                <span class="slider-title">字体</span>
                <el-select v-model="time.font" size="small">
                    <el-option v-for="item in fontList" :key="item.value" :label="item.label" :value="item.value">
                        <div class="flex items-center justify-between">
                            <span class="text-[18px] font-bold" :style="{ 'font-family': item.value }">23:40</span>
                            <span>{{ item.label }}</span>
                        </div>
                    </el-option>
                </el-select>
            </div>

            <h2>颜色</h2>
            <ColorPicker title="主题色" :colorList="colorList" class="mb-[10px]" v-model="time.color" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import Slider from "@/components/Slider.vue";
import Switch from "@/components/Switch.vue";
import ColorPicker from "../../../components/ColorPicker.vue";
import { fontList } from "@/constant/config";

const baseConfigStore = useBaseConfigStore();
const url = ref(new URL("@/assets/img/mmexport1711203978296.jpg", import.meta.url).href);
const { time } = storeToRefs(baseConfigStore);
const colorList = ["#fff", "#9DE5FE", "#B8CEFF", "#EFABC4", "#DAC4FD", " #DF98FE", "#fceab2", "#F4F7CA", "#d0eadf"];
const translateList = ref([
    { label: "火山翻译", value: "https://translate.volcengine.com/translate?text=%s" },
    { label: "百度翻译", value: "en-US" },
    { label: "DeepL翻译", value: "ja-JP" },
]);

const toggleList = ref([
    {
        label: "月日",
        key: "month",
        "true-value": "inline",
        "false-value": "none",
    },
    {
        label: "周",
        key: "week",
        "true-value": "inline",
        "false-value": "none",
    },
    {
        label: "农历",
        key: "lunar",
        "true-value": "inline",
        "false-value": "none",
    },
    {
        label: "24",
        key: "hour24",
        "true-value": "true",
        "false-value": "false",
    },
    {
        label: "秒",
        key: "sec",
        "true-value": "true",
        "false-value": "false",
    },
    {
        label: "粗体",
        key: "fontWeight",
        "true-value": "600",
        "false-value": "400",
    },
]);
</script>
<style scoped lang="scss">
.box {
    background-color: var(--bg-body);
    height: 120px;
}
:deep(.el-checkbox) {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
}
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

.d-toggle {
    position: relative;
    height: 18px;
    width: var(--width, 60px);
    height: var(--height, 40px);
    line-height: var(--height, 40px);
    border-radius: var(--raidus, 6px);
    border: 1px solid transparent;
    background: var(--bg-card);
    transition: border 0.2s;
    text-align: center;
    &.is-checked {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
    }
}
</style>
