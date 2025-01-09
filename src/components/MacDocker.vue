<template>
    <div class="mac-docker">
        <template v-for="(item, index) in list" :key="item.name">
            <div class="item w-12" :style="{ 'background-color': item.color }"></div>
            <div class="gap"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const list = ref([
    {
        name: "Tab1",
        color: "#1abc9c",
    },
    {
        name: "Tab2",
        color: "#f1c40f",
    },
    {
        name: "Tab3",
        color: "#2ecc71",
    },
    {
        name: "Tab4",
        color: "#e67e22",
    },
    {
        name: "Tab5",
        color: "#e74c3c",
    },
    {
        name: "Tab6",
        color: "#3498db",
    },

    {
        name: "Tab7",
        color: "#8e44ad",
    },
    {
        name: "Tab8",
        color: "#f39c12",
    },
    {
        name: "Tab9",
        color: "#1abc9c",
    },
    {
        name: "Tab10",
        color: "#f1c40f",
    },
    {
        name: "Tab11",
        color: "#2ecc71",
    },
    {
        name: "Tab12",
        color: "#e67e22",
    },
    {
        name: "Tab13",
        color: "#e74c3c",
    },
    {
        name: "Tab14",
        color: "#3498db",
    },

    {
        name: "Tab15",
        color: "#8e44ad",
    },
    {
        name: "Tab16",
        color: "#f39c12",
    },
]);
</script>
<style scoped>
.mac-docker {
    font-size: 14px;
    display: flex;
}
.item {
    height: 100%;
}
.gap {
    width: 8px;
    height: 100%;
}
</style>
