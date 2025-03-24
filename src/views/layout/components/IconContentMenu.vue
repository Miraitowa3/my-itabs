<template>
    <ContentMenu :containerRef="target" :hanlderCallback="hanlderCallback" ref="contentMenu">
        <ul class="menu-list">
            <li class="menu-item hover" @click.stop="iconEdit">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">编辑</span>
            </li>

            <li class="menu-item hover" @click.stop="emits('delete', index)">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-del" />
                </i>
                <span class="menu-item-title text-[12px]">移除</span>
            </li>
        </ul>
    </ContentMenu>
    <AddComponent v-model="showEdit" :info="info" :index="index" />
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";
import AddComponent from "./AddComponent.vue";
import { cloneDeep } from "lodash-es";
const contentMenu = ref<any>();
const siderStore = useGlobalStore();
const { navConfig, cur } = storeToRefs(siderStore);

const emits = defineEmits(["delete"]);
const showEdit = ref(false);
const info = ref<any>();
const props = defineProps<{
    target: string;
    // list: Array<any>;
}>();

let index = ref(0);
function hanlderCallback(e: MouseEvent) {
    const target = e.target as HTMLElement;
    let sarr = [];
    if (target.getAttribute("cs")) {
        sarr = target.getAttribute("cs")?.split("_") as string[];
    } else {
        sarr = target.parentElement?.getAttribute("cs")?.split("_") as string[];
    }
    index.value = Number(sarr[sarr.length - 1]);
    return true;
}

function iconEdit() {
    info.value = cloneDeep(navConfig.value[index.value]);

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
