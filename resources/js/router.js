import Vue from "vue";

import Router from "vue-router";
import store from "./vuex";
import AdminLayout from "./views/admin/layout/index";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/login/index.vue")
        },
        {
            path: "/login/:user_id?",
            name: "login",
            component: () => import("./views/login/index.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/register/index.vue")
        },
        {
            path: "/verify/user/:id",
            name: "verify",
            props: true,
            component: () => import("./views/verify/index.vue")
        },
        {
            path: "/forgot-password",
            name: "forgot",
            component: () => import("./views/forgot/index.vue")
        },
        {
            path: "/reset/:token",
            name: "reset",
            component: () => import("./views/reset/index.vue")
        },
        /**
         * Admin routes
         */
        {
            path: "/admin/companiesList",
            name: "companiesList",
            component: () => import("./views/admin/companiesList.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/admin/edit-company/:id",
            name: "edit-company",
            component: () => import("./views/admin/addCompany.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/admin/add-company",
            name: "addCompany",
            component: () => import("./views/admin/addCompany.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/admin/employeeList",
            name: "employeeList",
            component: () => import("./views/admin/employeeList.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/admin/edit-employee/:id",
            name: "edit-employee",
            component: () => import("./views/admin/addEmployee.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "/admin/add-employee",
            name: "addEmployee",
            component: () => import("./views/admin/addEmployee.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },
        {
            path: "*",
            name: "page-not-found",
            component: () => import("./views/admin/page-not-found.vue"),
            meta: {
                requiresAuth: true,
                layout: AdminLayout
            }
        },

    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.user) {
            next();
            return;
        }
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
