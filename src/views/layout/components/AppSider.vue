<template>
    <div class="app-sider fixed bottom-0 top-0 z-[2]" v-show="isSiderShow">
        <div class="app-sidebar-body flex h-full w-full flex-col text-center">
            <div class="app-sidebar-avatar flex flex-col items-center justify-center">
                <img
                    class="h-[30px] w-[30px] rounded-full object-cover"
                    src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp"
                />
                <p class="d-elip mt-1" @click="show = !show" v-if="!$user.userInfo">登录</p>
            </div>
            <div class="app-sidebar-group d-scrollbar-hide">
                <VueDraggable v-model="siderList" :animation="150" target=".app-sidebar-ul" @start="onStart" @end="onEnd">
                    <TransitionGroup type="transition" tag="ul" :name="!drag ? 'fade' : undefined" class="app-sidebar-ul">
                        <li
                            class="app-group-item flex cursor-pointer flex-col items-center justify-center"
                            :name="item.id"
                            :style="{ backgroundColor: cur.current === item.id ? '#ffffff26' : '' }"
                            v-for="item in siderList"
                            :key="item.id"
                            @click="changeTab(item)"
                        >
                            <i class="d-icon text-[22px]">
                                <svg-icon :name="'sider-' + item.icon"></svg-icon>
                            </i>

                            <p class="app-group-item-title">{{ item.name }}</p>
                        </li>
                    </TransitionGroup>
                </VueDraggable>
            </div>
        </div>
    </div>

    <Login v-model:show="show"></Login>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { VueDraggable } from "vue-draggable-plus";
import { useSiderStatusStore, useGlobalStore } from "@/stores/global";
import Login from "@/views/login/Index.vue";
const global = useGlobalStore();
const { cur, siderList } = storeToRefs(global);
const drag = ref(false);
const emits = defineEmits(["updateTranslateY"]);
const siderStatus = useSiderStatusStore();
import userStore from "@/stores/user";
const { isSiderShow } = storeToRefs(siderStatus);
const $user = userStore();

const show = ref(false);
function changeTab(item: any) {
    cur.value.current = item.id;
    cur.value.currentTab = getInex(item.id);
}
function onStart() {
    drag.value = true;
}
function getInex(name: string) {
    return siderList.value.findIndex((item) => item.id === name);
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
    --img-bg: 34, 34, 34;
    --sidebar-opacity: 0.4;
    --img-text: 233, 233, 233;
    background-color: rgba(var(--img-bg), var(--sidebar-opacity, 0.4));

    backdrop-filter: blur(6px);
    color: rgba(var(--img-text), 0.6);
    font-size: 12px;
}
.app-sider .app-sidebar-body .app-sidebar-avatar {
    margin-top: 40px;
    margin-bottom: 40px;
    cursor: pointer;
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
    transition: background 300ms;
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
</style>
