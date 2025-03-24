<template>
    <div id="app-search-wrap" class="w-full">
        <div class="app-search-box relative">
            <div class="se-input-box relative flex items-center overflow-hidden">
                <div class="se-select se-search">
                    <img class="search-icon" :src="'https://files.codelife.cc/itab/search/' + useSearch.key + '.svg'" style="width: 20px; height: 20px" />
                    <i class="d-icon select-icon-arrow absolute right-[2px] top-1/2 mt-[-5px] text-[12px]" style="color: rgba(0, 0, 0, 0.2)">
                        <svg-icon name="opt"></svg-icon>
                    </i>
                </div>
                <el-input v-model="searchText" type="text" maxlength="220" placeholder="输入搜索内容" class="se-input" @keyup.enter="search" />

                <div class="se-close flex cursor-pointer">
                    <i class="d-icon text-[30px]" style="color: rgba(0, 0, 0, 0.52)" v-if="searchText" @click.stop="searchText = ''">
                        <svg-icon name="close"></svg-icon>
                    </i>
                </div>
                <button type="button" class="se-select">
                    <i class="d-icon text-[20px]" style="color: rgba(0, 0, 0, 0.52)" @click.stop="search">
                        <svg-icon name="search"></svg-icon>
                    </i>
                </button>
            </div>
            <div class="se-down absolute inset-x-0 z-10">
                <ul class="se-all z-0 flex h-0 w-full origin-top overflow-hidden" :class="{ action: isShow }">
                    <li class="se-item" v-for="(item, index) in searchEngine" :key="item.key" @click.stop="changeEngine(index)">
                        <i class="d-icon se-item-del" @click.stop="deleteEngine(index)">
                            <svg-icon name="close"></svg-icon>
                        </i>
                        <span class="se-item-icon">
                            <img :src="'https://files.codelife.cc/itab/search/' + item.key + '.svg'" class="search-icon" />
                        </span>
                        <p class="d-elip se-item-title">{{ item.title }}</p>
                    </li>
                    <!-- <li class="se-item">
                        <span class="se-item-icon">
                            <i class="d-icon se-item-add">
                                <svg-icon name="add"></svg-icon>
                            </i>
                        </span>
                        <p class="d-elip se-item-title">{{ "添加" }}</p>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBaseConfigStore } from "@/stores/baseConfig";
const BaseConfig = useBaseConfigStore();
const { searchEngine, useSearch, open } = storeToRefs(BaseConfig);
const searchText = ref("");

const isShow = ref(false);

function changeSelect() {
    isShow.value = !isShow.value;
}
let selectEngine = document.querySelector("#selectEngine");
selectEngine?.addEventListener("click", () => {
    console.log("changeSelect");
});
function changeEngine(index: number) {
    BaseConfig.setUseSearch(searchEngine.value[index]);
}
function search() {
    window.open(useSearch.value.href + encodeURIComponent(searchText.value), open.value.searchBlank ? "_blank" : "_self");
}
function deleteEngine(index: number) {
    if (searchEngine.value.length === 1) {
        ElMessage("至少保留一个搜索引擎");
        return;
    }
    if (searchEngine.value[index].title === useSearch.value.title) {
        BaseConfig.setUseSearch(searchEngine.value[0]);
    }
    let list = searchEngine.value.filter((item, i) => i !== index);
    BaseConfig.setSearchEngine(list);
}

function hasParentWithAttribute(element: HTMLElement | null, fn: (element: HTMLElement) => boolean | undefined) {
    // 从当前元素开始向上遍历
    while (element && element !== document.body) {
        if (fn(element)) {
            return true;
        }
        // 移动到父元素
        element = element.parentElement;
    }
    // 如果遍历到body元素仍未找到，返回false
    return false;
}

onMounted(() => {
    window.addEventListener("click", (e) => {
        let isSeSelect = hasParentWithAttribute(e.target as HTMLElement, (element: HTMLElement) => {
            const classes = (element.getAttribute("class") || "").split(" ");

            if (classes.includes("se-search")) {
                return true;
            }
        });
        let seInputBox = hasParentWithAttribute(e.target as HTMLElement, (element: HTMLElement) => {
            const classes = (element.getAttribute("class") || "").split(" ");

            if (classes.includes("se-input-box")) {
                return true;
            }
        });
        if (isSeSelect) {
            changeSelect();
            return;
        }

        if (!seInputBox) {
            isShow.value = false;
        }
    });
});
</script>
<style scoped lang="scss">
.app-search-box {
    max-width: 600px;
    margin: 3vh auto 20px;
    width: 100%;
}
:deep(.el-input) {
    .el-input__wrapper {
        background: Transparent;
        box-shadow: none;
        line-height: 22px;
        .el-input__inner {
            &::placeholder {
                color: var(--alpha-color);
                /* 修改placeholder颜色 */
                font-size: 14px; /* 修改placeholder字体大小 */
            }
        }
    }
}
.se-input-box {
    backdrop-filter: blur(18px);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 3px;
    z-index: 1;
    height: var(--search-height);
    background-color: var(--search-bgColor);
    color: var(--d-main);
    border-radius: var(--search-radius);
    transition: background 0.2s;
}
.se-select {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 50px;
    max-width: 50px;
    transition: 0.2s;
    position: relative;
}
.se-close {
    /* transform: scale(0); */
    transition: transform 0.2s;
}

.app-search-box .se-input-box:hover,
.app-search-box .se-input-box.active {
    background-color: rgba(var(--alpha-bg), 0.7);
}
.app-search-box .se-input-box .se-select:hover {
    background-color: rgba(var(--alpha-bg), 0.4);
}
.se-all {
    transform: scaleY(0);
    transition: 0.2s;
    border-radius: var(--search-radius);
    padding: 0 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(var(--alpha-bg), 0.8);

    box-shadow: 0 0 10px 3px #00000029;
}
.se-item-icon {
    color: rgba(var(--alpha-bg), 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    margin: 0 auto;
    height: 36px;
    width: 36px;
    border-radius: 8px;
    background-color: var(--bg-card);
    box-shadow: 0 0 10px 3px #0000000d;
}
.search-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
}
.d-elip {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.se-item-title {
    font-size: 12px;
    color: var(--d-main);
    line-height: 22px;
    text-align: center;
}
.se-item {
    width: 64px;
    padding: 6px 0;
    display: inline-block;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    border-radius: 8px;
}

.se-all .se-item:hover {
    background-color: var(--search-list-hover);
}
.se-item-del {
    font-size: 12px;
    text-align: center;
    display: none;
    top: -3px;
    right: -3px;
    width: 12px;
    height: 12px;
    position: absolute;
    background: var(--bg-info);
    box-shadow: 0 0 4px 3px #0000000a;
    border-radius: 50%;

    color: rgba(var(--alpha-color), 0.6);
    border: 1px solid rgba(var(--alpha-color), 0.04);
    box-sizing: content-box;
}
.se-all .se-item:hover .se-item-del {
    display: block;
}
.se-item-del:hover {
    background: #e62828;
    color: #fff;
}
.se-item-add {
    font-size: 18px;
    color: var(--el-color-primary);
}
.action {
    margin: 6px 0;
    padding: 10px;
    height: auto;
    transform: scaleY(1);
}
</style>
