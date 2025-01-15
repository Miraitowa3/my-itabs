<template>
    <div id="app-search-wrap" class="w-full">
        <div class="app-search-box relative">
            <form action="#" class="se-input-box relative flex items-center overflow-hidden">
                <div class="se-select">
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
                <ul class="se-all action z-0 flex h-0 w-full origin-top overflow-hidden"></ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
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
.se-all {
    --search-radius: 23px;
    transform: scaleY(1);
    transition: 0.2s;
    --alpha-bg: 255, 255, 255;
    margin: 6px 0;
    padding: 10px;
    height: auto;
    border-radius: var(--search-radius);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(var(--alpha-bg), 0.8);
    box-shadow: 0 0 10px 3px #00000029;
}
</style>
