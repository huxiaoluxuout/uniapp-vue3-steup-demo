import {baseURL} from "@/Http/config";


import {TokenManager} from "./TokenManager";


// 请求函数
export const request = async (options) => {
    console.log('options', options);

    options.url = baseURL + options.url;

    await TokenManager.updateToken();
    const token = TokenManager.getToken();

    try {
        const response = await uni.request({
            ...options,
            header: {
                token: token,
            }
        });

        const resData = response.data;

        if (resData.code === 0) {
            return Promise.resolve(resData); // 正常情况，返回已解决的 Promise
        } else if (resData.code === 401) {
            console.log('Token 失效');
            return new Promise((resolve, reject) => {
                // 将因为 Token 失效而中断的请求暂存起来
                TokenManager.requestQueue.push({options, resolve, reject});

                /*const tempInviteId = uni.getStorageSync('inviteId')

                uni.clearStorageSync()

                uni.setStorageSync('inviteId', tempInviteId)*/


                // uni.redirectTo({url: '/pages/login/login'});


                // TokenManager.fetchToken(); // 获取新 Token
            });
        } else {
            console.error(resData.msg);
            return Promise.reject(new Error(resData.msg));
        }
    } catch (error) {
        console.error('请求失败', error);
        return Promise.reject(error);
    }
};
