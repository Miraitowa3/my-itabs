<template>
    <el-dialog v-model="show" width="740px">
        <template #title>
            <div class="title">
                添加搜索引擎
                <p>最少添加1种，最多添加4种</p>
            </div>
        </template>
        <main>
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <div class="serarch-list-item" v-if="item.key !== 'custom'">
                        <el-checkbox v-model="item.checked" size="large" @change="() => changeItem(item)" :disabled="checkNum === 4 && item.checked === false">
                            <div class="ems-center flex">
                                <img :src="'https://files.codelife.cc/itab/search/' + item.key + '.svg'" class="search-icon" />
                                <div style="line-height: 16px" class="flex flex-col">
                                    <span class="text-[13px]">{{ item.title }}</span
                                    ><span class="d-sub d-elip text-xs">{{ item.href }}</span>
                                </div>
                            </div>
                        </el-checkbox>
                    </div>
                </li>
                <li style="display: block" class="custom">
                    <h3 class="custom-title">自定义搜索引擎</h3>
                </li>
                <li style="width: 100%" v-for="(item, index) in list" :key="index">
                    <div class="serarch-list-item bs flex items-center" v-if="item.key === 'custom'">
                        <div class="bs">
                            <el-checkbox
                                v-model="item.checked"
                                size="large"
                                style="width: 100%"
                                :disabled="checkNum === 4 && item.checked === false"
                                @change="() => changeItem(item)"
                            >
                                <div class="ems-center flex">
                                    <img :src="'https://files.codelife.cc/itab/search/' + 'custom' + '.svg'" style="margin-right: calc(var(--spacing) * 2)" />
                                    <el-input size="small" style="--el-input-bg-color: transparent" placeholder="请输入搜索地址，用%s代替关键词，例：https://www.baidu.com/s?wd=%s">
                                    </el-input>
                                </div>
                            </el-checkbox>
                        </div>

                        <el-button type="primary">保存</el-button>
                    </div>
                </li>
            </ul>
        </main>
    </el-dialog>
</template>

<script lang="ts" setup>
import { DefaultSearchEngineList } from "@/constant/config";
import { useBaseConfigStore } from "@/stores/baseConfig";
import { cloneDeep } from "lodash-es";
const BaseConfig = useBaseConfigStore();
const { searchEngine } = storeToRefs(BaseConfig);
const list = ref<any>(cloneDeep(DefaultSearchEngineList));

const checkNum = computed(() => list.value.filter((i: any) => i.checked).length);
function init() {
    let arr = cloneDeep(DefaultSearchEngineList);
    console.log(arr, searchEngine.value);

    arr.forEach((item: any) => {
        if (searchEngine.value.filter((i) => i.title === item.title).length > 0) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
    list.value = arr;
}
const show = defineModel<boolean>();
const checked1 = ref(true);
function changeItem(item: any) {
    let arr = list.value.filter((i: any) => i.checked);
    searchEngine.value = arr;
}
init();
</script>
<style scoped lang="scss">
.title {
    color: var(--d-main);
    p {
        margin-top: 5px;
        font-size: 12px;
        color: var(--d-sub);
    }
}
main {
    height: 500px;
    padding: 0 20px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        transition: 0.2s;
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--bg-hover);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ul {
        width: 100%;

        display: flex;
        flex-wrap: wrap;

        li {
            width: 50%;
            height: auto;
            .bs {
                flex: 1;

                :deep(.el-checkbox__label) {
                    flex: 1;

                    .el-input {
                        flex: 1;
                        margin-right: 7px;
                        .el-input__wrapper {
                            box-shadow: 0 0 0 1px transparent inset;
                            &.is-focus {
                                box-shadow: 0 0 0 1px var(--el-color-primary) inset;
                            }
                            width: 100%;
                        }
                    }
                }
            }
            .serarch-list-item {
                margin: 5px;
                border-radius: 5px;
                line-height: 10px;
                padding: 10px;
                overflow: hidden;
                cursor: pointer;
                img {
                    margin-right: calc(var(--spacing) * 8);
                    width: 28px;
                    height: 28px;
                    background: var(--bg-card);
                    border-radius: 8px;
                    border: 4px solid var(--bg-card);
                }
                background-color: var(--bg-info);
                .d-elip {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .d-sub {
                    color: var(--d-sub);
                }
            }
        }
        .custom {
            .custom-title {
                line-height: 20px;
                font-size: 14px;
                color: var(--d-main);
                margin-top: 10px;
            }
        }
    }
}
</style>
