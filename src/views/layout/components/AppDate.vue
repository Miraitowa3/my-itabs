<template>
    <div class="app-date-box ac" v-if="time.show">
        <div>
            <div class="app-time" @click="toggleTime" :style="{ 'font-family': time.font, color: time.color, fontWeight: time.fontWeight }">
                <time class="hh">{{ time.hour24 !== "true" ? convert24to12(dateInfo?.hour) : dateInfo?.hour }}</time
                ><span class="colon hh">:</span><time class="mm">{{ dateInfo?.minute }} </time><span class="colon" v-if="time.sec === 'true'">:</span
                ><span class="sec" v-if="time.sec === 'true'">{{ dateInfo?.second }}</span>
            </div>
        </div>
        <div class="app-date">
            <span class="time-month" v-if="time.month === 'inline'">{{ dateInfo?.month + "月" + dateInfo?.day + "日" }} </span
            ><span class="time-week" v-if="time.week === 'inline'">{{ dateInfo?.weekday }}</span
            ><span class="time-lunar" v-if="time.lunar === 'inline'">{{ dateInfo?.lunarDate?.lunarMonthName + dateInfo?.lunarDate?.lunarDayName }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBaseConfigStore } from "@/stores/baseConfig";
const BaseConfig = useBaseConfigStore();
const { layout, time } = storeToRefs(BaseConfig);
const dateInfo = ref<any>();
import * as lunarCalendar from "lunar-calendar";
function toggleTime() {
    console.log("toggleTime", layout.value.view);
    if (layout.value.view === "simple") {
        layout.value.view = "widget";
    } else {
        layout.value.view = "simple";
    }
}
function padZero(num: number, length = 2) {
    return num.toString().padStart(length, "0");
}

function formatDateTime() {
    const weekdayMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const now = dayjs();
    const year = now.year();
    const month = padZero(now.month() + 1); // 月份从0开始，需要加1
    const day = padZero(now.date());
    const hour = now.hour();
    const minute = padZero(now.minute());

    const second = padZero(now.second());
    const weekday = weekdayMap[now.day()]; // 星期几，0是星期日

    const lunarDate = lunarCalendar.solarToLunar(year, month, day);
    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
        weekday,
        lunarDate,
    };
}
function convert24to12(hour24: number) {
    // 确定是AM还是PM
    const period = hour24 >= 12 ? "PM" : "AM";

    // 将小时转换为12小时制
    let hour12 = hour24 % 12;
    hour12 = hour12 ? hour12 : 12; // 如果hour12为0，则设置为12

    return padZero(hour12);
}
function updateTime() {
    const time = formatDateTime();
    dateInfo.value = time;

    requestAnimationFrame(updateTime); // 递归调用
}

// 启动时间更新
requestAnimationFrame(updateTime);
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
    /* display: none; */
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
