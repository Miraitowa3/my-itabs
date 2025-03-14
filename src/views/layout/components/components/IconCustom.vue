<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-12 18:45:54
 * @LastEditors: lyq
 * @LastEditTime: 2025-03-14 17:13:12
 * @FilePath: /mTab/src/views/layout/components/components/IconCustom.vue
-->
<template>
    <div class="icon-container">
        <div class="app-icon-wrap">
            <el-form ref="ruleFormRef" :model="form" label-position="left" label-width="66px">
                <el-form-item prop="code" label="地址">
                    <el-input v-model="form.url" type="text" placeholder="https://" clearable class="url-input">
                        <!-- <template #append> <el-button class="get-icon-btn" @click="getLogo"> 获取图标</el-button> </template> -->
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="lianjie" /> </i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mc" label="名称">
                    <el-input v-model="form.mc" type="text" placeholder="网站名称" clearable class="url-input">
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="bi" /> </i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mc" label="图标颜色">
                    <div class="d-color flex w-full items-center justify-between">
                        <span
                            :class="['d-color-item', color === 'transparent' ? 'colorTransparent' : '']"
                            :style="{ 'background-color': color }"
                            v-for="(color, index) in colorList"
                            @click.stop="changeColor(index, color)"
                        >
                            <i class="animate__animated animate__bounceIn text-[18px] text-[#fff]" v-show="color === form.curColor"> <svg-icon name="dui" /> </i>
                        </span>
                        <el-color-picker size="small" v-model="form.curColor" />
                    </div>
                </el-form-item>
                <el-form-item prop="tbMc" label="图标文字" v-if="picCur === '文字图标'">
                    <el-input v-model="form.tbMc" type="text" placeholder="请输入图标文字" clearable class="url-input" maxlength="6" @input="changeText">
                        <template #prefix>
                            <i class="text-[14px] text-[#fff]"> <svg-icon name="bi" /> </i>
                        </template>
                    </el-input>
                </el-form-item>

                <div class="mb-[20px] ml-[66px]">
                    <div :class="['icon-preview', picCur === '文字图标' ? 'active' : '']" @click="picCur = '文字图标'">
                        <div class="icon-preview-body">
                            <div class="d-text-icon relative flex h-full w-full items-center whitespace-nowrap text-white" :style="{ background: form.curColor }">
                                <span class="d-text-txt" :style="{ transform: `scale(${textScale}) translateX(-50%) ` }">{{ form.tbMc }}</span>
                            </div>
                        </div>
                        文字图标
                    </div>
                    <!-- <div :class="['icon-preview', picCur === '上传' ? 'active' : '']" @click="picCur = '上传'">
                        <div class="icon-preview-body">
                            <div class="d-text-icon relative flex h-full w-full items-center whitespace-nowrap text-white">
                                <uploadImage class="avatar-uploader" action="###">
                                    <span class="d-text-txt">
                                        <i class="text-[14px] text-[#fff]"> <svg-icon name="add" /> </i>
                                    </span>
                                </uploadImage>
                            </div>
                        </div>
                        上传
                    </div> -->
                </div>

                <el-form-item>
                    <div class="mt-[2px]">
                        <el-button type="primary" style="height: 32px; font-size: 12px" @click.stop="save('保存')">保存</el-button>
                        <el-button style="height: 32px; font-size: 12px" @click="save('保存并继续')">保存并继续</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import UseUploadImage from "@/hooks/UseUploadImage";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();
const { siderList, cur } = storeToRefs(global);
import { extractDomainOrIP, generateCustomRandomString } from "@/utils";
type PicType = "文字图标" | "上传";
const colorList = ref(["#1681FF", "#FBBE23", "#FC4548", "#4B3C36", "#7DAC68", "#023373", "#C8AC70", "#372128", "#C82C34", "#054092", "#A3DDB9", "transparent"]);
const emits = defineEmits(["close"]);
const vailMap = {
    url: "地址能为空！",
    mc: "名称不能为空！",
    tbMc: "图标文字不能为空！",
    curColor: "请选择图标颜色！",
};
const { uploadImage } = UseUploadImage();
const picCur = ref<PicType>("文字图标");
const textScale = ref(0.94);
const form = ref({
    url: "",
    mc: "",
    tbMc: "",
    curColor: colorList.value[0],
});

