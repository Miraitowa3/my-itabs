<template>
    <div class="dialog-header">
        <div class="dialog-tool is-mac">
            <span title="放大/缩小" @click.stop="fullScreen"
                ><i class="d-icon" style="font-size: 8px"> <svg-icon name="jian" v-if="isFullScreen"></svg-icon><svg-icon name="fangda" v-else></svg-icon> </i></span
            ><span title="关闭" @click.stop="close"
                ><i class="d-icon" style="font-size: 8px; transform: scale(0.96)"> <svg-icon name="closew"></svg-icon> </i
            ></span>
        </div>
        <div class="dialog-title"></div>
    </div>
</template>

<script lang="ts" setup>
const isFullScreen = ref(false);
const emits = defineEmits(["close", "fullScreen"]);
function close() {
    emits("close");
}
function fullScreen() {
    isFullScreen.value = !isFullScreen.value;
    emits("fullScreen", isFullScreen.value);
}
</script>
<style scoped lang="scss">
.dialog-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 5px;
    text-align: center;
    color: var(--d-main);
    z-index: 12;
    .dialog-title {
        text-align: center;
        color: var(--d-main);
    }
    .dialog-tool {
        color: var(--d-main);
        overflow: hidden;
        position: absolute;
        text-align: center;
        font-size: 14px;
        z-index: 99;
        top: 11px;
        right: 6px;
        span {
            transition: 0.2s;
            cursor: pointer;
            line-height: 12px;
            font-size: 12px;
            color: #333;
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 12px;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &.is-mac {
            &:hover .d-icon {
                display: block;
            }
            & span:nth-child(2) {
                background-color: #ff5f56;
            }
            span {
                i {
                    display: none;
                }

                background-color: #1aab29;
            }
        }
    }
}
</style>
