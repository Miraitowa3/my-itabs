<template>
    <div class="setting">
        <ElDrawer direction="rtl" v-model="show" :size="450" :show-close="false">
            <template #header>
                <div class="ml-[130px] h-[34px]">
                    <h3 class="d-main">{{ title }}</h3>
                    <p class="mt-[5px] text-xs text-[#939393]">{{ tip }}</p>
                </div>
            </template>
            <div class="d-layout flex h-full">
                <aside class="d-layout-aside h-full w-[140px]">
                    <template v-for="(item, index) in list" :key="index">
                        <p :class="['setting-user', index === cur ? 'active' : '']" v-if="index == 0">
                            <el-button type="primary" size="small" style="height: 24px; border-radius: 6px" @click.stop="changeIndex(index)">{{ item.name }}</el-button>
                        </p>
                    </template>

                    <p class="bb"></p>

                    <div class="sidebar-box">
                        <ul ref="ulRef">
                            <div class="d-tabs-active" :style="{ top: `${top}px` }" v-if="cur !== 0"></div>
                            <template v-for="(item, index) in list" :key="index">
                                <li @click.stop="changeIndex(index)" v-if="index !== 0">
                                    <span class="item-icon">
                                        <img :src="item.icon" alt="" class="h-full w-full" />
                                    </span>
                                    <h1 class="item-title">{{ item.name }}</h1>
                                </li>
                            </template>
                        </ul>
                    </div>
                </aside>
                <main class="d-layout-main flex-1">
                    <component :is="curComponent"></component>
                </main>
            </div>
        </ElDrawer>
    </div>
</template>

<script lang="ts" setup>
const show = defineModel();
const cur = ref(3);
const ulRef = ref<Element>();
import { asideList } from "./data.ts";
const list = ref(asideList);
const top = computed(() => list.value[cur.value].top);
function changeIndex(index: number) {
    cur.value = index;
}
const curComponent = computed(() => list.value[cur.value].component);
const title = computed(() => (cur.value === 0 ? list.value[cur.value].tip : list.value[cur.value].name));
const tip = computed(() => (cur.value === 0 ? "" : list.value[cur.value].tip));

watch(
    show,
    () => {
        if (show.value) {
            nextTick(() => {
                Array.from((ulRef.value as Element).children)
                    .filter((item: Element) => item.tagName === "LI")
                    .forEach((item: Element, index: number) => {
                        list.value[index + 1].top = (item as any).offsetTop;
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
.setting {
    :deep(.el-drawer__header) {
        position: relative;
        margin-bottom: 0px;
        overflow: hidden;
        padding: 26px;
    }
    :deep(.el-drawer__body) {
        padding: 0px;
    }
    .d-layout-aside {
        .setting-user {
            position: relative;
            margin: 0 8px 10px;
            padding: 8px;
            border-radius: 6px;
            height: 24px;
            box-sizing: content-box;
        }
        .active {
            background: rgba(24, 144, 255, 0.1);
            &:hover {
                background-color: rgba(0, 0, 0, 0.04);
                border-radius: 6px;
            }
            &::before {
                content: "";
                position: absolute;
                left: 0;
                height: 16px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                width: 3px;
                border-radius: 4px;
                background-color: #1890ff;
            }
        }
    }
    .d-layout-main {
        background-color: var(--bg-body);
        border-radius: 6px;
        padding: 10px 20px 10px 10px;
        height: 100%;
        overflow: auto;
    }
}
.sidebar-box {
    padding: 0 10px;
    ul {
        position: relative;
        .d-tabs-active {
            position: absolute;
            z-index: 0;
            width: 100%;
            height: 40px;
            top: 0;
            left: 0;
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
            padding: 8px 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
                background-color: rgba(0, 0, 0, 0.04);
                border-radius: 6px;
            }
            .item-title {
                font-size: 13px;
                color: var(--d-main);
                margin-left: 4px;
            }
            .item-icon {
                border-radius: 6px;
                background-color: #313131;
                width: 24px;
                height: 24px;
            }
            // span {
            //     display: flex;
            //     align-items: center;
            //     font-size: 14px;
            //     i {
            //         color: rgba(0, 0, 0, 0.6);
            //         margin-right: 5px;
            //     }
            // }
        }
    }
}
</style>
