<template>
    <div class="app-icon-grid-wrap relative flex-1" style="flex: 1 1 0%">
        <div class="app-icon-grid d-hidden h-full" :style="{ opacity: layout.view === 'widget' ? 1 : 0 }">
            <ul class="app-icon-wrap" ref="appIconWrap">
                <li class="app-icon-item" v-for="(item, i) in navConfig" :name="item.id" :key="item.id" :style="{ opacity: cur.current === item.id ? 1 : 0 }">
                    <div class="d-scrollbar-hide h-full" :id="'app-grid_' + item.id" style="pointer-events: auto; transition: transform 0.26s cubic-bezier(0.165, 0.84, 0.44, 1)">
                        <AppItemContentMenu
                            ref="appItemContentMenu"
                            :target="`#app-grid_${item.id} .app-grid`"
                            :list="item.children"
                            @delete="(i) => handleDelete(cur.currentTab, i)"
                        />
                        <VueDraggable v-model="item.children" :animation="150" target=".app-grid" @start="onStart" @end="onEnd">
                            <!-- <ul class="app-grid"> -->
                            <TransitionGroup type="transition" tag="ul" name="list" class="app-grid">
                                <template v-for="(it, index) in item.children" :key="it.id">
                                    <li :class="['app-item', `icon-size-${it.size ? it.size : '1X1'}`]" v-if="it.type === 'icon' || it.type === 'text'">
                                        <div class="relative h-full w-full">
                                            <div
                                                class="app-item-icon"
                                                :class="{ swing: isBatchEdit }"
                                                :style="{
                                                    'background-color': it['backgroundColor'] ? it['backgroundColor'] : '#FFFFFF',
                                                }"
                                                :cs="it.id + '_' + index"
                                                @click.stop="clickIcon(it)"
                                            >
                                                <img
                                                    v-if="it.type === 'icon'"
                                                    class="app-item-img"
                                                    :src="it.src"
                                                    :style="{
                                                        'pointer-events': 'none',
                                                        '--icon-bg-color': it['backgroundColor'] ? it['backgroundColor'] : '#FFFFFF',
                                                        '--icon-fit': 'contain',
                                                    }"
                                                />
                                                <span v-else class="item-icon-text text-[#fff]">{{ it.iconText }}</span>
                                            </div>
                                            <div class="icon-item-delete d-flex-center" v-if="isBatchEdit" @click="deleteIcon(i, index)">
                                                <i class="text-[14px]">
                                                    <svg-icon name="close"></svg-icon>
                                                </i>
                                            </div>
                                            <p class="app-item-title d-elip">{{ it.name }}</p>
                                        </div>
                                    </li>
                                </template>
                                <!-- </ul> -->
                            </TransitionGroup>
                        </VueDraggable>
                    </div>
                </li>
            </ul>
        </div>
        <div class="fixed bottom-0 right-6 z-10 flex flex-col items-center" v-if="wallpaper.switchBtn">
            <i class="switch-wallpaper relative top-[-7px] z-10 cursor-pointer text-[22px]" @click.stop="switchWallpaper"> <svg-icon name="feng"></svg-icon> </i
            ><span class="relative z-0 mt-[-21px] h-[40px] w-1 bg-slate-100"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
import { VueDraggable } from "vue-draggable-plus";
import { useGlobalStore } from "@/stores/global";
import AppItemContentMenu from "./AppItemContentMenu.vue";
import { getRandomInRange } from "@/utils";

const global = useGlobalStore();
const { cur, navConfig, isBatchEdit } = storeToRefs(global);
const drag = ref(false);
const appIconWrap = ref<HTMLUListElement>();
const scrollDisYIndex = ref<number>(0);
const BASE_TRANSLATE_Y = ref(500);
const scrollDisYList = ref<number[]>([]);
const appGridId = ref<HTMLUListElement>();
const baseConfigStore = useBaseConfigStore();
const { sidebar, layout, open, wallpaper } = storeToRefs(baseConfigStore);
const appItemContentMenu = ref<any>();
function onStart() {
    drag.value = true;
}
function onEnd(e: any) {
    nextTick(() => {
        drag.value = false;
    });
}

