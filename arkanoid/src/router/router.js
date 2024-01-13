import GamePage from "@/pages/GamePage";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "Game",
        path: "/Game",
        component: GamePage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
});

// редиректим на страницу с игрой, пока не существует других
router.beforeEach((to, from, next) => {
    if (to.name == undefined) {
        next({ name: 'Game' });
    }
    else {
        next();
    }
});

export default router;