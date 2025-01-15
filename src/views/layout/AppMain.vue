<template>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="debouncedHandleWheel">
        <!-- <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker> -->

        <div class="app-header" :style="{ height: isSiderShow ? '3vh' : '18vh' }"></div>

        <div class="app-date-box ac" style="">
            <div>
                <div class="app-time" @click="toggleTime">
                    <time class="hh">20</time><span class="colon hh">:</span><time class="mm">44</time
                    ><span class="colon" style="display: none">:</span><span class="sec">34</span>
                </div>
            </div>
            <div class="app-date">
                <span class="time-month">01月13日</span><span class="time-week">星期一</span
                ><span class="time-lunar">腊月十四</span>
            </div>
        </div>
        <!-- 搜索栏 -->
        <AppSearch />

        <div class="app-icon-grid-wrap flex-1" style="flex: 1 1 0%">
            <div class="app-icon-grid d-hidden h-full" :style="{ opacity: isSiderShow ? 1 : 0 }">
                <ul class="app-icon-wrap" ref="appIconWrap">
                    <li
                        class="app-icon-item"
                        v-for="(item, index) in siderList"
                        :name="item.id"
                        :key="item.id"
                        :style="{ opacity: cur.current === item.id ? 1 : 0 }"
                    >
                        <div
                            class="d-scrollbar-hide h-full"
                            :id="'app-grid_' + item.id"
                            style="pointer-events: auto; transition: transform 0.26s cubic-bezier(0.165, 0.84, 0.44, 1)"
                        >
                            <VueDraggable
                                v-model="item.children"
                                :animation="150"
                                target=".app-grid"
                                @start="onStart"
                                @end="onEnd"
                            >
                                <TransitionGroup
                                    type="transition"
                                    tag="ul"
                                    :name="!drag ? 'fade' : undefined"
                                    class="app-grid"
                                >
                                    <li
                                        :class="['app-item', `icon-size-${it.size ? it.size : '1X1'}`]"
                                        v-for="(it, index) in item.children"
                                        :key="it.id"
                                    >
                                        <div
                                            class="app-item-icon"
                                            :style="{
                                                'background-color': it['backgroundColor']
                                                    ? it['backgroundColor']
                                                    : '#FFFFFF',
                                            }"
                                        >
                                            <img
                                                v-if="it.src"
                                                class="app-item-img"
                                                :src="it.src"
                                                :style="{
                                                    'pointer-events': 'none',
                                                    '--icon-bg-color': it['backgroundColor']
                                                        ? it['backgroundColor']
                                                        : '#FFFFFF',
                                                    '--icon-fit': 'contain',
                                                }"
                                            />
                                        </div>
                                        <p class="app-item-title d-elip">{{ it.name }}</p>
                                    </li>
                                </TransitionGroup>
                            </VueDraggable>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="app-yiyan app-yiyan flex cursor-pointer justify-center overflow-hidden bg-transparent leading-5">
            <div class="app-yiyan-body relative">
                <div class="yiyan-text" title="点击左键复制，右键切换">
                    「 那些听不见音乐的人认为那些跳舞的人疯了。 」
                </div>
                <div class="yiyan-from text-center">-亨利·柏格森-</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppSearch from "./AppSearch.vue";
import { VueDraggable } from "vue-draggable-plus";
const cur = defineModel<any>({ required: true });
const isSiderShow = defineModel<any>("isSiderShow", { required: true });

