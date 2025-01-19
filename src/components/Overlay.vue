<template>
    <div :class="['overlay', customClass]">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    customClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
    customClass: "",
});
</script>
<style scoped>
.overlay {
    --el-overlay-color-lighter: rgba(0, 0, 0, 0.5);
    background-color: var(--el-overlay-color-lighter);
    bottom: 0;
    height: 100vh;
    left: 0;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2000;
    overflow: hidden;
}
</style>
