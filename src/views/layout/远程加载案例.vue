<template>
    <Teleport to="body">
        <itab-wallpaper :url="wallpaper.src"> </itab-wallpaper>
    </Teleport>
    <AppSider></AppSider>
    <AppMain></AppMain>
    <!-- <Nodes v-model="show" /> -->
    <!-- <AsyncComponent v-model="show"></AsyncComponent> -->
    <!-- <component :is="comp" v-model="show" /> -->
    <com v-model="show"></com>
</template>
<!-- <Nodes v-model="show" /> -->
<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
import AppSider from "./components/AppSider.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import { loadModule } from "vue3-sfc-loader";
import * as Vue from "vue";

import * as E from "element-plus";
const comp = shallowRef<any>();
import Nodes from "./components/Nodes.vue";
// const AsyncComponent = defineAsyncComponent(() => {
//     import("../../../public/index.css");
//     return import("../../../public/nodes.umd.js");
// });
// // (window as any).requirejs(["/nodes.umd.js"], (com: any) => {
// //     comp.value = com;
// //     console.log(com, 1111111111111);
// // });
const show = ref(true);
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
let url = "";
const options = {
    moduleCache: {
        vue: Vue,
        "element-plus": E,
    },
    async getFile(url: string) {
        const res = await fetch(url);
        if (!res.ok) throw Object.assign(new Error(res.statusText + " " + url), { res });
        return await res.text();
    },
    addStyle(textContent: string) {
        const style = Object.assign(document.createElement("style"), { textContent });
        const ref = document.head.getElementsByTagName("style")[0] || null;
        document.head.insertBefore(style, ref);
    },
};
const com = defineAsyncComponent(() => loadModule("http://localhost:3000/Nodes.vue", options));
</script>
<style scoped></style>
