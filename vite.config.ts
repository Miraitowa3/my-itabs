import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import * as path from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { analyzer } from "vite-bundle-analyzer";
import vueDevTools from "vite-plugin-vue-devtools";
import dayjs from "dayjs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        // analyzer(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag === "itab-wallpaper",

                    //上述配置中，通过 @vitejs/plugin - vue 插件的 template.compilerOptions.isCustomElement 选项，告诉 Vite 编译器将 itab - wallpaper 标签视为自定义元素。这样，在 Vue 模板中使用 itab - wallpaper 时就不会引发找不到组件的错误。
                },
            },
            script: {
                defineModel: true,
            },
        }),
        vueJsx(),
        // vueDevTools(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
            symbolId: "icon-[dir]-[name]",
        }),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "pinia",
                {
                    "element-plus": ["dayjs"],
                },
            ], // 自动导入 Pinia 的相关函数],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            extensions: ["vue", "tsx", "jsx"],
            dirs: ["src/components"],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        // allowedHosts: ["j39kq1ocub.by.takin.cc"], // 允许的主机名
        proxy: {
            "^/api": {
                // target: "http://j39kq1ocub.by.takin.cc", // hadron
                target: "http://localhost:3000", // hadron

                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                // 手动指定分割策略
                manualChunks:{
                    pinia: ['pinia'],
                    axios: ['axios'],
                    'lodash-es': ['lodash-es'],
                    'vue': ['vue'],
                    'vue-draggable-plus': ['vue-draggable-plus'],
                    'element-plus': ['element-plus'],





                },
            },
        },
    },
});
// "lunar-calendar": "^0.1.4",
