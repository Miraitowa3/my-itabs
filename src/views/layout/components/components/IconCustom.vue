<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-12 18:45:54
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2025-03-12 20:08:56
 * @FilePath: /mTab/src/views/layout/components/components/IconCustom.vue
-->
<template>
    <div class="icon-container">
        <div class="app-icon-wrap">
            <el-form ref="ruleFormRef" :model="form" label-position="left" label-width="70px">
                <el-form-item prop="code" label="地址">
                    <el-input v-model="form.address" type="text" placeholder="https://" clearable class="address-input">
                        <template #append> <el-button class="get-icon-btn"> 获取图标</el-button> </template>
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="lianjie" /> </i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mc" label="名称">
                    <el-input v-model="form.mc" type="text" placeholder="网站名称" clearable class="address-input">
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="bi" /> </i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mc" label="图标颜色"> </el-form-item>
                <el-form-item prop="mc" label="图标文字">
                    <el-input v-model="form.mc" type="text" placeholder="请输入图标文字" clearable class="address-input">
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="bi" /> </i>
                        </template>
                    </el-input>
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
    background-color: rgba(0, 0, 0, 0.1);

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
.address-input {
    width: 60%;
}
:deep(.el-input-group__append) {
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
.get-icon-btn {
    padding: 0 15px;
}
</style>
