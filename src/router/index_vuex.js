import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes";
// ------import store from "@store";

import { message } from "ant-design-vue"


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const safeName = ["user-login", "error"]
router.beforeEach(async (to, from, next) => {
    //登录校验
    //vuex
    let profile = store.state.profile;
    if (!safeName.includes(to.name) && !profile) {
        if (store.profile === null) {
            console.log(111, "111");
            profile = await store.dispatch("setProfileAsync");
        };
        if (!profile) {
            //确定没有登录，因为pinia派发过还是没有profile
            message.warning("not login,please login");
            console.log(to.path, "想跳未登录的地址");
            //fullpath是处理带参数的情况,这样写可以做到如果是在之前某页意外跳动登录页登录之后还可以回到当时的页面
            next(`/user/login?to=${encodeURIComponent(to.fullPath)}`)
            return;
        }
    }
    console.log('Navigating to:', to.path);
    next();
});

export default router
