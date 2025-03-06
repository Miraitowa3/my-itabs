<template>
  <div class="other-login pl-[30px] pr-[30px]">
    <EmailLogin v-if="isRegistry" @change="() => {
      emits('close')
    }"></EmailLogin>
    <Registry v-else @change="changeStatus"></Registry>
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
import EmailLogin from "./EmailLogin.vue";
const isRegistry = ref(true);
const emits = defineEmits(['close'])
const changeStatus = (status: boolean) => {
  isRegistry.value = status;
}
</script>

<style scoped></style>
