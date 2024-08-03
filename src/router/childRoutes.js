import { h } from "vue";
import { RouterView } from "vue-router";
const routerViewPage = {
    name: "RouterView",
    render: () => {
        return h(RouterView)
    }
}

const iotRoutes = [
    {
        name: 'iot-category',
        path: 'category',
        meta: {
            title: "通用分类",
            icon: "home-outlined",
            hidden: true,
            level: 3,
            id: "iot-category",
            parentId: 'iot'
        },
        component: () => import(/* webpackChunkName:"iot" */"../views/iot/category.vue"),
    },
    {
        name: 'iot-product',
        path: 'product',
        meta: {
            title: "通用产品",
            icon: "home-outlined",
            hidden: true,
            level: 3,
            id: "iot-product",
            parentId: 'iot'
        },
        component: () => import(/* webpackChunkName:"iot" */"../views/iot/product.vue"),
    },
]
const childRoutes = [
    //index
    {
        name: 'index',
        path: '/index',
        component: routerViewPage,
        meta: {
            title: "",
            icon: "",
            hidden: false,
            level: 2,
            id: "index",
            parentId: 'home'
        },
        redirect: "/index/welcome",
        children: [
            {
                path: "/index/welcome",
                name: "index-welcome",
                meta: {
                    title: "首页",
                    icon: "home-outlined",
                    hidden: true,
                    level: 3,
                    id: "index-welcome",
                    parentId: 'index'
                },
                component: () => import(/* webpackChunkName:"index" */"../views/index/welcome.vue"),
            }
        ]
    },
    //iot
    {
        name: 'iot',
        path: '/iot',
        meta: {
            title: "设备管理",
            icon: "",
            hidden: false,
            level: 2,
            id: "iot",
            parentId: 'home'
        },
        component: routerViewPage,
        redirect: "/iot/category",
        children: iotRoutes
    },
];
export default childRoutes;