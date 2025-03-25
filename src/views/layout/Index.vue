<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain><AddPic />
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import AddPic from "./components/components/AddPic.vue";
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);

const timer = ref<NodeJS.Timeout>();
const Max_INDEX = 100;
const Min_INDEX = 1;
let cur = Min_INDEX;
function changeWallpaper() {
    cur++;
    if (cur > Max_INDEX) {
        cur = Min_INDEX;
    }
    wallpaper.value.src = `https://raw.gitcode.com/snows_l/blog_assets/raw/master/imgs/bg/${cur}.png`;
}

watch(
    () => wallpaper.value.time,
    () => {
        if (wallpaper.value.time !== undefined) {
            if (wallpaper.value.time === 0) {
                clearInterval(timer.value);
                timer.value = undefined;
            } else {
                clearInterval(timer.value);
                timer.value = setInterval(changeWallpaper, wallpaper.value.time * 60 * 60 * 1000);
            }
        }
    },
    { deep: true, immediate: true },
);

onUnmounted(() => {
    clearInterval(timer.value);
});
//拖拽
</script>
<style scoped></style>
