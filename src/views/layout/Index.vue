<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain>
    <!-- <Nodes v-model="show" /> -->
</template>
<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import { getRandomInRange } from "@/utils";
import Nodes from "./components/Nodes.vue";
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
const timer = ref<null | NodeJS.Timeout>(null);
watch(
    () => wallpaper.value.time,
    () => {
        if (wallpaper.value.time !== 0) {
            timer.value = setInterval(
                () => {
                    const index = getRandomInRange(1, 145);
                    wallpaper.value.src = `https://raw.gitcode.com/miraitowa_001/image/raw/master/yuan/${index}.webp`;
                    wallpaper.value.thumb = `https://raw.gitcode.com/miraitowa_001/image/raw/master/dist/${index}.webp`;
                },
                wallpaper.value.time * 60 * 60 * 1000,
            );
        }
    },
    {
        deep: true,
        immediate: true,
    },
);
onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value as NodeJS.Timeout);
        timer.value = null;
    }
});
</script>
<style scoped></style>