watch(
    () => cur.value.current,
    (value: string) => {
        if (appItemContentMenu.value) {
            appItemContentMenu.value.forEach((item: any) => {
                item.closeMenu();
            });
        }

        nextTick(() => {
            updateXY();
        });
    },
    { immediate: true },
);
function switchWallpaper() {
    const index = getRandomInRange(1, 145);
    wallpaper.value.src = `https://raw.gitcode.com/miraitowa_001/image/raw/master/yuan/${index}.webp`;
    wallpaper.value.thumb = `https://raw.gitcode.com/miraitowa_001/image/raw/master/dist/${index}.webp`;
}
function updateXY() {
    const clientY = appIconWrap.value!.getBoundingClientRect().height;

    const scorllY = (document.querySelector("#" + "app-grid_" + cur.value.current + "> div") as HTMLUListElement).getBoundingClientRect().height;

    const disY = scorllY - clientY;
    let total = Math.floor(disY / BASE_TRANSLATE_Y.value);
    if (total === 0) {
        scrollDisYList.value = [0, disY % BASE_TRANSLATE_Y.value];
    } else {
        let arr = [0];
        for (let index = 0; index <= total; index++) {
            if (index === total) {
                arr.push(disY % BASE_TRANSLATE_Y.value);
            } else {
                arr.push(BASE_TRANSLATE_Y.value);
            }
        }
        scrollDisYList.value = arr;
    }
    appGridId.value = document.querySelector("#" + "app-grid_" + cur.value.current) as HTMLUListElement;
}
watch(
    () => cur.value.current,
    (value: string) => {
        //切换tab时，更新 tab-content 位置
        nextTick(() => {
            updateTranslateY();
        });
    },
    {
        deep: true,
        immediate: true,
    },
);
function handleDelete(i: number, cur: number) {
    let list = navConfig.value;
    if (list[i].children.length === 0) {
        return;
    } else if (list[i].children.length - 1 < cur) {
        list[i].children.splice(list[i].children.length - 1, 1);
    } else {
        list[i].children.splice(cur, 1);
    }

    global.setNavConfig(list);
}
function handleWheel(e: WheelEvent) {
    if (!sidebar.value.mouseGroup) {
        return;
    }
    if (e.deltaY > 0) {
        //向下滚动
        scrollDisYIndex.value += 1;
        if (scrollDisYIndex.value > scrollDisYList.value.length - 1) {
            //app-grid 滚动到底部，切换下一个tab
            cur.value.currentTab++;
            if (cur.value.currentTab === navConfig.value.length) {
                cur.value.currentTab = 0;
            }
            cur.value.current = navConfig.value[cur.value.currentTab].id;
        } else {
            let totalY = 0;
            scrollDisYList.value.forEach((item: number, index: number) => {
                if (index > scrollDisYIndex.value) {
                    return;
                } else {
                    totalY += item;
                }
            });
            appGridId.value!.style.transform = `translateY(-${totalY}px)`;
        }
    } else {
        //向上滚动

        scrollDisYIndex.value -= 1;
        if (scrollDisYIndex.value < 0) {
            //app-grid 滚动到顶部，切换上一个tab
            cur.value.currentTab--;
            if (cur.value.currentTab < 0) {
                cur.value.currentTab = navConfig.value.length - 1;
            }
            cur.value.current = navConfig.value[cur.value.currentTab].id;
        } else {
            let totalY = 0;
            scrollDisYList.value.forEach((item: number, index: number) => {
                if (index > scrollDisYIndex.value) {
                    return;
                } else {
                    totalY += item;
                }
            });
            appGridId.value!.style.transform = `translateY(-${totalY}px)`;
        }
    }
}

