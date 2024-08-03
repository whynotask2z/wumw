import * as vue from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
export const useBasicHook = () => {
    const route = useRoute();
    const router = useRouter();
    return {
        ...vue,
        route, router, message
    }
}
export default useBasicHook