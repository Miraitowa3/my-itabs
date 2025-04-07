<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useBaseConfigStore } from "@/stores/baseConfig";

const { theme } = storeToRefs(useBaseConfigStore());

// 监听主题变化
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
colorSchemeQuery.addEventListener("change", (event) => {
    if (theme.value.system) {
        if (event.matches) {
            // 系统切换到了暗色模式
            theme.value.mode = "dark";
            console.log("Dark mode activated");
        } else {
            // 系统切换到了亮色模式
            theme.value.mode = "light";

            console.log("Light mode activated");
        }
    }
});
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
