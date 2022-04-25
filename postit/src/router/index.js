import { createRouter, createWebHistory } from "vue-router";
import PostIt from "@/components/PostIt.vue";
import Show from "@/components/Show.vue";


const routes = [
    {
        name: "PostIt",
        path: "/",
        component: PostIt,
    }, {
        name: "ShowPostIt",
        path: "/show/:id",
        component: Show,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
