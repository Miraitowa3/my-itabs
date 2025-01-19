<template>
    <ContentMenu :containerRef="target" :hanlderCallback="hanlderCallback">
        <ul class="menu-list">
            <li class="menu-item">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-buju" />
                </i>
                布局

                <p class="contextmenu-layout overflow-hidden">
                    <em class="">1x1</em><em class="">1x2</em><em class="">2x1</em><em class="">2x2</em
                    ><em class="active">2x4</em>
                </p>
            </li>

            <li class="menu-item hover">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">编辑</span>
            </li>
            <li class="menu-item hover">
                <i class="item-icon d-icon">
                    <svg-icon name="menu-edit" />
                </i>
                <span class="menu-item-title text-[12px]">批量编辑</span>
            </li>
            <li class="menu-item hover">
                <i class="item-icon d-icon">
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
    fill: currentColor;
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
    cursor: pointer;
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
