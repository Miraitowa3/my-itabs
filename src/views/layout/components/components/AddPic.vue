<template>
    <el-dialog v-model="show" :width="innerWidth <= 1000 ? '100%' : '1000px'" :show-close="false" class="add-pic-container" :fullscreen="fullscreen">
        <section class="p-body" :style="{ height: fullscreen ? '100%' : '600px' }">
            <div class="flex h-full">
                <aside class="aside">
                    <h2>壁纸库</h2>
                    <div class="sidebar-box">
                        <ul ref="ulRef">
                            <div class="d-tabs-active" :style="{ top: `${top}px` }"></div>
                            <li v-for="(item, index) in tabList" :key="index" @click.stop="cur = index" class="d-tabs-item" :class="{ hover: index !== cur }">
                                <span :style="{ color: index === cur ? 'var(--el-color-primary)' : 'rgba(var(--alpha-color), 0.6)' }">
                                    {{ item.name }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </aside>
                <main class="main">
                    <DialogHeader @close="show = false" @full-screen="fullScreen" />
                    <p class="tabs" style="width: 80%; line-height: 16px"><span class="active mr10">最新</span><span class="">最热</span></p>
                    <div class="d-scrollbar conbox" ref="rootRef">
                        <ul class="pic-box" v-if="list.length > 0">
                            <li class="pic-item" v-for="(item, i) in list" :key="item.id + i">
                                <img alt="" :src="item.thumb" />
                                <i title="下载壁纸到本地" class="paper-down" @click.stop="downLoad(item.src)"
                                    ><i class="el-icon" style="font-size: 14px"><svg-icon name="download"></svg-icon></i
                                ></i>
                                <div class="image-select">
                                    <button class="image-select-btn flex items-center justify-center" type="button" @click.stop="changClick(item, i)">
                                        <i class="rotating flex items-center justify-center text-[20px]" v-if="isChange && i === curImg"><svg-icon name="loading"></svg-icon></i>

                                        <i class="flex items-center justify-center text-[20px]" v-else><svg-icon name="dui"></svg-icon></i>
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <MoreCom></MoreCom>
                    </div>
                </main>
            </div>
        </section>
    </el-dialog>
</template>

<script lang="ts" setup>
import DialogHeader from "@/components/DialogHeader.vue";
import { useInfiniteScroll, getTestData } from "@/hooks/useInfiniteScroll";
import { useBaseConfigStore } from "@/stores/baseConfig";
const baseConfigStore = useBaseConfigStore();
const { wallpaper } = storeToRefs(baseConfigStore);
const fullscreen = ref(false);
const show = defineModel<boolean>();
const cur = ref(0);
const ulRef = ref<Element>();
const isChange = ref(false);
const timer = ref<NodeJS.Timeout | null>();
const curImg = ref<number>(0);
const tabList = ref<any>([
    {
        name: "动态壁纸",

        component: null,
    },
]);

const innerWidth = computed(() => window?.innerWidth);
const top = computed(() => tabList.value[cur.value].top);
function fullScreen(isFullScreen: boolean) {
    fullscreen.value = isFullScreen;
}

const { MoreCom, rootRef, list, loadMore } = useInfiniteScroll((pageNum, pageSize) => {
    return getTestData({ currentPage: pageNum, pageSize });
}, {});
function downLoad(src: string) {
    window.open(src), "_blank";
}
function changClick(item: any, index: number) {
    isChange.value = true;
    curImg.value = index;
    timer.value = setTimeout(() => {
        wallpaper.value.src = item.src;
        wallpaper.value.thumb = item.thumb;

        isChange.value = false;
        timer.value = null;
    }, 200);
}
watch(
    show,
    () => {
        if (show.value) {
            nextTick(() => {
                Array.from((ulRef.value as Element).children)
                    .filter((item: Element) => item.tagName === "LI")
                    .forEach((item: Element, index: number) => {
                        tabList.value[index].top = (item as any).offsetTop;
                    });
            });
        }
    },
    {
        immediate: true,
    },
);
</script>
<style lang="scss" scoped>
.end {
    margin: 10px 0;

    :deep(.el-divider--horizontal) {
        border-top: 1px solid rgba(var(--alpha-color), 0.1);
        margin: 0;
        position: relative;
        .el-divider__text {
            color: var(--d-sub);
        }
    }
}
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    :deep(.el-button) {
        background: var(--bg-input);
        color: var(--d-main);
        font-size: 14px;
        border-radius: 6px;
        border: none;
        height: 32px;
        padding: 8px 15px;
        white-space: nowrap;
    }
}

