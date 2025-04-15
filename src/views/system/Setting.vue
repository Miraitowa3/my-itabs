<template>
    <div class="setting">
        <ElDrawer direction="rtl" v-model="show" :size="450" :show-close="false">
            <template #header>
                <div class="setting-logo absolute overflow-hidden">
                    <img alt="" src="/logo.jpeg" />
                </div>
                <div class="relative ml-[130px] h-[34px]">
                    <h3 class="d-main">{{ title }}</h3>
                    <p class="mt-[5px] text-xs text-[#939393]">{{ tip }}</p>
                </div>
            </template>
            <div class="d-layout flex h-full">
                <aside class="d-layout-aside h-full w-[140px]">
                    <template v-for="(item, index) in list" :key="index">
                        <p :class="['setting-user', index === cur ? 'active' : '']" v-if="index == 0 && !$user.token" @click.stop="changeIndex(index)">
                            <el-button type="primary" size="small" style="height: 24px; border-radius: 6px" @click="showLogin = true" v-if="!$user.token">{{
                                item.name
                            }}</el-button>
                        </p>
                        <p
                            :class="['setting-user flex items-center justify-center', index === cur ? 'active' : '']"
                            v-if="index == 0 && $user.token"
                            @click.stop="changeIndex(index)"
                            style="height: auto"
                        >
                            <img
                                class="h-[30px] w-[30px] object-cover"
                                src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp"
                            />
                            <span class="user-name" style="width: 73px">{{ $user.userInfo.username }}</span>
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
                                    <h1 class="item-title" :style="{ color: index === cur ? 'var(--el-color-primary)' : 'var(--d-main)' }">{{ item.name }}</h1>
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
    <Login v-model:show="showLogin"></Login>
</template>

<script lang="ts" setup>
import Login from "@/views/login/Index.vue";
import userStore from "@/stores/user";
import { asideList } from "./data.ts";
const showLogin = ref(false);
const show = defineModel<boolean>();
const $user = userStore();

const cur = ref(0);
const ulRef = ref<Element>();
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
    .setting-logo {
        left: -13px;
        top: -20px;
        height: 66px;
        width: 66px;
        border-radius: 60%;
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
            height: 25px;
            box-sizing: content-box;
            img {
                border-radius: 6px;
            }
            .user-name {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-left: 5px;
                font-size: 14px;
                color: var(--d-main);
            }
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
                background-color: var(--el-color-primary);
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
                .item-title {
                    color: var(--el-color-primary);
                }
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
