import { navConfig } from "@/constant/config";

export const useSiderStatusStore = defineStore("siderStatus", () => {
    //侧边栏显示与隐藏
    const isSiderShow = ref(true);
    function changeSiderShow(status: boolean) {
        isSiderShow.value = status;
    }

    return { isSiderShow, changeSiderShow };
});
export const useGlobalStore = defineStore("global", () => {
    //侧边栏显示与隐藏
    const cur = ref({
        current: navConfig[0].id,
        currentTab: 0,
    });
    const siderList = ref(navConfig);
    return { siderList,cur };
});
