<template>
    <div class="app-header" :style="{ height: layout.view === 'widget' ? '3vh' : '18vh' }"></div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
const BaseConfig = useBaseConfigStore();
const { layout } = storeToRefs(BaseConfig);
</script>
<style scope>
.app-header {
    --height: 3vh;
    height: var(--height);
    color: #080505;
    transition: 0.2s;
    position: relative;
}
@media screen and (min-height: 768px) {
    .app-header {
        --height: 6vh;
    }
}
</style>
