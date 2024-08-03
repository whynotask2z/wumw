import home from "../components/home.vue"
import login from "../components/login.vue"
import childRoutes from "./childRoutes"

const routes = [
    {
        name: 'user',
        path: '/user',
        component: login,
        redirect: "/user/login",
        meta: {
            title: "",
            icon: "",
            hidden: false,
            level: 1,
            id: "user",
            parentId: null
        },
        children: [
            {
                path: "login",
                name: "user-login",
                meta: {
                    title: "用户登录",
                    icon: "",
                    hidden: false,
                    level: 2,
                    id: "user-login",
                    parentId: null
                },
                component: () => import(/* webpackChunkName:"user" */"../views/user/login.vue")
            }
        ]
    },
    // 一级路由布局容器
    {
        name: 'home',
        path: '/',
        component: home,
        redirect: "/index",
        meta: {
            title: "",
            icon: "",
            hidden: false,
            level: 1,
            id: "home",
            parentId: null
        },
        children: childRoutes
    },
    {
        name: 'error',
        path: '/:pathMatch(.*)*',
        meta: {
            title: "404",
            icon: "",
            hidden: false,
            level: 1,
            id: "error",
            parentId: null
        },
        component: () => import(/* webpackChunkName:"error" */"../views/errorPage.vue")
    }

];
export default routes;