function changeColor(index: number, color: string) {
    form.value.curColor = color;
}
function changeText() {
    if (form.value.tbMc.length >= 5) {
        textScale.value = 0.58;
    } else {
        textScale.value = 0.94;
    }
}
async function getLogo() {
    // let { data, status } = await axios.get("https://api.vwood.xyz/v1/Favicon/collect/" + extractDomainOrIP(form.value.url));
    // if (status === 200 && data.code === 0) {
    //     console.log(data.data);
    // }
}
function save(type: "保存" | "保存并继续") {
    for (const key in vailMap) {
        if (!form.value[key as keyof typeof vailMap]) {
            ElMessage({
                message: vailMap[key as keyof typeof vailMap],
                type: "error",
            });
            return;
        }
    }

    let list = siderList.value;
    list[cur.value.currentTab].children.push({
        backgroundColor: form.value.curColor,
        iconText: form.value.tbMc,
        id: generateCustomRandomString(11),
        name: form.value.mc,
        src: "",
        type: "text",
        url: form.value.url,
    } as any);

    global.setNavConfig(list);
    ElMessage({
        message: `${form.value.mc} `,
        type: "success",
    });
    if (type === "保存") {
        emits("close");
    } else {
        form.value = {
            url: "",
            mc: "",
            tbMc: "",
            curColor: colorList.value[0],
        };
    }
}
</script>
<style scoped lang="scss">
.avatar-uploader {
    width: 100%;
    height: 100%;

    :deep(.el-upload) {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            display: none;
        }
    }
}
.icon-container {
    overflow: hidden;
    padding: 30px 20px;
    height: 100%;
}
.app-icon-wrap {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.35);
    border-radius: 12px;
}
:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent inset;
    background-color: rgba(0, 0, 0, 0.1);

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
:deep(.el-form-item__label) {
    color: #606266;
    font-size: 14px;
    padding: 0;
}
.url-input {
    width: 420px;
}
:deep(.el-input-group__append) {
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
.get-icon-btn {
    padding: 0 15px;
}

.d-color-item {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid transparent;
    display: flex;
    transition: transform 0.2s;
    justify-content: center;
    align-items: center;
}
.d-color {
    width: 420px;
}
.colorTransparent {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRjkxNDhCNzE2RjExRUNBNzQxOEE4RDQ1NDRENUIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwRjkxNDhDNzE2RjExRUNBNzQxOEE4RDQ1NDRENUIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDBGOTE0ODk3MTZGMTFFQ0E3NDE4QThENDU0NEQ1QjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDBGOTE0OEE3MTZGMTFFQ0E3NDE4QThENDU0NEQ1QjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gMmjFAAAB7klEQVR42sSYzUsCURTFn4MZgotgCsV9n7gpF9U6a2UR9RdEWK1cW5talWt3ffwNCaGLkta5alai1l6SdKdIBtK5cQc01BkbZ96BH8jg3HucGd87d1yapgkTUoAPLIANsA7mQEBVVQ/4wucP8A5ewDMogQboGBV3mzAQADvgCIQHfMcLptjkNh97BdfggQ0O/YViSOFdkONiYTGaVvi8HNfxjmrCD5IgDULCmkJcJ8l1TZkIglsQF+NVnOsGjZ6Jab6EUWGP6HlxgQNQ63cl6J5d2GhAV5T7ePuZ2AIx4Yxi3K/HhAougcchE9TnCszoJoh9sCSc1SLYo/76Sngs5Ij6+sjEPC8sMrRMqyyZiAi52lR4M5KpVYV3Q5n6vR0BySb8bsoDVqvU63Urp0+QifawbdaMAYsmvhWjwOGAqmTiTbKJMpnISzaRVzh+yVSOTJQ5lMoQRf2SwrH8RpIJSnENheeCe1B02ECR+3b0UPMJTkHbIQPU54z79sS7J3DnkAlK3Y/9MmYLnIOMzQYyHHRbg+aOGqedrE0Gsly/ZjT8VMAhSI3ZQIrrVsyOgVWQ4CBasNi8wHUSXHekgbjFM2SEL6H2j4XohM9Pdz8Df+VqNpujvp+goWUNzFIgwjY+CbrfT+T5n2b6/cSPAAMAlElvl00t75IAAAAASUVORK5CYII=")
        no-repeat;
    background-size: cover;
    background-position: center;
}
:deep(.el-color-picker) {
    .el-color-picker__trigger {
        border: none;
        padding: 3px;
    }

    .el-color-picker__color {
        border: none;
        .el-color-picker__color-inner {
            border-radius: 50%;
            background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAoACgDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABwgFCQECAwb/xAAbAQEAAgMBAQAAAAAAAAAAAAAHBQgEBgkCA//aAAwDAQACEAMQAAAAtDxz5W1UCFyvPjBIQ3DFlnlQSIjmYjFNq9UXBpsZ4z082a8AvOs5DAi8eCll17Fx33nreeBxljInF9fGdVbdb7EI+oXh8+aZq4cPoRWE8NMu9OXutT//xAAwEAABBAECAwcDAwUAAAAAAAABAgMEBREABgghMQcJEhMUIkFRYXEVUpGBweHx8v/aAAgBAQABPwDi84td0jcs3su7MbdyDGgrLNnZxTh514ZCm0K6oCTyKhhWQeYHXcz1hcFyZZz3n3lc1uyHCtRJ+SVEnW80+QF5T01a7ptdvThYUlrJiSWiFIfivKbWkjoQpJBB/rruzO9I30e0ur4cuIfdD1xXXb6Ye3r+evxSoks8m2HnOrqHFe0KVlYWtIJKelk7ItZ0iwmKK3ZDynHVk5JUo5Jz9zqTEICs9NdrjIq2HHDyH/P51vLc7YecAc6f4+2ou/JtBfRb+rlKalQJbchhxCiClxCgtJB+CCAdekJGPDr9Jcd9qU9dcbZ3PtXbEM0tJ6lEnzPUP+oSnyMKRj2nJVnOOXTVuL6Y+pctzw5+PCP7aVVKJytXPT9S9DluwpDZDjLim3AfhQOCP5GpTkasYL7vXXEbYK3Mw608vI/b/H4+mtx0CGH3EeXg/wCvvqt2jMv7uJQ1jBclTZTceM2gElTi1BKQAOpJI1xJcOF7HvJnaBsGqXLYlrLs2DHGXG3DzUtKRzWFHmQMkE631NnQluRJsV5hYOFIdQUKBGOoIBGu0F31SVk6vNq2txY+hpayRMfWQlLEZhS1qJwAAACSc/TXdi915v17tHq+IniE2u9UVlM+mXQUM5GJEuSnm286jq0hB9wSrCipKSQEjn//xAAlEQABBAEEAgIDAQAAAAAAAAABAAIDBAUGBxESITETIwhBUWH/2gAIAQIBAT8Ar365sDgrB3YpAAFh3d3BVqTLMBa4cgrcbbalWoOymNZ1LfLmj0R/QP0sdqf7eSVpLVcTpACVo2w27wQqzPiYrELbEJZKOQVDmbUb+wKx2tb9KXsF+Ou7ta+ZIckehbx1/wBUOrqU7eY/IQzrHD2pq89eUsKq13Sv44W30AxkgkHsrTeobIiHY+FWzj+PJW4W21uW669jm8tPsfxUMZLV+t7eCtPM+PhYS49o4Cfk52w9fRX/xAAkEQABBAICAgIDAQAAAAAAAAABAAIDBAURBiESMQcTCBRBUf/aAAgBAwEBPwDleVsgGCt6V1skFol6xXnN2sRDJIRpY+rZdB2Fk+OufETpcl4w9kRc0drBNlEv1riHGZrDA/SxXGCYfSODilGiFc4JXug9Li/42NyeVNqOTQHetLEfHEWFg+jw9JuHhg6a1Voopm7Co48OcuIV46ThsK9joJmecY7Ku1YqbC6Q6C4ZyyrHE2ncd469H+LENhmYJGHYKwsbmHtfuVqtIvlOgPZK+YflrFWaEmKxD/NzunPHoD/Af7tf/9k=)
                no-repeat;
            background-size: cover;
            background-color: transparent !important;
        }
    }
}
.icon-preview {
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 16px;
    border-radius: 16px;
    font-size: 13px;
    color: var(--d-main);
    text-align: center;
    border: 2px solid transparent;
    box-sizing: content-box;
    cursor: pointer;
    .icon-preview-body {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: 7px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        .d-text-icon {
            font-size: 22px;
            .d-text-txt {
                position: absolute;
                left: 50%;
                font-weight: 500;
                line-height: 1;
                transform: translate(-50%);
                transform-origin: 0 center;
            }
        }
    }
}
.icon-preview.active {
    position: relative;
    border-color: #fff;
    box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.2);
    &:before {
        text-align: center;
        content: "✔";
        position: absolute;
        font-weight: 700;
        color: #1890ff;
        right: 0;
        bottom: 0;
        width: 18px;
        height: 18px;
        line-height: 1;
        background: #fff;
        z-index: 1;
        border-radius: 14px 0 15px;
    }
}
.icon-preview:hover {
    border-color: #fff;
    box-shadow: 0 0 12px 3px #0003;
}
</style>
