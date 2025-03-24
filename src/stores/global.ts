import { defaultNavConfig } from "@/constant/config";
import { useBaseConfigStore } from "./baseConfig";
import { cloneDeep } from "lodash-es";

export const useGlobalStore = defineStore(
    "global",
    () => {
        const isBatchEdit = ref(false);
        const baseConfigStore = useBaseConfigStore();
        const { sidebar } = storeToRefs(baseConfigStore);
        const navConfig = ref(cloneDeep(defaultNavConfig));
        const cur = ref({
            current: navConfig.value[0].id,
            currentTab: 0,
        });

        if (localStorage.getItem("cur")) {
          cur.value = JSON.parse(localStorage.getItem("cur")!);
        }

        function setNavConfig(list: any) {
            navConfig.value = list;
        }
        function setBatchEdit(val:boolean) {
            isBatchEdit.value = val;
        }
        function resetNavConfig(){
            navConfig.value = cloneDeep(defaultNavConfig);
        }
        watch(
            cur,
            () => {
                setBatchEdit(false)
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
        return { navConfig, cur, setNavConfig ,setBatchEdit, isBatchEdit ,resetNavConfig};
    },
    {
        persist:true
    },
);
