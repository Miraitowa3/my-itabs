<template>
    <Dialog v-model:show="show" width="40%" :closeOnClickModal="false">
        <div class="login">
            <Login></Login>
            <Registry></Registry>
        </div>
    </Dialog>
</template>
<script lang="ts" setup>
import Login from "./Login.vue";
import Registry from "./Registry.vue";

const show = defineModel();
</script>
<style scoped>
.login {
    display: flex;
}
</style>
