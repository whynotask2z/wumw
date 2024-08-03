// 用户模块state
import { defineStore } from 'pinia';
import { getUserInfo } from '../api/index';

export const useInfoStore = defineStore({
    id: 'user',
    persist: true,
    state: () => ({
        profile: null //存登录信息 null位置 false未登录 Object 登录
    }),
    getters: {
        getProfile() {
            return this.profile
        }
    },
    actions: {
        async loadUserList() {
            const list = await getUserList()
            this.list = list
        },
        async setProfileAsync() {
            let profile = null;

            try {
                // console.log(6666);
                let { code, permissions, roles, user } = await getUserInfo();
                // console.log(code, "storecode");
                if (+code == 200) {
                    console.log(777);
                    //already login
                    profile = {
                        permissions,
                        roles,
                        user
                    }

                    this.profile = profile
                }
            } catch (error) {
                this.profile = false;
            }
            this.profile = profile;
            // console.log(this.profile, "this.profile");
            // return profile;
        },


    }

})
