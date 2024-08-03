import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes";
import { computed } from "vue"
import { useInfoStore } from "../store/userinfo";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue"


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const safeName = ["user-login", "error"]
router.beforeEach(async (to, from, next) => {
    //登录校验
    //pinia
    const store = useInfoStore();
    if (!safeName.includes(to.name) && !store.profile) {
        if (store.profile === null) {
            console.log(111, "111");
            await store.setProfileAsync();
        };
        if (!store.profile) {
            //确定没有登录，因为pinia派发过还是没有profile
            message.warning("not login,please login");
            console.log(to.path, "想跳未登录的地址");
            //fullpath是处理带参数的情况
            next(`/user/login?to=${encodeURIComponent(to.fullPath)}`)
            return;
        }
    }



    // let profile = store.profile;
    // console.log(profile, "profile");
    // if (!safeName.includes(to.name) && !profile) {
    //     if (profile === null) {
    //         console.log(111, "111");
    //         store.setProfileAsync();
    //         profile = store.profile;
    //     };
    //     if (!profile) {
    //         //确定没有登录，因为pinia派发过还是没有profile
    //         message.warning("not login,please login");
    //         console.log(to.path, "想跳未登录的地址");
    //         //fullpath是处理带参数的情况
    //         next(`/user/login?to=${encodeURIComponent(to.fullPath)}`)
    //         return;
    //     }
    // }

    console.log('Navigating to:', to.path);
    next();
});

export default router
