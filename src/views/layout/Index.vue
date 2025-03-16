<template>
    <Teleport to="body">
        <itab-wallpaper :url="url"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain>
    <Setting v-model="show"></Setting>
</template>

<script setup lang="ts">
const show = ref(true);
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import Setting from "../system/Setting.vue";
const url = ref("https://raw.gitcode.com/snows_l/blog_assets/raw/master/imgs/bg/1.png");
const timer = ref<NodeJS.Timeout>();
const Max_INDEX = 100;
const Min_INDEX = 1;
let cur = Min_INDEX;
function changeWallpaper() {
    cur++;
    if (cur > Max_INDEX) {
        cur = Min_INDEX;
    }
    url.value = `https://raw.gitcode.com/snows_l/blog_assets/raw/master/imgs/bg/${cur}.png`;
}

onMounted(() => {
    timer.value = setInterval(changeWallpaper, 1000 * 60);
});

onUnmounted(() => {
    clearInterval(timer.value);
});
//拖拽
</script>
<style scoped></style>
