/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-19 18:54:24
 * @LastEditors: lyq
 * @LastEditTime: 2025-03-23 01:05:25
 * @FilePath: /mTab/my-itabs/src/stores/baseConfig.ts
 */
import { DefaultIcon, DefaultLayout, DefaultOpen, DefaultSearch, DefaultSidebar,DefaultTime } from "@/constant/config";
import { IconType, LayoutType, OpenType, SearchType, SidebarType ,TimeType} from "@/typing";
import { cloneDeep } from "lodash-es";

export const useBaseConfigStore = defineStore(
    "baseConfig",
    () => {
        const icon = ref<IconType>(cloneDeep(DefaultIcon));
        const sidebar = ref<SidebarType>(cloneDeep(DefaultSidebar));
        const layout = ref<LayoutType>(cloneDeep(DefaultLayout));
        const open = ref<OpenType>(cloneDeep(DefaultOpen));
        const search = ref<SearchType>(cloneDeep(DefaultSearch));
        const time = ref<TimeType>(cloneDeep(DefaultTime));


        const updateSidebar = () => {
            document.documentElement.style.setProperty("--sidebar-width", sidebar.value.width + "px");
            document.documentElement.style.setProperty("--sidebar-opacity", sidebar.value.opacity + "");
        };
        const updateSearch = () => {

            document.documentElement.style.setProperty("--search-height", search.value.height + "px");
            document.documentElement.style.setProperty("--search-bgColor",  `rgba(255,255,255,${search.value.bgColor})`);
            document.documentElement.style.setProperty("--search-radius", search.value.radius + "px");

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
        watch(
            search,
            () => {
                updateSearch();
            },
            {
                deep: true,
                immediate: true,
            },
        );
        return { icon, sidebar, open, setIcon, setSidebar, layout, search , time };
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
