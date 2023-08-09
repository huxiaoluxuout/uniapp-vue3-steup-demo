import {getCurrentPgePath, getLoginCode} from "@/utils/tools";



const checkToken = async (callback) => {
    // 1. 是否有token产生
    // 2. 是否过期
    // 3. 账号是否被手动删除
    const token = uni.getStorageSync("token") || '';
    const time = uni.getStorageSync('time') || '';

    if (!token) {
        // 1.新用户 3.账号被手动删除
        console.log('token不存在。。。。。')
        await getToken()

    } else {
        // 到达过期时间 24小时
        if (Date.now() - time > 1000 * 60 * 60 * 24) {
            // if (Date.now() - time > 1000 * 60) {
            console.log('token到达过期时间')
            await getToken()

        } else {
            callback && callback()
            console.log('token正常执行');
        }
    }
}
const getToken = async () => {
    uni.clearStorageSync();
    const {pgePath} = getCurrentPgePath()
    const codeRes = await getLoginCode()

}

let funcList = []

const setToken = (resData) => {
    uni.setStorageSync('MY_USER_INFO', resData)
    uni.setStorageSync('token', resData.token)
    uni.setStorageSync('time', Date.now());
    uni.$emit('updateUserInfo', resData)



    funcList.length && agreePass()
}


// 需要登录
/**
 *
 * @param func
 * @param args
 * @returns {Promise<void>}
 */
const needLogin = async (func, ...args) => {
    funcList = [{func, args}]
    // funcList.push({func, args});
    await checkToken(() => {
        agreePass()
    })
};
const agreePass = () => {

    funcList.reduce((result, {func, args}) => {
        return func(...args, result);
    }, true);
}
export {checkToken, needLogin, setToken}
