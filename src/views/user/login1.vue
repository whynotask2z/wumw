<template>
    <a-form :model="formState" name="normal_login" class="form_area" @finish="onFinish" @finishFailed="onFinishFailed"
        validateTrigger="blur" ref="formIns">
        <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }, { pattern: /^.{6,10}/, message: 'password must be 6-10' }]">
            <a-input-password v-model:value="formState.password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-row :gutter="16">
            <a-col :span="8"> <a-form-item label="" name="captcha"
                    :rules="[{ required: true, message: 'Please input your captcha!' }]">
                    <a-input-password v-model:value="formState.captcha">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item></a-col>
            <div class="captcha">
                <a-col :span="16">
                    <a-spin size="small" tip="loading..." v-if="imageCode.loading" />
                    <img v-if="imageCode.url" :src="imageCode.url" alt="" @click="captchaImg">
                </a-col>
            </div>


        </a-row>

        <a-form-item>
            <a-button :disabled="disabled" type="primary" :loading="Btnloading" html-type="submit" class="button_area">
                Log in
            </a-button>
            <!-- <div class="text_area"> -->
            Or
            <a href="">register now!</a>
            <!-- </div> -->
        </a-form-item>
    </a-form>
</template>
<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { UserOutlined, LockOutlined, AccountBookTwoTone } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { queryCaptchaImage, userLogin, getUserInfo } from "../../api/index";


// -----------------------------------
// import {useStore} from "vuex"
// const store = useStore();

const formIns = ref(null)
const formState = reactive({
    username: '',
    password: '',
    captcha: "",
    remember: true,
});
const imageCode = reactive({
    url: "",
    uuid: "",
    loading: false
})
const Btnloading = ref(false);

const onFinish = async (values) => {
    Btnloading.value = true

    let { code, token } = await userLogin({ username: values.username, password: values.password, code: values.captcha, uuid: imageCode.uuid });

    // let result = await userLogin(values.username, values.password, values.captcha, imageCode.uuid);

    if (+code !== 200) {
        //登录失败，提示 清空验证码&重新生成验证码
        message.error("error,login again");
        formState.captcha = "";
        captchaImg()
    } else {
        //登录成功：存token && user信息存vuex「登录校验」 && 记住账户密码 && 提示 跳转页面
        localStorage.setItem("TK", token);
        await store.dispatch("setProfileAsync")
        message.success("succeed")
    }
    Btnloading.value = false
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password);
});

//获取验证码
const captchaImg = async () => {
    if (imageCode.loading) return;
    imageCode.loading = true;
    try {
        let { code, img, uuid } = await queryCaptchaImage();
        if (+code == 200) {
            imageCode.uuid = uuid;
            imageCode.url = `data:image/gif;base64,${img}`

        }
    } catch (error) {
        message.error("get code error,try again")
    }
    imageCode.loading = false;
}

//每次进入页面就获取验证码
onBeforeMount(captchaImg)


</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 100px;

}



.form_area {

    padding: 10px;
    /* background-color: aqua; */
    /* border: 1px solid red;
    border-radius: 20px; */
    /* width: 300px; */
    /* margin: 0 auto; */

}

.button_area {
    margin-right: 100px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;

}

.captcha {
    position: relative;

    .ant-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: (-50%, -50%);
    }
}
</style>