<template>
    <div class="app-date-box ac">
        <div>
            <div class="app-time" @click="toggleTime">
                <time class="hh">20</time><span class="colon hh">:</span><time class="mm">44</time><span class="colon" style="display: none">:</span><span class="sec">34</span>
            </div>
        </div>
        <div class="app-date"><span class="time-month">01月13日</span><span class="time-week">星期一</span><span class="time-lunar">腊月十四</span></div>
    </div>
</template>

<script lang="ts" setup>
import { useSiderStore } from "@/stores/global";
const siderStatus = useSiderStore();
const { isSiderShow } = storeToRefs(siderStatus);
function toggleTime() {
    siderStatus.changeSiderShow(!isSiderShow.value);
}
</script>
<style scoped>
.app-date-box {
    text-align: center;
}
.app-time {
    font-size: 70px;
    font-family: HarmonyOS_Sans;
    user-select: none;
    font-weight: var(400);
    text-shadow: 0 2px 6px rgb(0 0 0 / 16%);
    display: inline-block;
    line-height: 70px;
    transition: font 0.2s;
    color: #fff;
}
.app-time.fontFamily-align .colon {
    vertical-align: unset !important;
}
.app-time .colon {
    vertical-align: calc(70px / 12);
}
.app-time .sec {
    display: none;
}
/* date 样式 */
:host {
    user-select: none;
    text-align: center;
    -webkit-user-select: none;
    color: #fff;
}
.app-date-box {
    font-family: auto;
}
.app-date {
    font-size: 14px;
    line-height: 26px;
    opacity: 0.88;
    margin-top: -3px;
    text-shadow: 0 2px 4px rgb(0 0 0 / 16%);
}

.app-date span {
    margin: 0 2px;
}

.app-date .time-month {
    color: #fff;

    display: inline;
}

.app-date .time-week {
    color: #fff;

    display: inline;
}

.app-date .time-lunar {
    color: #fff;

    display: inline;
}
</style>
