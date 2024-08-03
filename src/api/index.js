import http from "./http";

const BASIC_URL = import.meta.env.VITE_BASIC_URL;

//captchaImage
export const queryCaptchaImage = () => {
    return http.get(BASIC_URL + "/captchaImage")
}

//login
export const userLogin = (uesrname, password, code, uuid) => {

    return http.post(BASIC_URL + "/login",

        uesrname,
        password,
        code,
        uuid


    )
}



// export const userLogin = (data) => {
//     return http.post(BASIC_URL + "/login", data)
// }

//userInfo
export const getUserInfo = () => {
    return http.get(BASIC_URL + "/getInfo")
}

export const getForeign = (date, page, limit, port, goods_name, goods_owner) => {
    return request.get('/api/xinda/mckinsey/OreSourceStockList', {
        params: {
            date,
            page,
            limit,
            port,
            goods_name,
            goods_owner
        }
    })
}

//接口
export const queryList = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(["xxxxxxx"])
        }, 2000);
    })
}