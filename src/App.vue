<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useBaseConfigStore } from "@/stores/baseConfig";
useBaseConfigStore();
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
