<template>
    <Teleport to="body">
        <itab-wallpaper url="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5ggol7.png?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_95/format,webp"> </itab-wallpaper>
    </Teleport>

    <div class="app-sider fixed bottom-0 top-0 z-[2]">
        <div class="app-sidebar-body f12 flex h-full w-full flex-col text-center">
            <div class="app-sidebar-avatar flex justify-center"><img data-v-10b8c295="" class="h-[30px] w-[30px] rounded-full object-cover" src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp" /></div>
            <div class="app-sidebar-group d-scrollbar-hide">
                <ul class="app-sidebar-ul">
                    <VueDraggable v-model="siderList" :animation="150" target=".sort-target" @start="onStart" @end="onEnd">
                        <TransitionGroup type="transition" tag="ul" :name="!drag ? 'fade' : undefined" class="sort-target">
                            <li
                                class="app-group-item"
                                :name="item.id"
                                :style="{ backgroundColor: current === item.title ? '#ffffff26' : '' }"
                                v-for="item in siderList"
                                :key="item.id"
                                @click="
                                    () => {
                                        current = item.title;
                                        currentTab = getInex(item.title);
                                        console.log(currentTab);
                                        updateTranslateY();
                                    }
                                "
                            >
                                <p>{{ item.title }}</p>
                            </li>
                        </TransitionGroup>
                    </VueDraggable>
                </ul>
            </div>
        </div>
    </div>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="debouncedHandleWheel">
        <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker>

        <div class="app-header"></div>
        <div class="app-date-box bg-orange-300">time</div>
        <div class="app-search bg-slate-400">search</div>
        <div class="app-icon-grid-wrap flex-1" style="flex: 1 1 0%">
            <div class="app-icon-grid d-hidden h-full">
                <ul class="app-icon-wrap" ref="appIconWrap">
                    <li class="app-icon-item" v-for="(item, index) in siderList" :name="item.id" :key="item.id" :style="{ opacity: current === item.title ? 1 : 0 }">
                        <h1>{{ item.title }}</h1>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import MacDocker from "../../components/MacDocker.vue";
const appIconWrap = ref<HTMLElement>();
const current = ref("首页");
const currentTab = ref(0);

import { VueDraggable } from "vue-draggable-plus";
const drag = ref(false);
const siderList = ref([
    {
        title: "首页",
        icon: "red",
        id: "首页",
    },
    {
        title: "程序员",
        icon: "pink",
        id: "程序员",
    },
    {
        title: "设计",
        icon: "green",
        id: "设计",
    },
    {
        title: "摸鱼",
        icon: "blue",
        id: "摸鱼",
    },
    {
        title: "软件工具",
        icon: "orange",
        id: "软件工具",
    },
]);

function getInex(name: string) {
    return siderList.value.findIndex((item) => item.title === name);
}
function onStart() {
    drag.value = true;
}
function onEnd(e: any) {
    if (e.clonedData.title === current.value) {
        currentTab.value = e.newIndex;
    }

    console.log("onEnd");
    nextTick(() => {
        drag.value = false;
    });
}
onMounted(() => {
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${h * index}px)`;
    });
});
function handleWheel(e: WheelEvent) {
    if (e.deltaY > 0) {
        currentTab.value++;
        if (currentTab.value === siderList.value.length) {
            currentTab.value = 0;
        }
    } else {
        currentTab.value--;
        if (currentTab.value < 0) {
            currentTab.value = siderList.value.length - 1;
        }
    }

    current.value = siderList.value[currentTab.value].title;
    updateTranslateY();
}
function updateTranslateY() {
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${(index - currentTab.value) * h}px) scale(1)`;
    });
}
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timer: NodeJS.Timeout | null;

    return function (...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            console.log("debounce");

            func(...args);
        }, delay);
    };
}
const debouncedHandleWheel = debounce(handleWheel, 200);

//拖拽
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
.app-main {
    z-index: 1;
}

.app-header {
    --height: 3vh;
    height: var(--height);
    color: #080505;
    transition: 0.2s;
    position: relative;
}
.app-date-box {
    height: 99px;
    text-align: center;
    line-height: 99px;
    font-size: 40px;
}
.app-search {
    height: 95px;
    text-align: center;
    line-height: 95px;
    font-size: 40px;
}
.app-icon-grid {
    pointer-events: none;
    max-width: 1350px;
    margin: 0 auto;
    padding: 0 45px;
    height: 100%;
}
.app-icon-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
}
.app-icon-item {
    transition: transform ease-out 0.28s !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    /* z-index: calc(var(--el-index-normal) - 1); */
    font-size: 40px;
    text-align: center;
    line-height: 200px;
}
.app-group-item.moving {
    /* background: transparent;
    color: transparent;
    border: 1px dashed red; */
}
</style>
