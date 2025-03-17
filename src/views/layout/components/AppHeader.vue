<template>
    <div class="app-header" :style="{ height: isSiderShow ? '3vh' : '18vh' }"></div>
</template>

<script lang="ts" setup>
import { useSiderStore } from "@/stores/global";
const siderStatus = useSiderStore();
const { isSiderShow } = storeToRefs(siderStatus);
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
