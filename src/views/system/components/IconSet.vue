<template>
    <div>
        <div class="setting-panel">
            <el-radio-group v-model="radio2">
                <el-radio label="fang" border
                    ><template #default> <div class="icon-square"></div> </template
                ></el-radio>
                <el-radio label="yuan" border
                    ><template #default> <div class="icon-yuan"></div></template
                ></el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
const { themeConfig } = themeStore;
console.log(themeConfig, 55555555);

const radio2 = ref("yuan");
watch(
    radio2,
    (val) => {
        if (radio2.value === "fang") {
            themeStore.updateTheme({ "--icon-radius": themeConfig["--icon-size"] });
        } else {
        }
    },
    { immediate: true },
);
</script>
<style scoped lang="scss">
.icon-square {
    position: absolute;
    border-radius: 6px;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    background-color: rgb(46, 204, 113);
    transform: translate(-50%, -50%);
}
// background-color: rgba(24, 144, 255, 0.063);
.icon-yuan {
    position: absolute;
    border-radius: 50% 50%;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    background-color: rgb(46, 204, 113);
    transform: translate(-50%, -50%);
}
:deep(.el-radio-group) {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
:deep(.el-radio) {
    width: 60px;
    height: 60px;
    margin: 0px;
    .el-radio__input {
        display: none;
    }
    &.is-checked {
        background-color: rgba(24, 144, 255, 0.063);
    }
}
</style>
