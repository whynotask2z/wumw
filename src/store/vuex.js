import { createStore, createLogger } from "vuex";
import { getUserInfo } from "../api";

//plugin
const plugins = [];
const env = import.meta.env.MODE;
if (env === "development") plugins.push(createLogger);

const store = createStore({
    plugins,
    state: {
        profile: null
    },
    mutations: {
        setProfile(state, { profile }) {
            state.profile = profile
        }
    },
    actions: {
        async setProfileAsync({ commit }) {
            let profile = null;
            try {
                let { code, permissions, roles, user, } = getUserInfo()
                if (+code == 200) {
                    profile = {
                        permissions,
                        roles,
                        user
                    }
                }
            } catch (error) {
                profile = false;
            }
            commit("setProfile", profile)
            return profile;
        }
    }
})

export default store;