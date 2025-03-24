<template>
    <div
        class="app-sider fixed bottom-0 top-0 z-[2]"
        v-show="layout.view === 'widget'"
        :class="[sidebar.placement === 'left' ? 'is-left' : 'is-right', sidebar.autoHide ? 'is-autoHide' : '']"
    >
        <div class="app-sidebar-body flex h-full w-full flex-col text-center">
            <div class="app-sidebar-avatar flex flex-col items-center justify-center">
                <img
                    class="h-[30px] w-[30px] rounded-full object-cover"
                    src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp"
                />
                <p class="d-elip mt-1" @click="show = !show" v-if="!$user.userInfo">登录</p>
            </div>
            <div class="app-sidebar-group d-scrollbar-hide">
                <VueDraggable v-model="navConfig" :animation="150" target=".app-sidebar-ul" @start="onStart" @end="onEnd">
                    <IconContentMenu target=".app-sidebar-ul" @delete="(i) => handleDelete(i)" />
                    <TransitionGroup type="transition" tag="ul" :name="!drag ? 'fade' : undefined" class="app-sidebar-ul">
                        <li
                            class="app-group-item flex cursor-pointer flex-col items-center justify-center"
                            :name="item.id"
                            :style="{ backgroundColor: cur.current === item.id ? '#ffffff26' : '' }"
                            v-for="(item, index) in navConfig"
                            :key="item.id"
                            @click="changeTab(item)"
                            :cs="item.id + '_' + index"
                        >
                            <i class="d-icon text-[22px]" :cs="item.id + '_' + index">
                                <svg-icon :name="'sider-' + item.icon" :cs="item.id + '_' + index"></svg-icon>
                            </i>

                            <p class="app-group-item-title" :cs="item.id + '_' + index">{{ item.name }}</p>
                        </li>
                    </TransitionGroup>
                </VueDraggable>
                <!-- 添加分组 -->
                <div class="add-group-item">
                    <i class="d-icon text-[20px]" @click.stop="showAdd = true">
                        <svg-icon name="add"></svg-icon>
                    </i>
                </div>
            </div>
            <div class="sider-bottom">
                <div class="setting">
                    <i class="d-icon text-[20px]" @click.stop="showSetting = true">
                        <svg-icon name="menu-setting"></svg-icon>
                    </i>
                </div>
            </div>
        </div>
    </div>
    <Setting v-model="showSetting"></Setting>
    <Login v-model:show="show"></Login><AddComponent v-model="showAdd" />
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import userStore from "@/stores/user";
import IconContentMenu from "./IconContentMenu.vue";
import { VueDraggable } from "vue-draggable-plus";
import { useGlobalStore } from "@/stores/global";
import Login from "@/views/login/Index.vue";
import AddComponent from "./AddComponent.vue";
import { useBaseConfigStore } from "@/stores/baseConfig";
import Setting from "@/views/system/Setting.vue";
const baseConfigStore = useBaseConfigStore();
const { sidebar, layout } = storeToRefs(baseConfigStore);
const drag = ref(false);
const showSetting = ref(false);
const emits = defineEmits(["updateTranslateY"]);
const siderStatus = useGlobalStore();
const { cur, navConfig } = storeToRefs(siderStatus);
const $user = userStore();
const showAdd = ref(false);
const show = ref(false);
function changeTab(item: any) {
    cur.value.current = item.id;
    cur.value.currentTab = getInex(item.id);
}
function onStart() {
    drag.value = true;
}
function getInex(name: string) {
    return navConfig.value.findIndex((item) => item.id === name);
}
function handleDelete(index: number) {
    if (navConfig.value.length === 1) {
        ElMessage("至少预留一个分组");
        return;
    }
    navConfig.value.splice(index, 1);
    let i = Math.min(cur.value.currentTab, navConfig.value.length - 1);
    cur.value = {
        current: navConfig.value[i].id,
        currentTab: i,
    };
}
function onEnd(e: any) {
    nextTick(() => {
        //等待dom更新后，再能获取最新index
        if (e.clonedData.id === cur.value.current) {
            cur.value.currentTab = e.newIndex;
        } else {
            cur.value.currentTab = getInex(cur.value.current);
        }

        drag.value = false;
    });
}
</script>
<style scoped lang="scss">
.app-sider {
    width: var(--sidebar-width);
    animation: fadeIn 0.2s;
    &:hover {
        .app-sidebar-body {
            transform: translateX(0) !important;
        }
    }
    &.is-left {
        left: 0;
        &.is-autoHide {
            .app-sidebar-body {
                transform: translateX(-100%);
            }
        }
    }
    &.is-right {
        right: 0;
        &.is-autoHide {
            .app-sidebar-body {
                transform: translateX(100%);
            }
        }
    }

    & > .app-sidebar-body {
        --img-bg: 34, 34, 34;
        --img-text: 233, 233, 233;
        background-color: rgba(var(--img-bg), var(--sidebar-opacity, 0.4));
        transition: transform 0.2s;
        backdrop-filter: blur(6px);
        color: rgba(var(--img-text), 0.6);
        font-size: 12px;
        .app-sidebar-avatar {
            margin-top: 40px;
            margin-bottom: 40px;
            cursor: pointer;
        }
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.d-elip {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

.app-group-item {
    margin: 4px 0;
    height: 50px;
    transition: background 100ms;
}

.app-group-item .d-icon {
    transition: transform 0.2s;
}
.app-group-item-title {
    width: 100%;
    margin-top: -2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.app-sidebar-group .app-group-item:hover .d-icon {
    transform: scale(1.2);
}
.add-group-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
    height: 50px;
    transition: background 0.3s;
    pointer-events: cursor;
}
.setting i:hover {
    animation: rotate ease-in-out 0.4s;
}
.sider-bottom {
    margin-top: 10px;
    .setting {
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@keyframes rotate {
    0% {
        transform: rotate(120deg);
    }
}
</style>
