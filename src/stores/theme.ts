import { defaultTheme } from "@/constant/config";
import { ThemeStyles } from "@/typing"

export const useThemeStore = defineStore(
    "theme",
    () => {
      const themeConfig=ref(defaultTheme)
      watch(themeConfig, (_newVal, oldVal) => {

        for (const key in  themeConfig.value) {
           document.documentElement.style.setProperty(key, themeConfig.value[key as keyof ThemeStyles]);
        }
      },{
        immediate: true
      })
      const updateTheme=(config:Partial<ThemeStyles>)=>{
          themeConfig.value={
            ...themeConfig.value,
            ...config
          }
      }

        return { themeConfig ,updateTheme};
    },
    {
        persist: [
            {
                // storage: localStorage,
                // pick: ["navConfig"],
                // key: "navConfig",
            },
        ],
    },
);

