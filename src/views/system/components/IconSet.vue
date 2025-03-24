<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <div class="radio-group mb-[14px]">
                <div class="radio-item">
                    <div :class="['radio', icon.iconLayout === 'custom' ? 'is-checked' : '']" @click.stop="opt('custom')">
                        <div class="icon icon-square overflow-hidden">
                            <i class="text-[40px]">
                                <svg-icon name="niao"></svg-icon>
                            </i>
                        </div>
                    </div>
                    <div :class="['radio-title', icon.iconLayout === 'custom' ? 'is-checked' : '']">默认</div>
                </div>
                <div class="radio-item">
                    <div :class="['radio', icon.iconLayout === 'round' ? 'is-checked' : '']" @click.stop="opt('round')">
                        <div class="icon icon-round overflow-hidden">
                            <i class="text-[40px]">
                                <svg-icon name="niao"></svg-icon>
                            </i>
                        </div>
                    </div>
                    <div :class="['radio-title', icon.iconLayout === 'round' ? 'is-checked' : '']">圆形</div>
                </div>
            </div>
            <p class="bb mb-[10px] w-full"></p>
            <!-- 图标尺寸 样式选择 -->

            <Slider title="图标大小" unit="px" :attrs="{ min: 50, max: 130, step: 2 }" v-model="icon.iconSize" />
            <!-- //todo:图标圆角中min不要设置否则会出bug -->

            <Slider title="图标圆角" unit="px" :attrs="{ max: maxRadius, step: 2 }" v-model="icon.iconRadius" />
            <Slider title="不透明度" unit="%" :attrs="{ min: 0.1, max: 1, step: 0.1 }" v-model="icon.opactiy" />
        </div>
        <h2 class="setting-li-sub">
            间距
            <div class="switch">
                <span>同步</span>
                <el-switch v-model="icon.xysync" size="small" @change="xysyncChange" />
            </div>
        </h2>
        <!-- 图标间距-->
        <div class="setting-panel">
            <template v-if="icon.xysync">
                <Slider title="图标间距" unit="px" :attrs="{ min: 0, max: 100, step: 2 }" v-model="icon.iconX" />
            </template>
            <template v-else>
                <Slider title="X间距" unit="px" :attrs="{ min: 0, max: 100, step: 2 }" v-model="icon.iconX" />
                <Slider title="Y间距" unit="px" :attrs="{ min: 0, max: 100, step: 2 }" v-model="icon.iconY" />
            </template>
        </div>
        <h2 class="setting-li-sub">名称</h2>
        <!-- 名称-->
        <div class="setting-panel">
            <div class="flex items-center justify-between text-[13px]">
                <span>图标名称</span>
                <el-switch v-model="icon.name" size="small" :inactive-value="0" :active-value="1" />
            </div>
            <Slider unit="px" title="文字大小" :attrs="{ min: 12, max: 20, step: 2, disabled: !icon.name }" v-model="icon.nameSize" />
            <h2>颜色</h2>
            <ColorPicker v-model="icon.nameColor"></ColorPicker>
        </div>
        <h2 class="setting-li-sub">图标最大宽度</h2>
        <!-- 图标最大宽度-->

        <div class="setting-panel">
            <div class="flex items-center justify-between text-[13px]">
                <span>单位</span>
                <el-switch v-model="icon.unit" size="small" active-text="%" inactive-text="px" inactive-value="px" active-value="%" @change="unitChange" />
            </div>
            <Slider unit="%" :attrs="{ min: 0, max: 100, step: 2 }" v-if="icon.unit === '%'" v-model="icon.width" />
            <Slider unit="px" :attrs="{ min: 900, max: 2000, step: 2 }" v-else v-model="icon.width" />
        </div>
        <div class="setting-panel mt-[10px] text-center" style="padding: 0px 16px; color: rgb(255, 90, 93)" @click.stop="resetIconLayout">重置图标布局</div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import Slider from "@/components/Slider.vue";
import ColorPicker from "@/components/ColorPicker.vue";
const maxRadius = ref(25);
const themeStore = useBaseConfigStore();
const { icon } = storeToRefs(themeStore);
import { DefaultIcon } from "@/constant/config";
import { cloneDeep } from "lodash-es";
const opt = (val: string) => {
    icon.value.iconLayout = val;
    if (val === "custom") {
        icon.value.iconRadius = icon.value.iconSize / 4;
    } else {
        icon.value.iconRadius = icon.value.iconSize / 2;
    }
};

function resetIconLayout() {
    themeStore.setIcon(cloneDeep(DefaultIcon));
}
function unitChange() {
    if (icon.value.unit === "%") {
        icon.value.width = 72;
    } else {
        icon.value.width = 900;
    }
}
function xysyncChange() {
    if (icon.value.xysync) {
        icon.value.iconY = icon.value.iconX;
    }
}

watch(
    () => icon.value.iconX,
    () => {
        if (icon.value.xysync) {
            icon.value.iconY = icon.value.iconX;
        }
    },
);
watch(
    () => icon.value.iconSize,
    () => {
        if (icon.value.iconSize) {
            maxRadius.value = icon.value.iconSize / 2;
        }
    },
    {
        immediate: true,
    },
);
</script>
<style scoped lang="scss">
.icon {
    position: absolute;

    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, rgb(77, 77, 77), rgb(10, 10, 10));
}
.radio-title {
    transition: background 0.2s;
    background: transparent;
    color: #fff;
    height: 24px;
    line-height: 24px;
    margin-top: 10px;
    font-size: 12px;
    border-radius: 12px;
    text-align: center;
    &.is-checked {
        background-color: var(--el-color-primary);
    }
}
.icon-square {
    border-radius: 6px;
}
// background-color: rgba(24, 144, 255, 0.063);
.icon-round {
    border-radius: 50% 50%;
}

.radio-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.radio {
    position: relative;
    width: 60px;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &.is-checked {
        border: 1px solid var(--el-color-primary);
    }
}
</style>
