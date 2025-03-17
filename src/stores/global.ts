import { defaultNavConfig } from "@/constant/config";


export const useSiderStore = defineStore(
    "aSider",
    () => {
        //侧边栏显示与隐藏
        const isSiderShow = ref(true);
        function changeSiderShow(status: boolean) {
            isSiderShow.value = status;
        }
        const cur = ref({
            current: defaultNavConfig[0].id,
            currentTab: 0,
        });

        const navConfig = ref(defaultNavConfig);
        function setNavConfig(list: any) {
            navConfig.value = list;
        }
        return { navConfig, cur, setNavConfig, isSiderShow, changeSiderShow };
    },
    {
        persist: [
            {
                storage: localStorage,
                pick: ["navConfig"],
                key: "navConfig",
            },
        ],
    },
);

