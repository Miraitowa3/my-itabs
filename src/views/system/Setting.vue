<template>
    <ElDrawer direction="rtl" v-model="show" :size="450" :show-close="false">
        <template #header> </template>
    </ElDrawer>
</template>

<script lang="ts" setup>
const show = ref(false);
</script>
<style lang="scss">
:deep(.el-drawer) {
    .el-drawer__header {
        position: relative;
        margin-bottom: 0px !important;
        overflow: hidden;
        padding: 26px;
    }
}
</style>
