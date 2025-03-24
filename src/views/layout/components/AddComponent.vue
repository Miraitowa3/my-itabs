<template>
    <Dialog
        v-model:show="show"
        width="260px"
        :customStyle="{
            backdropFilter: 'blur(18px)',
            background: ' rgba(var(--img-bg), .8) ',
            boxShadow: '0 12px 24px #0000002e',
            marginLeft: '60px',
            padding: '12px',
            color: 'rgba(var(--img-text), .8)',
        }"
        :overlay="false"
        :closeIcon="false"
    >
        <header class="dialog-header">添加分组</header>
        <ul class="app-icon">
            <li
                v-for="(item, index) in siderIcons"
                :class="[{ active: curIndex === index }]"
                :key="item.icon + index"
                @click.stop="
                    () => {
                        curIndex = index;
                        siderItemName = item.name;
                    }
                "
            >
                <i class="text-[22px]">
                    <svg-icon :name="'sider-' + item.icon"></svg-icon>
                </i>
            </li>
        </ul>
        <h5 class="mb-[5px] mt-[5px] text-sm text-[#fff]">名称</h5>
        <div class="change-name"><el-input size="small" v-model="siderItemName" placeholder="请输入名称" class="add-component-input"></el-input></div>
        <div class="dialog-footer mt-[5px]">
            <el-button type="primary" style="height: 24px; padding: 5px 11px; font-size: 12px" @click.stop="save">保存</el-button>
            <el-button @click="show = false" style="height: 24px; padding: 5px 11px; font-size: 12px">取消</el-button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";
import { siderIcons } from "@/constant/config";
const global = useGlobalStore();
const { navConfig } = storeToRefs(global);

const props = defineProps<{
    info?: any;
    index?: number;
}>();
const show = defineModel();
const curIndex = ref(1);
const siderItemName = ref(siderIcons[curIndex.value].name);
watch(
    () => props.info,
    () => {
        if (props.info) {
            siderItemName.value = props.info.name;
            curIndex.value = siderIcons.findIndex((item) => item.icon === props.info.icon);
        }
    },
    {
        deep: true,
        immediate: true,
    },
);

function save() {
    if (props.info) {
        navConfig.value[props.index as number] = {
            ...props.info,
            name: siderItemName.value,
            icon: siderIcons[curIndex.value].icon,
        };
    } else {
        global.setNavConfig([
            ...navConfig.value,
            {
                name: siderItemName.value,
                icon: siderIcons[curIndex.value].icon,
                children: [
                    {
                        id: "Vpdrvg_2bvxzGiyRKEpOA",
                        url: "itab://add",
                        type: "icon",
                        name: "添加图标",
                        src: "https://files.codelife.cc/icons/add.svg",
                        backgroundColor: "#fff",
                        iconText: "",
                    },
                ],
                id: Math.random().toString(36).substr(2, 9),
            },
        ]);
    }

    show.value = false;
}
</script>
<style lang="scss" scoped>
.dialog-header {
    color: #fff;
    margin-bottom: 12px;
}
.app-icon {
    display: grid;
    color: rgba(var(--img-text), 0.6) !important;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-flow: dense;
    grid-gap: 5px;
}
.app-icon li {
    padding-bottom: 100%;
    border-radius: 5px;
    transition: background 0.2s;
    position: relative;
}
.app-icon li.active {
    background-color: #fff3;
    color: rgba(255, 255, 255, 0.9) !important;
}
.app-icon li i {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent inset;
    background-color: rgba(255, 255, 255, 0.1) !important;

    &.is-focus {
        box-shadow: 0 0 0 1px #fff inset;
    }
}
:deep(.el-input__inner) {
    color: #fff;

    &::placeholder {
        color: #fff;
        font-size: 12px;
    }
}
</style>
