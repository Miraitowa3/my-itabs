<template>
    <ContentMenu :containerRef="target" :hanlderCallback="hanlderCallback">
        <ul class="menu-list">
            <li class="menu-item">
                <span class="align-center flex">
                    <i class="menu-item-icon text-[15px]">
                        <svg-icon name="menu-buju" />
                    </i>
                    <span class="menu-item-title text-[12px]">布局</span>
                </span>

                <p class="contextmenu-layout overflow-hidden">
                    <em class="">1x1</em><em class="">1x2</em><em class="">2x1</em><em class="">2x2</em
                    ><em class="active">2x4</em>
                </p>
            </li>

            <li class="menu-item flex">
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">编辑</span>
            </li>
            <li class="menu-item flex">
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">批量编辑</span>
            </li>
            <li class="menu-item flex">
                <i class="menu-item-icon text-[15px]">
                    <svg-icon name="menu-del" />
                </i>
                <span class="menu-item-title text-[12px]">删除</span>
            </li>
        </ul>
    </ContentMenu>
</template>

<script lang="ts" setup>
const props = defineProps<{
    target: string;
}>();

const whiteClass = ["app-item-icon"];
function hanlderCallback(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const classes = (target.getAttribute("class") || "").split(" ");
    if (!classes.some((cls) => whiteClass.includes(cls))) {
        return false;
    }
    return true;
}
</script>
<style scoped>
.menu-item {
    transition: background 0.2s;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    padding: 0 4px;
    cursor: pointer;
    margin: 4px 0;
    border-radius: 6px;
    align-items: center;
}
.menu-item-title {
    color: #fff;
}
.menu-item-icon {
    color: #fff;
    width: 20px;
    vertical-align: -3px;
    font-size: 15px;
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
</style>
