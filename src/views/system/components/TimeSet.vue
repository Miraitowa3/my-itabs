<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <Switch title="显示时间" v-model="sidebar.autoHide" />
            <div class="box flex flex-wrap items-center justify-around rounded-md p-2">
                <div
                    class="d-toggle"
                    :class="{ 'is-checked': item.checked }"
                    v-for="(item, index) in toggleList"
                    :key="item.label"
                    @click="toggleList[index].checked = !toggleList[index].checked"
                >
                    {{ item.label }}
                </div>
            </div>
            <p class="bb mb-[10px] w-full"></p>

            <Slider title="大小" unit="%" :attrs="{ min: 20, max: 130, step: 1 }" v-model="sidebar.width" />
            <Select title="字体" :list="translateList" v-model="sidebar.opacity" />

            <h2>颜色</h2>
            <ColorPicker title="主题色" :colorList="colorList" class="mb-[10px]" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import Slider from "@/components/Slider.vue";
import Switch from "@/components/Switch.vue";
import ColorPicker from "../../../components/ColorPicker.vue";
const baseConfigStore = useBaseConfigStore();
const url = ref(new URL("@/assets/img/mmexport1711203978296.jpg", import.meta.url).href);
const { sidebar } = storeToRefs(baseConfigStore);
const colorList = ["#fff", "#9DE5FE", "#B8CEFF", "#EFABC4", "#DAC4FD", " #DF98FE", "#fceab2", "#F4F7CA", "#d0eadf"];
const translateList = ref([
    { label: "火山翻译", value: "https://translate.volcengine.com/translate?text=%s" },
    { label: "百度翻译", value: "en-US" },
    { label: "DeepL翻译", value: "ja-JP" },
]);
const toggleList = ref([
    {
        label: "月日",
        checked: true,
    },
    {
        label: "周",
        checked: true,
    },
    {
        label: "农历",
        checked: true,
    },
    {
        label: "24",
        checked: true,
    },
    {
        label: "秒",
        checked: false,
    },
    {
        label: "粗体",
        checked: true,
    },
]);
</script>
<style scoped lang="scss">
.box {
    --bg-body: #f1f0f5;
    background-color: var(--bg-body);
    height: 120px;
}
.d-toggle {
    --bg-card: #fff;
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
        --primary-color: #1890ff;

        border-color: var(--primary-color);
        color: var(--primary-color);
    }
}
</style>
