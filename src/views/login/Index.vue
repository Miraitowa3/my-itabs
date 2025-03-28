<template>
    <Dialog
        v-model:show="show"
        width="420px"
        :customStyle="{
            background: 'var(--el-bg-color)',
        }"
    >
        <div class="app-login">
            <Tab style="width: 100%" @change="handleTabChange" :modelValue="activeTab" :list="tabList" @update:modelValue="(value) => (activeTab = value)"></Tab>
            <div class="login-container">
                <WxCodeLogin v-if="activeTab === '微信登录'" @close="show = false"></WxCodeLogin>
                <OtherLogin v-if="activeTab === '其它方式登录'" @close="show = false"></OtherLogin>
            </div>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import WxCodeLogin from "./components/WxCodeLogin.vue";
import OtherLogin from "./components/OtherLogin.vue";

const show = defineModel("show");

const tabList = ref([
    {
        label: "微信登录",
        value: "微信登录",
    },
    {
        label: "其它方式登录",
        value: "其它方式登录",
    },
]);
const activeTab = ref("微信登录");
const handleTabChange = (cur: any) => {};
</script>
<style scoped>
.app-login {
    padding: 20px;
}

.form-item {
    box-sizing: border-box;
    position: relative;
    width: 240px;
    height: 41px;
    border-bottom: 1px solid #757575;
    margin-bottom: 20px;
}

.form-item > .bar {
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #5264ae;
    transition: 0.4s ease;
}

.form-item input {
    outline: none;
    width: 100%;
    height: 20px;
    margin-top: 20px;
    font-size: 14px;
}

.form-item input:focus ~ .bar {
    width: 100%;
}

.form-item input:focus ~ label,
.form-item input:valid ~ label {
    color: #5264ae;
    transform: translateY(-20px);
}

.form-item label {
    color: #ccc;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    transition: 0.4s ease;
    font-size: 14px;
}
</style>
