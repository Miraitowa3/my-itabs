<template>
    <el-dialog v-model="show" width="260px" :modal="false" :append-to-body="true" class="custom-class">
        <span>This is a message</span>
        <template #header>
            <header class="dialog-header">添加分组</header>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="show = false">Cancel</el-button>
                <el-button type="primary" @click="show = false"> Confirm </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
const show = defineModel();
</script>
<style lang="scss">
.custom-class {
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    // color: rgba(var(--img-text), 0.8) !important;
    background: rgba(#fff, 0.1);
    box-shadow: 0 12px 24px #0000002e !important;
    margin-left: 60px;
    padding: 12px !important;
}
.dialog-header {
    color: #fff;
}
</style>
