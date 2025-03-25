import { DefaultIcon, DefaultLayout, DefaultOpen, DefaultSearch, DefaultSidebar, DefaultTime, DefaultSearchEngine, DefaultTheme, DefaultWallpaper } from "@/constant/config";
import { IconType, LayoutType, OpenType, SearchType, SidebarType, TimeType, SearchEngineItem, ThemeType } from "@/typing";
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
        const searchEngine = ref<SearchEngineItem[]>(cloneDeep(DefaultSearchEngine));
        const useSearch = ref<SearchEngineItem>(cloneDeep(DefaultSearchEngine[0]));
        const theme = ref<ThemeType>(cloneDeep(DefaultTheme));
        const wallpaper = ref<any>(cloneDeep(DefaultWallpaper));

        const updateSidebar = () => {
            document.documentElement.style.setProperty("--sidebar-width", sidebar.value.width + "px");
            document.documentElement.style.setProperty("--sidebar-opacity", sidebar.value.opacity + "");
        };
        const updateSearch = () => {
            document.documentElement.style.setProperty("--search-height", search.value.height + "px");
            document.documentElement.style.setProperty("--search-bgColor", `rgba(255,255,255,${search.value.bgColor})`);
            document.documentElement.style.setProperty("--search-radius", search.value.radius + "px");
        };

        const updateWallpaper = () => {
            document.documentElement.style.setProperty("--wall-mask", wallpaper.value.mask);
            document.documentElement.style.setProperty("--wall-blur", wallpaper.value.blur + "px");



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
        const setUseSearch = (EngineIte: SearchEngineItem) => {
            useSearch.value = EngineIte;
        };
        const setSearchEngine = (EngineIte: SearchEngineItem[]) => {
            searchEngine.value = EngineIte;
        };
        function resetLayout() {
            icon.value = cloneDeep(DefaultIcon);
            sidebar.value = cloneDeep(DefaultSidebar);
            layout.value = cloneDeep(DefaultLayout);
            open.value = cloneDeep(DefaultOpen);
            search.value = cloneDeep(DefaultSearch);
            time.value = cloneDeep(DefaultTime);
            searchEngine.value = cloneDeep(DefaultSearchEngine);
            useSearch.value = cloneDeep(DefaultSearchEngine[0]);
            theme.value = cloneDeep(DefaultTheme);
        }
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
            wallpaper,
            () => {
                updateWallpaper();
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
        watch(
            () => theme.value.mode,
            () => {
                if (theme.value.mode) {
                    document.documentElement.dataset.theme = theme.value.mode;
                }
            },
            {
                deep: true,
                immediate: true,
            },
        );
        watch(
            () => theme.value.color,
            () => {
                if (theme.value.color) {
                    document.documentElement.style.setProperty("--search-bgColor", `rgba(var(--alpha-bg), ${search.value.bgColor})`);

                    document.documentElement.style.setProperty("--el-color-primary", theme.value.color);
                }
            },
            {
                deep: true,
                immediate: true,
            },
        );
        return { icon, sidebar, open, searchEngine, theme, layout, search, time, useSearch, setIcon, setSidebar, wallpaper, setUseSearch, setSearchEngine, resetLayout };
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
