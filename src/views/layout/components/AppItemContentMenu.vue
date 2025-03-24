<template>
    <ContentMenu :containerRef="target" :hanlderCallback="hanlderCallback" ref="contentMenu">
        <ul class="menu-list">
            <li class="menu-item">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-buju" />
                </i>
                布局

                <p class="contextmenu-layout overflow-hidden">
                    <em v-for="(item, index) in layoutList" :key="index" @click="optLayout(item, index)">{{ item }}</em>
                </p>
            </li>

            <li class="menu-item hover" @click.stop="iconEdit">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">编辑</span>
            </li>
            <li class="menu-item hover" @click.stop="handleBatchEdit">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">批量编辑</span>
            </li>
            <li class="menu-item hover" @click.stop="emits('delete', index)">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-del" />
                </i>
                <span class="menu-item-title text-[12px]">删除</span>
            </li>
        </ul>
    </ContentMenu>
    <EditIcon v-model="showEdit" :info="info" :cur="index" />
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";
import EditIcon from "./components/EditIcon.vue";
import { cloneDeep } from "lodash-es";
const contentMenu = ref<any>();
const siderStore = useGlobalStore();
const { navConfig, cur } = storeToRefs(siderStore);

const emits = defineEmits(["delete"]);
const showEdit = ref(false);
const info = ref<any>();
const props = defineProps<{
    target: string;
    list: Array<any>;
}>();

const layoutList = ["1x1", "1x2", "2x1", "2x2", "2x4"];
const whiteClass = ["app-item-icon", "item-icon-text"];

let index = ref(0);
function hasParentWithAttribute(element: HTMLElement | null, fn: (element: HTMLElement) => HTMLElement | undefined) {
    // 从当前元素开始向上遍历
    while (element && element !== document.body) {
        if (fn(element)) {
            return element;
        }
        // 移动到父元素
        element = element.parentElement;
    }
    // 如果遍历到body元素仍未找到，返回false
    return false;
}

function hanlderCallback(e: MouseEvent) {
    siderStore.setBatchEdit(false);
    const target = e.target as HTMLElement;
    const classes = (target.getAttribute("class") || "").split(" ");

    if (!classes.some((cls) => whiteClass.includes(cls))) {
        return false;
    }

    let ele = hasParentWithAttribute(e.target as HTMLElement, (element: HTMLElement) => {
        const classes = (element.getAttribute("class") || "").split(" ");
        if (classes.includes("app-item-icon")) {
            return element;
        }
    });

    let sarr = (ele as HTMLElement).getAttribute("cs")?.split("_") as string[];
    index.value = Number(sarr[sarr.length - 1]);

    return true;
}
function optLayout(item: string, i: number) {
    props.list[index.value].size = item;
}
function handleBatchEdit() {
    siderStore.setBatchEdit(true);
}
function iconEdit() {
    info.value = cloneDeep(navConfig.value[cur.value.currentTab].children[index.value]);
    showEdit.value = true;
}
function closeMenu() {
    contentMenu.value.closeMenu();
}
defineExpose({ closeMenu });
</script>
<style scoped>
.menu-item-title {
    margin-left: 4px;
}
.menu-item {
    transition: background 0.2s;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    padding: 0 4px;
    cursor: pointer;
    margin: 4px 0;
    border-radius: 6px;
}
.search-icon {
    color: rgb(209, 209, 209);
    font-size: 12px;
}
.item-icon {
    width: 20px;
    vertical-align: -3px;
    font-size: 15px;
}
.d-icon {
    --color: inherit;
    height: 1em;
    width: 1em;
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    fill: indexrentColor;
    color: var(--color);
}
.contextmenu-layout em {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    width: 36px;
    background-color: #ffffff1a;
    border-radius: 12px;
    text-align: center;
    margin: 0 2px 4px;
    indexsor: pointer;
    float: left;
    transition: background-color 0.25s;
}
.menu-item.hover:hover {
    background-color: #ffffff1a;
}
.contextmenu-layout em:hover {
    background-color: #fff3;
}
.contextmenu-layout em.active {
    background-color: #ffffff4d;
}
</style>
