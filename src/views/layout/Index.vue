<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain>
    <!-- <Nodes v-model="show" /> -->
    <AsyncComponent v-model="show"></AsyncComponent>
    <!-- <component :is="comp" v-model="show" /> -->
</template>
<!-- <Nodes v-model="show" /> -->
<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
const comp = shallowRef<any>();
import Nodes from "./components/Nodes.vue";
const AsyncComponent = defineAsyncComponent(() => {
    import("../../../public/index.css");
    return import("../../../public/nodes.umd.js");
});
// (window as any).requirejs(["/nodes.umd.js"], (com: any) => {
//     comp.value = com;
//     console.log(com, 1111111111111);
// });
const show = ref(true);
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
</script>
<style scoped></style>
