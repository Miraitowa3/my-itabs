import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import * as path from 'path';

import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag === "itab-wallpaper",

                    //上述配置中，通过 @vitejs/plugin - vue 插件的 template.compilerOptions.isCustomElement 选项，告诉 Vite 编译器将 itab - wallpaper 标签视为自定义元素。这样，在 Vue 模板中使用 itab - wallpaper 时就不会引发找不到组件的错误。
                },
            },
            script:{
              defineModel:true
            }
        }),
        vueJsx(),
        // vueDevTools(),
          createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            symbolId: 'icon-[dir]-[name]',
        }),
         AutoImport({
            imports: ['vue', 'vue-router','pinia'] // 自动导入 Pinia 的相关函数],

        }),
        Components({
            dirs: ["src/components"],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