.p-body {
    height: 600px;

    .aside {
        .sidebar-box {
            ul {
                position: relative;
                .d-tabs-active {
                    position: absolute;
                    z-index: 0;
                    width: 100%;
                    height: 37px;
                    top: 0;
                    left: 0;
                    color: var(--el-color-primary);
                    background: var(--active-bg, rgba(var(--alpha-color), 0.08));
                    border-radius: var(--bg-radius, 6px);
                    transition:
                        top 0.2s ease 0s,
                        height 0.2s ease 0s;

                    &:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        height: 16px;
                        top: 0;
                        bottom: 0;
                        margin: auto 0;
                        width: 3px;
                        border-radius: 4px;
                        background-color: var(--el-color-primary);
                    }
                }
                li {
                    position: relative;
                    z-index: 1;
                    margin: 8px 0;
                    padding: 7px 16px;
                    cursor: pointer;
                    &.hover:hover span {
                        color: var(--el-color-primary) !important;
                    }
                    span {
                        display: flex;
                        color: rgba(var(--alpha-color), 0.6);
                        align-items: center;
                        font-size: 14px;
                    }
                }
            }
        }
        h2 {
            box-sizing: border-box;
            text-align: left;
            line-height: var(--title-height);
            color: var(--d-main);
            padding-left: 20px;
            font-size: 24px;
            font-weight: 700;
        }
        position: relative;

        width: 14%;
        background: var(--bg-input);
        height: 100%;
        padding: 30px 10px 0;
        width: 160px;
        // max-width: 220px;
    }
    .main {
        flex: 1;
        padding: 10px;
        background-color: var(--bg-card);
        display: flex;
        flex-direction: column;

        .conbox {
            flex: 1;
            overflow-y: auto;
            .pic-box {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                grid-template-rows: 120px;
                grid-auto-flow: dense;
                grid-gap: 15px;
                .pic-item {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    height: 120px;

                    .paper-down {
                        &:hover {
                            background-color: #000c;
                        }
                        --size: 24px;
                        position: absolute;
                        right: 2px;
                        top: 2px;
                        cursor: pointer;
                        border-radius: 50%;
                        font-size: 14px;
                        transition: 0.2s;
                        text-align: center;
                        line-height: var(--size);
                        width: var(--size);
                        height: var(--size);
                        color: #fff;

                        opacity: 0;
                        i {
                            color: #fff;
                        }
                    }
                    &:hover img {
                        transform: scale(1.1);
                    }

                    &:hover .paper-down {
                        opacity: 1;
                    }
                    .image-select {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        transition: 0.2s;
                        .rotating {
                            animation: rotating 2s linear infinite;
                        }

                        @keyframes rotating {
                            to {
                                transform: rotate(360deg);
                            }
                        }
                        .image-select-btn {
                            &:hover {
                                background-color: var(--el-color-primary);
                            }
                            --btn-size: 40px;

                            width: var(--btn-size);
                            display: block;
                            text-align: center;
                            height: var(--btn-size);
                            border-radius: 50%;
                            font-size: 12px;
                            background-color: #0006;
                            border: none;
                            color: #fff;
                            // transition: background 0.2s;
                            cursor: pointer;
                        }
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        transition: 0.2s;
                        cursor: pointer;
                    }
                }
            }
        }
        .tabs {
            width: 80%;
            line-height: 16px;
            cursor: pointer;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 5px;
            font-size: 13px;
            span.active {
                color: var(--el-color-primary);
            }

            .mr10 {
                margin-right: 10px;
            }
        }
    }
}
</style>
<style lang="scss">
.add-pic-container {
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        height: 100%;
    }
    &.el-dialog {
        padding: 0;
        overflow: hidden;
        border-radius: 10px;
    }
}
</style>
