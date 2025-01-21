import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/layout/Index.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        // {
        //     path: "/login",
        //     name: "login",
        //     component: () => import("@/views/login/Index.vue"),
        // },
    ],
});

export default router;
