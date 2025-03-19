<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <div class="radio-group mb-[14px]">
                <div class="radio-item">
                    <div :class="['radio', sidebar.placement === 'left' ? 'is-checked' : '']" @click.stop="opt('left')">
                        <div class="sidebar-item h-full w-full"><span></span></div>
                    </div>
                    <div :class="['radio-title', sidebar.placement === 'left' ? 'is-checked' : '']">左侧</div>
                </div>
                <div class="radio-item">
                    <div :class="['radio', sidebar.placement === 'right' ? 'is-checked' : '']" @click.stop="opt('right')">
                        <div class="sidebar-item h-full w-full"><span class="absolute right-0"></span></div>
                    </div>
                    <div :class="['radio-title', sidebar.placement === 'right' ? 'is-checked' : '']">右侧</div>
                </div>
            </div>
            <p class="bb mb-[10px] w-full"></p>
            <!-- 图标尺寸 样式选择 -->
            <Switch title="自动隐藏" v-model="sidebar.autoHide" />
            <Switch title="记住上次分组" v-model="sidebar.lastGroup" />
            <Switch title="鼠标滚轮滚动分组" v-model="sidebar.mouseGroup" />

            <Slider title="透明度" unit="" :attrs="{ min: 0.1, max: 1, step: 0.01 }" v-model="sidebar.opacity" />
            <Slider title="宽度" unit="px" :attrs="{ min: 42, max: 120, step: 2 }" v-model="sidebar.width" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import Slider from "@/components/Slider.vue";
import Switch from "@/components/Switch.vue";
const baseConfigStore = useBaseConfigStore();
const { sidebar } = storeToRefs(baseConfigStore);
const opt = (val: string) => {
    sidebar.value.placement = val;
};
</script>
<style scoped lang="scss">
.radio-title {
    width: 50px;
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
        background-color: #1681ff;
    }
}

.sidebar-item {
    --alpha-color: 0, 0, 0;
    border-radius: 4px;

    background: rgba(var(--alpha-color), 0.06);
    position: relative;
    border: 1px solid transparent;
    span {
        display: block;
        width: 10px;
        height: 100%;
        background: rgba(var(--alpha-color), 0.1);
        &:before {
            content: "";
            position: absolute;
            top: 26px;
            left: 2px;
            width: 6px;
            height: 2px;
            border-radius: 2px;
            background: rgba(var(--alpha-color), 0.3);
            box-shadow:
                0 10px rgba(var(--alpha-color), 0.3),
                0 20px rgba(var(--alpha-color), 0.3);
        }
        &:after {
            content: "";
            position: absolute;
            left: 2px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            top: 10px;
            background: rgba(var(--alpha-color), 0.5);
        }
    }
}
.radio-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.radio-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.radio {
    position: relative;
    width: 110px;
    height: 70px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;

    &.is-checked {
        background-color: rgba(24, 144, 255, 0.063);
        border: 1px solid #1681ff;
    }
}
</style>
