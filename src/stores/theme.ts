import { DefaultIcon } from "@/constant/config";
import { IconType } from "@/typing";
import   {cloneDeep} from 'lodash-es'
export const useThemeStore = defineStore(
    "theme",
    () => {
        const icon = ref<IconType>(cloneDeep(DefaultIcon));

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

        }
        watch(
            icon,
            () => {
                updateIcon();
            },
            {
                deep: true,
            },
        );
        return { icon, setIcon };
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
