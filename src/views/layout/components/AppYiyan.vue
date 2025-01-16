<template>
    <div class="app-yiyan app-yiyan flex cursor-pointer justify-center overflow-hidden bg-transparent leading-5">
        <div class="app-yiyan-body relative">
            <div class="yiyan-text" title="点击左键复制，右键切换">「 那些听不见音乐的人认为那些跳舞的人疯了。 」</div>
            <div class="yiyan-from text-center">-亨利·柏格森-</div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.app-yiyan {
    max-height: 60px;
    color: #ffffffe6;
}
.yiyan-text {
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    font-size: 12px;
}
.yiyan-from {
    font-size: 12px;
    opacity: 0;
    transition: 0.4s;
}
.app-yiyan .app-yiyan-body:hover {
    background-color: #00000005;
}
.app-yiyan .app-yiyan-body:hover .yiyan-from {
    opacity: 1;
}
</style>
