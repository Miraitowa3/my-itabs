<template>
    <div class="other-login pl-[30px] pr-[30px]">
        <EmilLogin v-if="isRegistry"></EmilLogin>
        <Registry v-else></Registry>
        <div v-if="isRegistry" class="flex items-center justify-center text-center text-[14px]">
            <span class="mr-[10px]">还没有账号? </span><el-button text bg @click="isRegistry = false">立即注册</el-button>
        </div>
        <div v-else class="flex items-center justify-center text-center text-[14px]">
            <span class="mr-[10px]">已有账号?</span><el-button text bg @click="isRegistry = true">立即登录</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Registry from "./Registry.vue";
import EmilLogin from "./EmilLogin.vue";
const isRegistry = ref(true);
</script>

<style scoped></style>
