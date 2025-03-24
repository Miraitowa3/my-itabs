<template>
    <Dialog
        v-model:show="show"
        width="740px"
        :overlay="false"
        :customStyle="{
            backdropFilter: 'blur(18px)',
            background: 'rgba(200, 200, 200, 0.5)',
            padding: '16px',
        }"
        :closeIcon="false"
    >
        <h2>编辑图标</h2>
        <main><IconCustom :info="info" :index="cur" @close="show = false" /></main>
    </Dialog>
</template>

<script setup lang="ts">
import IconCustom from "./IconCustom.vue";
const props = defineProps<{
    info: any;
    cur: number;
}>();
const show = defineModel();
</script>
<style lang="scss" scoped></style>
