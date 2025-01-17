<template>
    <div id="app-search-wrap" class="w-full">
        <div class="app-search-box relative">
            <form action="#" class="se-input-box relative flex items-center overflow-hidden">
                <div class="se-select" @click="changeSelect">
                    <img
                        class="search-icon"
                        src="https://files.codelife.cc/itab/search/google.svg"
                        style="width: 20px; height: 20px"
                    />
                    <i
                        class="d-icon select-icon-arrow absolute right-[2px] top-1/2 mt-[-5px] text-[12px]"
                        style="color: rgba(0, 0, 0, 0.2)"
                    >
                        <svg-icon name="opt"></svg-icon>
                    </i>
                </div>
                <input
                    id="searchInput"
                    autocomplete="off"
                    class="se-input h-ful w-full bg-transparent text-[14px] leading-[22px]"
                    maxlength="220"
                    placeholder="输入搜索内容"
                    type="text"
                />
                <div class="se-close flex cursor-pointer">
                    <i class="d-icon text-[30px]" style="color: rgba(0, 0, 0, 0.52)">
                        <svg-icon name="close"></svg-icon>
                    </i>
                </div>
                <button type="button" class="se-select">
                    <i class="d-icon text-[20px]" style="color: rgba(0, 0, 0, 0.52)">
                        <svg-icon name="search"></svg-icon>
                    </i>
                </button>
            </form>
            <div class="se-down absolute inset-x-0 z-10">
                <ul class="se-all z-0 flex h-0 w-full origin-top overflow-hidden" :class="{ action: isShow }">
                    <li class="se-item" v-for="item in list" :key="item.name">
                        <i class="d-icon se-item-del">
                            <svg-icon name="close"></svg-icon>
                        </i>
                        <span class="se-item-icon">
                            <img :src="item.src" class="search-icon" />
                        </span>
                        <p class="d-elip se-item-title">{{ item.name }}</p>
                    </li>
                    <li class="se-item">
                        <span class="se-item-icon">
                            <i class="d-icon se-item-add">
                                <svg-icon name="add"></svg-icon>
                            </i>
                        </span>
                        <p class="d-elip se-item-title">{{ "添加" }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const isShow = ref(false);
const list = ref([
    { name: "百度", src: "https://files.codelife.cc/itab/search/baidu.svg" },
    { name: "Google", src: "https://files.codelife.cc/itab/search/google.svg" },
    { name: "必应", src: "https://files.codelife.cc/itab/search/bing.svg" },
    { name: "秘塔AI", src: "https://files.codelife.cc/itab/search/metaso.svg" },
]);
function changeSelect() {
    isShow.value = !isShow.value;
}
</script>
<style scoped>
.app-search-box {
    max-width: 600px;
    margin: 3vh auto 20px;
    width: 100%;
}
.se-input-box {
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    box-shadow: 0 0 10px 3px #0000001a;
    z-index: 1;
    border-radius: 23px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: background 0.2s;
    color: #222;
}
.se-select {
    background-color: initial;
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
.se-input {
    line-height: 1.25rem;
}
.se-input::placeholder {
    color: rgba(0, 0, 0, 0.56);
    /* 修改placeholder颜色 */
    font-size: 14px; /* 修改placeholder字体大小 */
}
.app-search-box .se-input-box:hover,
.app-search-box .se-input-box.active {
    --alpha-bg: 255, 255, 255;

    background-color: rgba(var(--alpha-bg), 0.7);
}
.app-search-box .se-input-box .se-select:hover {
    background-color: rgba(255, 255, 255, 0.4);
}
.se-all {
    --search-radius: 23px;
    transform: scaleY(0);
    transition: 0.2s;
    border-radius: var(--search-radius);
    padding: 0 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px 3px #00000029;
}
.se-item-icon {
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    margin: 0 auto;
    height: 36px;
    width: 36px;
    border-radius: 8px;
    background-color: #fff;
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
    color: #222;
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
    background-color: rgba(255, 255, 255, 0.7);
}
.se-item-del {
    --bg-info: #f5f5f5;
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
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.04);
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
    color: #1890ff;
}
.action {
    margin: 6px 0;
    padding: 10px;
    height: auto;
    transform: scaleY(1);
}
</style>
