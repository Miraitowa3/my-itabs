<template>
    <div>
        <!-- 形状选择 -->
        <div class="setting-panel">
            <div class="radio-group mb-[14px]">
                <div class="radio-item">
                    <div :class="['radio', layout.view === 'widget' ? 'is-checked' : '']" @click.stop="opt('widget')">
                        <div class="layout-item">
                            <i class="side-time">16:21</i><span></span>

                            <p><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></p>
                        </div>
                    </div>
                    <div :class="['radio-title', layout.view === 'widget' ? 'is-checked' : '']">组件</div>
                </div>
                <div class="radio-item">
                    <div :class="['radio', layout.view === 'simple' ? 'is-checked' : '']" @click.stop="opt('simple')">
                        <div class="layout-item"><i class="side-time mt-[20px]">16:21</i><span></span></div>
                    </div>
                    <div :class="['radio-title', layout.view === 'simple' ? 'is-checked' : '']">极简</div>
                </div>
            </div>
            <p class="bb mb-[10px] w-full"></p>
            <!-- 图标尺寸 样式选择 -->
            <Switch title="底部显示一言" v-model="layout.yiyan" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import Switch from "@/components/Switch.vue";
const baseConfigStore = useBaseConfigStore();
const { layout } = storeToRefs(baseConfigStore);
const opt = (val: string) => {
    layout.value.view = val;
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

.layout-item {
    --d-sub: #939393;
    --alpha-color: 0, 0, 0;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    background: rgba(var(--alpha-color), 0.06);
    position: relative;
    border: 1px solid transparent;
    & > i {
        font-size: 12px;
        color: var(--d-sub);
        display: block;
        line-height: 12px !important;
        margin-top: 5px;
        text-align: center;
        margin-bottom: 5px;
    }
    p {
        width: 70%;
        margin: 5px auto;
        line-height: 0px;
        i {
            width: 8px;
            height: 8px;
            display: inline-block;
            margin: 2px;
            border-radius: 2px;
            background: rgba(var(--alpha-color), 0.1);
        }
    }
    span {
        content: "";
        display: block;
        width: 60%;
        height: 6px;
        border-radius: 4px;
        margin: 2px auto;
        background: rgba(var(--alpha-color), 0.1);
        position: relative;
    }
    .side-time {
        font-weight: 500;
        font-family: var(--time-font);
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