function updateTranslateY() {
    // 切换tab时，app-grid重置到初始位置
    scrollDisYIndex.value = 0;
    appGridId.value!.style.transform = `translateY(-${scrollDisYIndex.value}px)`;
    //更新位置
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${(index - cur.value.currentTab) * h}px) scale(1)`;
    });
}
const debouncedHandleWheel = throttle(handleWheel, 600);

function throttle<T extends (...args: any[]) => any>(func: T, wait: number) {
    let lastTime = 0;
    return function (...args: any[]) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            func.apply(this, args);
            lastTime = now;
        }
    };
}
function deleteIcon(i: number, index: number) {
    // Fliap.value.start();
    navConfig.value[i].children.splice(index, 1);
    // Fliap.value.play();
}
function clickIcon(item: any) {
    window.open(item.url, open.value.iconBlank ? "_blank" : "_self");
}
watch(
    () => navConfig.value,
    () => {
        //删除分组更新 位置信息
        nextTick(() => {
            upDateComponent();
            updateXY();
            updateTranslateY();
        });
    },
    { deep: true },
);
function upDateComponent() {
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${h * index}px)`;
    });
}
onMounted(() => {
    upDateComponent();
    const clientY = appIconWrap.value!.getBoundingClientRect().height;
    if (BASE_TRANSLATE_Y.value > clientY) {
        BASE_TRANSLATE_Y.value = clientY / 2;
    }
});
defineExpose({
    debouncedHandleWheel,
});
</script>
<style scoped lang="scss">
@keyframes aswing {
    0% {
        transform: rotate(0) scale(1);
    }

    20% {
        transform: rotate(-2deg) scale(1);
    }

    60% {
        transform: rotate(0) scale(1);
    }

    80% {
        transform: rotate(2deg) scale(1);
    }

    to {
        transform: rotate(0) scale(1);
    }
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active {
    transition: all 0.3s ease;
}
.list-leave-active {
    transition: none;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}
.switch-wallpaper {
    transition: all 1s ease-in-out;
    &:hover {
        transform: rotate(720deg);
    }
}
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
}
.swing {
    animation: aswing ease 0.3s infinite;
    transform-origin: center 50px;
}
.app-icon-grid {
    pointer-events: none;
    max-width: var(--icon-max-width, 1350px);
    margin: 0 auto;
    padding: 0 var(--sidebar-width, 45px);
    height: 100%;
}
.d-flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;
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
    // line-height: 200px;
}

.app-item-icon {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--icon-radius);
    font-size: 12px;
    box-shadow: 0 0 5px #0000001a;
    transition: transform 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }
}
.app-item-img {
    display: block;
    -o-object-fit: contain;
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--icon-bg-color);
}
.app-item-title {
    width: calc(100% + var(--icon-gap-y));
    margin-left: calc(var(--icon-gap-y) / 2 * -1);
    display: var(--icon-name);
    margin-top: 6px;
    text-align: center;
    color: var(--icon-nameColor);
    font-size: var(--icon-nameSize);
    line-height: 1.1;
    filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.8));
}
.app-grid {
    position: relative;
    display: grid;
    padding-top: 2vh;
    -webkit-user-select: none;
    user-select: none;
    grid-template-columns: repeat(auto-fill, var(--icon-size));
    grid-template-rows: repeat(auto-fill, var(--icon-size));
    grid-auto-flow: dense;
    grid-gap: var(--icon-gap-x) var(--icon-gap-y);
    box-sizing: border-box;
    justify-content: center;
    padding-bottom: 50px;
}
.app-item {
    list-style-type: none;
    grid-column: span 1;
    grid-row: span 1;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
    box-sizing: border-box;
    opacity: var(--icon-opacity);
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: var(--icon-radius);

    .icon-item-delete {
        &:hover {
            cursor: pointer;
            background-color: rgb(216, 48, 48);
            color: rgb(255, 255, 255);
        }
        z-index: 11;
        position: absolute;
        backdrop-filter: blur(10px);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 7px;
        right: 2px;
        top: -5px;
        height: 20px;
        width: 20px;
        color: rgb(51, 51, 51);
        background-color: rgba(255, 255, 255, 0.4);

        border-radius: 50%;
        transition: 0.2s;
    }
}

.d-elip {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.icon-size-1x2 {
    grid-column: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 1);
    height: var(--icon-size);
}
.icon-size-2x1 {
    grid-row: span 2;
    width: var(--icon-size);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 1);
}
.icon-size-2x2,
.icon-size-small {
    grid-column: span 2;
    grid-row: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y));
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x));
}
.icon-size-2x4,
.icon-size-medium {
    grid-column: span 4;
    grid-row: span 2;
    width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 3);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x));
}
.icon-size-1x1,
.icon-size-mini {
    width: var(--icon-size);
    height: var(--icon-size);
}
</style>
