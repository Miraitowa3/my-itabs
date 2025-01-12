<template>
    <div id="app-main" class="app-main absolute flex h-full w-full flex-col" @wheel="debouncedHandleWheel">
        <!-- <MacDocker class="fixed left-1/2 top-1/2 h-12 -translate-x-1/2 pl-5 pr-5"></MacDocker> -->

        <div class="app-header"></div>
        <div class="app-date-box bg-orange-300">time</div>
        <div class="app-search bg-slate-400">search</div>
        <div class="app-icon-grid-wrap flex-1" style="flex: 1 1 0%">
            <div class="app-icon-grid d-hidden h-full">
                <ul class="app-icon-wrap" ref="appIconWrap">
                    <li class="app-icon-item" v-for="(item, index) in siderList" :name="item.id" :key="item.id" :style="{ opacity: cur.current === item.title ? 1 : 0 }">
                        <div class="d-scrollbar-hide h-full" :id="'app-grid_' + item.id" style="pointer-events: auto; transition: transform 0.26s cubic-bezier(0.165, 0.84, 0.44, 1)">
                            <ul class="app-grid">
                                <li class="item mb-4 flex h-20 items-center justify-center rounded-xl bg-fuchsia-500" v-for="(item, index) in itemList">{{ item }}</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="app-yiyan app-yiyan flex cursor-pointer justify-center overflow-hidden bg-transparent leading-5">
            <div class="app-yiyan-body relative">
                <div class="yiyan-text" title="点击左键复制，右键切换">「 那些听不见音乐的人认为那些跳舞的人疯了。 」</div>
                <div class="yiyan-from text-center">-亨利·柏格森-</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
const cur = defineModel<any>({ required: true });
const itemList = ref<any>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]);
const props = defineProps<{ siderList: { title: string; icon: string; id: string }[] }>();
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
            const scorllY = (document.querySelector("#" + "app-grid_" + cur.value.current + "> ul") as HTMLUListElement).getBoundingClientRect().height;
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
        scrollDisYIndex.value += 1;
        if (scrollDisYIndex.value > scrollDisYList.value.length - 1) {
            cur.value.currentTab++;
            if (cur.value.currentTab === props.siderList.length) {
                cur.value.currentTab = 0;
            }
            cur.value.current = props.siderList[cur.value.currentTab].title;
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
        scrollDisYIndex.value -= 1;
        if (scrollDisYIndex.value < 0) {
            cur.value.currentTab--;
            if (cur.value.currentTab < 0) {
                cur.value.currentTab = props.siderList.length - 1;
            }
            cur.value.current = props.siderList[cur.value.currentTab].title;
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
// function handleWheel(e: WheelEvent) {
//     if (e.deltaY > 0) {
//         cur.value.currentTab++;

//         if (cur.value.currentTab === props.siderList.length) {
//             cur.value.currentTab = 0;
//         }
//     } else {
//         cur.value.currentTab--;
//         if (cur.value.currentTab < 0) {
//             cur.value.currentTab = props.siderList.length - 1;
//         }
//     }

//     cur.value.current = props.siderList[cur.value.currentTab].title;
//     updateTranslateY();
// }
function updateTranslateY() {
    scrollDisYIndex.value = 0;
    appGridId.value!.style.transform = `translateY(-${scrollDisYIndex.value}px)`;
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
