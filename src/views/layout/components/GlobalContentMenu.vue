<template>
    <ContentMenu containerRef="#app-main" :hanlderCallback="hanlderCallback" ref="contentMenu">
        <ul class="menu-list">
            <li class="menu-item hover flex justify-between" @click="showAdd = true">
                <span class="menu-item-title text-[12px]">添加图标</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="add" />
                </i>
            </li>
            <li class="menu-item hover flex justify-between">
                <span class="menu-item-title text-[12px]">换壁纸</span>
                <span class="flex">
                    <i class="menu-item-icon wall-icon text-[15px]">
                        <svg-icon name="menu-download" />
                    </i>
                    <i class="menu-item-icon wall-icon text-[15px]">
                        <svg-icon name="sider-xin" />
                    </i>
                </span>
            </li>
            <li class="menu-item hover flex justify-between">
                <span class="menu-item-title text-[12px]">本地搜索</span>
                <span class="menu-item-icon search-icon"> Ctrl+F </span>
            </li>
            <li class="menu-item hover flex justify-between">
                <span class="menu-item-title text-[12px]">立即备份</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-beifen" />
                </i>
            </li>
            <li class="menu-item hover flex justify-between">
                <span class="menu-item-title text-[12px]">设置</span>
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-setting" />
                </i>
            </li>
        </ul>
    </ContentMenu>
    <AddIcon v-model="showAdd" />
</template>

<script lang="ts" setup>
import AddIcon from "./components/AddIcon.vue";
const contentMenu = ref<any>();

const whiteClass = ["app-item-icon", "yiyan-text", "yiyan-from", "se-input", "search-icon"];
const showAdd = ref(false);

function hanlderCallback(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const classes = (target.getAttribute("class") || "").split(" ");

    if (classes.some((cls) => whiteClass.includes(cls))) {
        return false;
    }
    return true;
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
    margin-left: 4px;
    align-items: center;
}
.menu-item-title {
    color: #fff;
}
.menu-item-icon {
    color: #fff;
}
.wall-icon {
    width: 20px;
    height: 20px;
    background: #ffffff1a;
    border-radius: 4px;
    margin-left: 4px;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
}
.search-icon {
    color: rgb(209, 209, 209);
    font-size: 12px;
}
.menu-item.hover:hover {
    background-color: #ffffff1a;
}
.wall-icon:hover {
    background: #fff3;
}
</style>
