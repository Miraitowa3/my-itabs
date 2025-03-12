<template>
    <div class="icon-container">
        <div class="app-icon-wrap">
            <el-form ref="ruleFormRef" :model="form" label-position="left" label-width="70px">
                <el-form-item prop="code" label="地址">
                    <el-input v-model="form.address" type="text" placeholder="https://" clearable />
                </el-form-item>
                <el-form-item prop="mc" label="名称">
                    <el-input v-model="form.mc" type="text" placeholder="网站名称" clearable />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const form = ref({
    address: "",
    mc: "",
});
</script>
<style scoped lang="scss">
.icon-container {
    overflow: hidden;
    padding: 30px 20px;
    height: 100%;
}
.app-icon-wrap {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.35);
    border-radius: 12px;
}
:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent inset;
    background-color: rgba(255, 255, 255, 0.1) !important;

    &.is-focus {
        box-shadow: 0 0 0 1px #fff inset;
    }
}
:deep(.el-input__inner) {
    color: #fff;

    &::placeholder {
        color: #fff;
        font-size: 12px;
    }
}
:deep(.el-form-item__label) {
    color: #606266;
    font-size: 14px;
}
</style>
