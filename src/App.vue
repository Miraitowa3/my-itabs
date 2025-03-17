<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useThemeStore } from "@/stores/theme";
useThemeStore();
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
