<template>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="debouncedHandleWheel">
        <!-- <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker> -->

        <div class="app-header"></div>

        <div class="app-date-box ac" style="">
            <div>
                <div class="app-time">
                    <time class="hh">20</time><span class="colon hh">:</span><time class="mm">44</time
                    ><span class="colon" style="display: none">:</span><span class="sec">34</span>
                </div>
            </div>
            <div class="app-date">
                <span class="time-month">01月13日</span><span class="time-week">星期一</span
                ><span class="time-lunar">腊月十四</span>
            </div>
        </div>

        <div id="app-search-wrap" class="w-full">
            <div class="app-search-box relative">
                <form action="#" class="se-input-box relative flex items-center overflow-hidden">
                    <div class="se-select">
                        <img
                            class="search-icon"
                            src="https://files.codelife.cc/itab/search/google.svg"
                            style="width: 20px; height: 20px"
                        />
                        <i
                            class="d-icon select-icon-arrow absolute right-[2px] top-1/2 mt-[-5px] text-[12px]"
                            style="color: rgba(0, 0, 0, 0.2)"
                        >
                            <svg-icon name="opt"></svg-icon>
                        </i>
                    </div>
                    <input
                        id="searchInput"
                        autocomplete="off"
                        class="se-input h-ful w-full bg-transparent text-[14px] leading-[22px]"
                        maxlength="220"
                        placeholder="输入搜索内容"
                        type="text"
                    />
                    <div class="se-close flex cursor-pointer">
                        <i class="d-icon text-[30px]" style="color: rgba(0, 0, 0, 0.52)">
                            <svg-icon name="close"></svg-icon>
                        </i>
                    </div>
                    <button type="button" class="se-select">
                        <i class="d-icon text-[20px]" style="color: rgba(0, 0, 0, 0.52)">
                            <svg-icon name="search"></svg-icon>
                        </i>
                    </button>
                </form>
            </div>
        </div>
        <div class="app-icon-grid-wrap flex-1" style="flex: 1 1 0%">
            <div class="app-icon-grid d-hidden h-full">
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
                            <ul class="app-grid mb-3 mr-2 flex">
                                <li
                                    class="item mb-4 flex h-20 flex-col items-center justify-center rounded-xl"
                                    v-for="(it, index) in item.children"
                                >
                                    <div class="app-item-icon">
                                        <img
                                            class="app-item-img"
                                            :src="it.src"
                                            :style="{
                                                'pointer-events': 'none',
                                                '--icon-bg-color': it['backgroundColor'],
                                                '--icon-fit': 'contain',
                                            }"
                                        />
                                    </div>
                                    <p class="app-item-title d-elip">{{ it.name }}</p>
                                </li>
                            </ul>
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
import { ref, onMounted, nextTick, watch } from "vue";
const cur = defineModel<any>({ required: true });
const itemList = ref<any>([]);
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
                document.querySelector("#" + "app-grid_" + cur.value.current + "> ul") as HTMLUListElement
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
.app-search-box {
    max-width: 600px;
    margin: 3vh auto 20px;
    width: 100%;
}
.se-input-box {
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    box-shadow: 0 0 10px 3px #0000001a;
    z-index: 1;
    border-radius: 23px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: background 0.2s;
    color: #222;
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
.se-select {
    background-color: initial;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 50px;
    max-width: 50px;
    transition: 0.2s;
    position: relative;
}
.se-close {
    /* transform: scale(0); */
    transition: transform 0.2s;
}
.se-input {
    color: #222 !important;
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
</style>
