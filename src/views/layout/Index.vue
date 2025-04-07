<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain><Nodes v-model="show" />
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import Nodes from "./components/Nodes.vue";
const show = ref(true);
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
</script>
<style scoped></style>
