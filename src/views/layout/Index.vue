<template>
    <Teleport to="body">
        <itab-wallpaper url="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5ggol7.png?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_95/format,webp"> </itab-wallpaper>
    </Teleport>
    <div class="app-sider fixed bottom-0 top-0 z-[2]">
        <div class="app-sidebar-body f12 flex h-full w-full flex-col text-center">
            <div class="app-sidebar-avatar flex justify-center"><img data-v-10b8c295="" class="h-[30px] w-[30px] rounded-full object-cover" src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp" /></div>
            <div class="app-sidebar-group d-scrollbar-hide">
                <ul class="app-sidebar-ul">
                    <li class="app-group-item" :style="{ backgroundColor: currentTab === index ? '#ffffff26' : '' }" v-for="(item, index) in siderList" :key="item.title" @click="currentTab = index">
                        <p>{{ item.title }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="handleWheel">
        <div class="app-header"></div>
        <div class="app-date-box bg-orange-300">time</div>
        <div class="app-search bg-slate-400">search</div>
        <div class="app-icon-grid-wrap flex-1" style="flex: 1 1 0%">
            <div class="app-icon-grid d-hidden h-full">
                <ul class="app-icon-wrap" ref="appIconWrap">
                    <li class="app-icon-item" v-for="(item, index) in siderList" :key="item.title" :style="{ backgroundColor: item['icon'] }">{{ item.title }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const appIconWrap = ref<HTMLElement>();
const currentTab = ref(0);

const siderList = ref([
    {
        title: "首页",
        icon: "red",
    },
    {
        title: "程序员",
        icon: "pink",
    },
    {
        title: "设计",
        icon: "green",
    },
    {
        title: "摸鱼",
        icon: "blue",
    },
    {
        title: "软件工具",
        icon: "orange",
    },
]);
onMounted(() => {
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${h * index}px)`;
    });
});
function handleWheel(e: WheelEvent) {
    console.log(e, 9999999999);

    // currentTab.value++;
    // let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    // let h = appIconWrap.value!.offsetHeight;
    // child.forEach((ele: HTMLElement, index: number) => {
    //     ele.style.transform = `translateY(${-h * index}px)`;
    // });
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
</style>
