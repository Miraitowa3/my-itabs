<template>
    <Dialog
        v-model:show="show"
        width="1000px"
        :overlay="false"
        :customStyle="{
            backdropFilter: 'blur(18px)',
            background: 'rgba(200, 200, 200, 0.5)',
            padding: '0px',
            height: '600px',
        }"
        :closeIcon="false"
    >
        <section class="container">
            <aside class="sidebar">
                <div class="sidebar-box">
                    <ul ref="ulRef">
                        <div class="d-tabs-active" :style="{ top: `${top}px` }"></div>
                        <li v-for="(item, index) in list" :key="index" @click.stop="cur = index">
                            <span>
                                <i class="text-[20px]">
                                    <svg-icon :name="item.icon"></svg-icon>
                                </i>
                                {{ item.name }}
                            </span>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <component :is="list[cur].component" @close="show = false"></component>
            </main>
        </section>
    </Dialog>
</template>

<script setup lang="ts">
import IconCustom from "./IconCustom.vue";

const show = defineModel();
const cur = ref(2);
const ulRef = ref<Element>();
const list = ref<any>([
    {
        name: "小组件",
        icon: "edit",
        component: null,
    },
    {
        name: "网址导航",
        icon: "daohang",
        component: null,
    },
    {
        name: "自定义图标",
        icon: "sheji",
        component: markRaw(IconCustom),
    },
]);
const top = computed(() => list.value[cur.value].top);

watch(show, () => {
    if (show.value) {
        nextTick(() => {
            Array.from((ulRef.value as Element).children)
                .filter((item: Element) => item.tagName === "LI")
                .forEach((item: Element, index: number) => {
                    list.value[index].top = (item as any).offsetTop;
                });
        });
    }
});
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    .sidebar {
        width: 160px;
        .sidebar-box {
            padding: 10px;
            margin-top: 60px;
            ul {
                position: relative;
                .d-tabs-active {
                    position: absolute;
                    z-index: 0;
                    width: 100%;
                    height: 37px;
                    top: 0;
                    left: 0;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 6px;
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
                        background-color: #1890ff;
                    }
                }
                li {
                    position: relative;
                    z-index: 1;
                    margin: 8px 0;
                    padding: 8px 18px;
                    span {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        i {
                            color: rgba(0, 0, 0, 0.6);
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
    main {
        flex: 1;
    }
}
</style>
