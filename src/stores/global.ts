import { defaultNavConfig } from "@/constant/config";
import { useBaseConfigStore } from "./baseConfig";

export const useSiderStore = defineStore(
    "global",
    () => {
        const baseConfigStore = useBaseConfigStore();
        const { sidebar } = storeToRefs(baseConfigStore);

        const cur = ref({
            current: defaultNavConfig[0].id,
            currentTab: 0,
        });
        if (localStorage.getItem("cur")) {
          cur.value = JSON.parse(localStorage.getItem("cur")!);
        }
        const navConfig = ref(defaultNavConfig);
        function setNavConfig(list: any) {
            navConfig.value = list;
        }
        watch(
            cur,
            () => {
                if (sidebar.value.lastGroup) {
                    localStorage.setItem("cur", JSON.stringify(cur.value));
                } else {
                    if (localStorage.getItem("cur")) {
                        localStorage.removeItem("cur");
                    }
                }
            },
            {
                immediate: true,
                deep: true,
            },
        );
        return { navConfig, cur, setNavConfig };
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
