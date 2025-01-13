<template>
    <div class="app-sider fixed bottom-0 top-0 z-[2]">
        <div class="app-sidebar-body f12 flex h-full w-full flex-col text-center">
            <div class="app-sidebar-avatar flex justify-center"><img data-v-10b8c295="" class="h-[30px] w-[30px] rounded-full object-cover" src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp" /></div>
            <div class="app-sidebar-group d-scrollbar-hide">
                <ul class="app-sidebar-ul">
                    <VueDraggable v-model="siderList" :animation="150" target=".sort-target" @start="onStart" @end="onEnd">
                        <TransitionGroup type="transition" tag="ul" :name="!drag ? 'fade' : undefined" class="sort-target">
                            <li class="app-group-item" :name="item.id" :style="{ backgroundColor: cur.current === item.title ? '#ffffff26' : '' }" v-for="item in siderList" :key="item.id" @click="changeTab(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M7 8l-4 4l4 4"></path>
                                        <path d="M17 8l4 4l-4 4"></path>
                                        <path d="M14 4l-4 16"></path>
                                    </g>
                                </svg>
                                <p>{{ item.title }}</p>
                            </li>
                        </TransitionGroup>
                    </VueDraggable>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { VueDraggable } from "vue-draggable-plus";

const cur = defineModel<any>({ required: true });
const siderList = defineModel<{ title: string; icon: string; id: string }[]>("siderList", { required: true });

const drag = ref(false);
const emits = defineEmits(["updateTranslateY"]);
function changeTab(item: any) {
    cur.value.current = item.title;
    cur.value.currentTab = getInex(item.title);
    emits("updateTranslateY");
}
function onStart() {
    drag.value = true;
}
function getInex(name: string) {
    return siderList.value.findIndex((item) => item.title === name);
}

function onEnd(e: any) {
    nextTick(() => {
        //等待dom更新后，再能获取最新index
        if (e.clonedData.title === cur.value.current) {
            cur.value.currentTab = e.newIndex;
        } else {
            cur.value.currentTab = getInex(cur.value.current);
        }

        drag.value = false;
    });
}
</script>
<style scoped>
.app-sider {
    width: 50px;
    animation: fadeIn 0.2s;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.app-sider > .app-sidebar-body {
    background-color: rgba(98, 118, 115, 0.1);
    backdrop-filter: blur(6px);
    color: rgba(233, 233, 233, 0.6);
}
.app-sider .app-sidebar-body .app-sidebar-avatar {
    margin-top: 40px;
    margin-bottom: 40px;
    cursor: pointer;
}
.app-sidebar-group {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
}
.d-scrollbar-hide {
    scrollbar-width: none;
    scrollbar-color: rgba(255, 255, 255, 0.4) rgba(0, 0, 0, 0);
}
.app-sidebar-ul {
}
.app-group-item {
    padding: 20px 0 20px 0;
}
.app-group-item.moving {
    /* background: transparent;
    color: transparent;
    border: 1px dashed red; */
}
</style>
