/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router';
import Index from "@/components";
import FavoriteFilms from "@/components";
import HelloWorld from "@/components";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [

        {
            path: "/",
            name: "info",
            component: HelloWorld
        }
    ]
})

export default router