const drag = ref(false);
const props = defineProps<{ siderList: any[] }>();
const appIconWrap = ref<HTMLUListElement>();
const scrollDisYIndex = ref<number>(0);
const BASE_TRANSLATE_Y = ref(500);
const scrollDisYList = ref<number[]>([]);
const appGridId = ref<HTMLUListElement>();
watch(
    () => cur.value.current,
    (value: number) => {
        nextTick(() => {
            const clientY = appIconWrap.value!.getBoundingClientRect().height;

            const scorllY = (
                document.querySelector("#" + "app-grid_" + cur.value.current + "> div") as HTMLUListElement
            ).getBoundingClientRect().height;
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
        });
    },
    { immediate: true },
);
function onStart() {
    drag.value = true;
}
function onEnd(e: any) {
    nextTick(() => {
        drag.value = false;
    });
}
function handleWheel(e: WheelEvent) {
    if (e.deltaY > 0) {
        //向下滚动
        scrollDisYIndex.value += 1;
        if (scrollDisYIndex.value > scrollDisYList.value.length - 1) {
            //app-grid 滚动到底部，切换下一个tab
            cur.value.currentTab++;
            if (cur.value.currentTab === props.siderList.length) {
                cur.value.currentTab = 0;
            }
            cur.value.current = props.siderList[cur.value.currentTab].id;
            updateTranslateY();
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
                cur.value.currentTab = props.siderList.length - 1;
            }
            cur.value.current = props.siderList[cur.value.currentTab].id;
            updateTranslateY();
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
const debouncedHandleWheel = debounce(handleWheel, 200);
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timer: NodeJS.Timeout | null;

    return function (...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
onMounted(() => {
    let child = Array.from(appIconWrap.value!.children) as HTMLElement[];
    let h = appIconWrap.value!.offsetHeight;
    child.forEach((ele: HTMLElement, index: number) => {
        ele.style.transform = `translateY(${h * index}px)`;
    });
    //
    const clientY = appIconWrap.value!.getBoundingClientRect().height;
    if (BASE_TRANSLATE_Y.value > clientY) {
        BASE_TRANSLATE_Y.value = clientY / 2;
    }
});
function toggleTime() {
    isSiderShow.value = !isSiderShow.value;
}
defineExpose({
    updateTranslateY,
});
</script>
<style scoped>
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
@media screen and (min-height: 768px) {
    .app-header {
        --height: 6vh;
    }
}
.app-date-box {
    text-align: center;
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

/* date 样式 */
:host {
    user-select: none;
    text-align: center;
    -webkit-user-select: none;
    color: #fff;
}
.app-date-box {
    font-family: auto;
}
.app-date {
    font-size: 14px;
    line-height: 26px;
    opacity: 0.88;
    margin-top: -3px;
    text-shadow: 0 2px 4px rgb(0 0 0 / 16%);
}

.app-date span {
    margin: 0 2px;
}

.app-date .time-month {
    color: #fff;

    display: inline;
}

.app-date .time-week {
    color: #fff;

    display: inline;
}

.app-date .time-lunar {
    color: #fff;

    display: inline;
}

.app-time {
    font-size: 70px;
    font-family: HarmonyOS_Sans;
    user-select: none;
    font-weight: var(400);
    text-shadow: 0 2px 6px rgb(0 0 0 / 16%);
    display: inline-block;
    line-height: 70px;
    transition: font 0.2s;
    color: #fff;
}
.app-time.fontFamily-align .colon {
    vertical-align: unset !important;
}
.app-time .colon {
    vertical-align: calc(70px / 12);
}
.app-time .sec {
    display: none;
}

.app-item-icon {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 12.8px;
    font-size: 12px;
    box-shadow: 0 0 5px #0000001a;
    transition: transform 0.2s;
    cursor: pointer;
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
    --icon-gap-y: 24px;
    width: calc(100% + var(--icon-gap-y));
    margin-left: calc(var(--icon-gap-y) / 2 * -1);
    display: block;
    margin-top: 6px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 1.1;
    filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.8));
}
.app-grid {
    --icon-size: 47.28888888888889px;
    --icon-gap-x: 25.333333333333332px;
    --icon-gap-y: 25.333333333333332px;
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
    --icon-size: 47.28888888888889px;
    --icon-opacity: 1;
    --icon-radius: 13.511111111111111px;
    list-style-type: none;
    position: relative;
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
}

.d-elip {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.icon-size-1x2 {
    --icon-gap-y: 24px;
    --icon-size: 44.800000000000004px;
    grid-column: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 1);
    height: var(--icon-size);
}
.icon-size-2x1 {
    --icon-gap-x: 24px;
    --icon-size: 44.800000000000004px;
    grid-row: span 2;
    width: var(--icon-size);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 1);
}
.icon-size-2x2,
.icon-size-small {
    --icon-gap-x: 24px;
    --icon-gap-y: 24px;
    --icon-size: 44.800000000000004px;
    grid-column: span 2;
    grid-row: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y));
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x));
}
.icon-size-2x4,
.icon-size-medium {
    --icon-gap-x: 24px;
    --icon-gap-y: 24px;
    --icon-size: 44.800000000000004px;
    grid-column: span 4;
    grid-row: span 2;
    width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 3);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x));
}
.icon-size-1x1,
.icon-size-mini {
    --icon-gap-y: 24px;

    width: var(--icon-size);
    height: var(--icon-size);
}
</style>
