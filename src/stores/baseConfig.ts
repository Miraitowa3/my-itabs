import { DefaultIcon, DefaultSidebar,DefaultLayout } from "@/constant/config";
import { IconType, SidebarType ,LayoutType} from "@/typing";
import { cloneDeep } from "lodash-es";
import {} from  './global'
export const useBaseConfigStore = defineStore(
    "baseConfig",
    () => {
        const icon = ref<IconType>(cloneDeep(DefaultIcon));
        const sidebar = ref<SidebarType>(cloneDeep(DefaultSidebar));
        const layout = ref<LayoutType>(cloneDeep(DefaultLayout));

        const updateSidebar = () => {
            document.documentElement.style.setProperty("--sidebar-width", sidebar.value.width + "px");
            document.documentElement.style.setProperty("--sidebar-opacity", sidebar.value.opacity+'' );
        };

        const updateIcon = () => {
            document.documentElement.style.setProperty("--icon-nameSize", icon.value.nameSize + "px");
            document.documentElement.style.setProperty("--icon-radius", icon.value.iconRadius + "px");
            document.documentElement.style.setProperty("--icon-name", icon.value.name === 1 ? "block" : "none");
            document.documentElement.style.setProperty("--icon-size", icon.value.iconSize + "px");
            document.documentElement.style.setProperty("--icon-gap-x", icon.value.iconX + "px");
            document.documentElement.style.setProperty("--icon-gap-y", icon.value.iconY + "px");
            document.documentElement.style.setProperty("--icon-opacity", icon.value.opactiy + "");
            document.documentElement.style.setProperty("--icon-nameColor", icon.value.nameColor);
            document.documentElement.style.setProperty("--icon-max-width", icon.value.width + icon.value.unit);
        };
        const setIcon = (newIcon: IconType) => {
            icon.value = newIcon;
        };
        const setSidebar = (newIcon: SidebarType) => {
            sidebar.value = newIcon;
        };
        watch(
            icon,
            () => {
                updateIcon();
            },
            {
                deep: true,
                immediate: true,
            },
        );

        watch(
            sidebar,
            () => {
                updateSidebar();
            },
            {
                deep: true,
                immediate: true,
            },
        );
        return { icon,sidebar, setIcon,setSidebar, layout };
    },
    {
        persist: [
            {
                storage: localStorage,
                key: "baseConfig",
            },
        ],
    },
);
