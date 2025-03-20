<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <Switch title="深色模式" v-model="sidebar.autoHide" />
            <Switch title="跟随系统" v-model="sidebar.autoHide" />
            <p class="bb mb-[10px] w-full"></p>
            <h2>主题色</h2>
            <ColorPicker title="主题色" :colorList="colorList" class="mb-[10px]" />
            <h2>壁纸</h2>

            <div class="paper-img">
                <el-image :src="url" style="width: 100%; height: 100%" fit="fill" />
                <div class="wall-change flex items-center justify-center"><button>更换壁纸</button><button>下载壁纸</button></div>
            </div>
            <Slider title="遮罩浓度" unit="%" :attrs="{ min: 0, max: 0.9, step: 0.01 }" v-model="sidebar.opacity" />
            <Slider title="模糊度" unit="%" :attrs="{ min: 0, max: 40, step: 2 }" v-model="sidebar.width" />
            <Select title="自动壁纸" :list="translateList" v-model="sidebar.opacity" :attrs="{ style: 'width: 160px' }" />
            <Switch title="桌面显示壁纸切换按钮" v-model="sidebar.autoHide" />
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
const colorList = ["#1681ff", "#FBBE23", "#FC4548", "#2ecc71", "#33c5c5", "#9b59b6", "#F1C40F", "#e67e22", "#e74c3c"];
const translateList = ref([
    { label: "火山翻译", value: "https://translate.volcengine.com/translate?text=%s" },
    { label: "百度翻译", value: "en-US" },
    { label: "DeepL翻译", value: "ja-JP" },
]);
</script>
<style scoped lang="scss">
.paper-img {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
    height: 160px;

    .wall-change {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        width: 100%;
        opacity: 1;
        transition: 0.2s;

        button {
            --primary-color: #1890ff;
            --bg-card: #fff;
            width: 100px;
            line-height: 32px !important;
            margin: 5px;
            background-color: var(--bg-card);
            border-radius: 6px;
            border: none;
            color: var(--primary-color);
            transition: 0.2s;
        }
    }
}
</style>
