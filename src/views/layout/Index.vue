<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain>
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";

const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
</script>
<style scoped></style>
