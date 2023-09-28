import {baseURL} from "@/http/config";

// 封装语音授权判断和引导函数
function checkAndGuideRecordAuth() {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    // 未授权，请求授权或引导用户开启授权
                    uni.authorize({
                        scope: 'scope.record',
                        success() {
                            resolve(true);
                        },
                        fail() {
                            guideUserToEnableRecordAuth()
                                .then((enabled) => {
                                    resolve(enabled);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        },
                    });
                } else {
                    resolve(true);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 引导用户开启语音授权
function guideUserToEnableRecordAuth() {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: '授权提示',
            content: '为了正常使用语音功能，请点击确定前往开启语音授权。',
            success(res) {
                if (res.confirm) {
                    uni.openSetting({
                        success(settingRes) {
                            if (settingRes.authSetting['scope.record']) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        fail() {
                            resolve(false);
                        },
                    });
                } else {
                    resolve(false);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 封装位置授权判断和引导函数
function checkAndGuideLocationAuth() {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    // 未授权，请求授权或引导用户开启授权
                    uni.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            resolve(true);
                        },
                        fail() {
                            guideUserToEnableLocationAuth()
                                .then((enabled) => {
                                    resolve(enabled);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        },
                    });
                } else {
                    resolve(true);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 引导用户开启位置授权
function guideUserToEnableLocationAuth() {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: '授权提示',
            content: '为了获取您的位置信息，请点击确定前往开启位置授权。',
            success(res) {
                if (res.confirm) {
                    uni.openSetting({
                        success(settingRes) {
                            if (settingRes.authSetting['scope.userLocation']) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        fail() {
                            resolve(false);
                        },
                    });
                } else {
                    resolve(false);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// IOS 底部兼容
const getIOSBottomHeight = () => {
    const {model} = uni.getSystemInfoSync()
    const models = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
    if (model.indexOf('iPhone') !== -1 && models.some(item => model.indexOf(item) !== -1)) {
        return 35
    } else {
        return 0
    }
};
// 登录 code
const getLoginCode = () => {
    return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.login({
            provider: 'weixin',
            success: function (res) {
                resolve(res);
            },
            fail: function (fail) {
                reject(fail);
            },
        });
        // #endif

    });
};

//微信支付
const payMoney = function (data) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (success) {
                resolve(success);
            },
            'fail': function (fail) {
                resolve(fail);
            }
        });
    })
}

// 获取当前位置
const getMyLocation = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02',
            isHighAccuracy: 'true',
            geocode: 'true',
            success: (res) => {
                console.log('res', res)
                resolve(res);
            },
            fail: (fail) => {
                console.log(fail)
            }
        })
    });

}

// 打开地图选择位置
const getChooseLocation = () => {
    return new Promise((resolve, reject) => {
        uni.chooseLocation({
            success: (res) => {
                const addressInfo = {

                    province: res.address.slice(0, res.address.indexOf('省') + 1),
                    city: res.address.slice(res.address.indexOf('省') + 1, res.address.indexOf('市') + 1),
                    area: res.address.slice(res.address.indexOf('市') + 1, res.address.indexOf('区') + 1)
                }
                resolve(Object.assign(res, addressInfo));
                console.log('res', res)

            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

//统一提示方便全局修改
const $msg = (title, duration = 1500, mask = true, icon = 'none') => {
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

// 获取页面栈
const getPages = (callback, task = 1) => {
    const pages = getCurrentPages();
    if (pages.length < task + 1) {
        console.error('获取的页面不在栈内')
        return
    }
    const {$vm, options, route: pagePath, onLoad, $page: {fullPath}} = pages[pages.length - 1 - task];
    callback && callback({...$vm, options, pagePath, onLoad, fullPath});

}

// 页面路由跳转 --start

import pagesConfig from "@/pages.json";

const {tabBar: {list: tabBarPages}} = pagesConfig

// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};

const toTargetPage = (pagePath, callback) => {
    // console.log('pagePath', pagePath)
    if (!pagePath) {
        return;
    }
    const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(pagePath));


    if (isTabBarPage) {
        uni.switchTab({
            url: filterPath(pagePath),
            fail: function (fail) {
                $msg(fail.errMsg)
            }
        })
    } else {
        callback && callback()
    }
}


const navigateTo = (pagePath) => {
    toTargetPage(pagePath, () => {

        uni.navigateTo({
            url: filterPath(pagePath),
            fail: function (fail) {
                $msg(fail.errMsg)
                console.error(fail.errMsg);
            }
        })
    })
}

// 事件处理器函数，根据条件执行操作或回调
const handleEvent = ({condition, errorCallback}, actionFunction, ...actionArgs) => {
    // const context = this;
    if (condition) {
        // 执行操作函数
        // actionFunction.apply(context, actionArgs);
        actionFunction(...actionArgs);
    } else {
        // 调用错误回调
        errorCallback();
    }
};

const redirectTo = (pagePath) => {
    toTargetPage(pagePath, () => {
        uni.redirectTo({
            url: filterPath(pagePath),
            fail: function (fail) {
                $msg(fail.errMsg)
            }
        })
    })
}

// 页面路由跳转 --end


const queryString = (params) => {
    return '&' + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

const objectString = (params) => {
    return '?' + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

const stringObject = (options) => {
    const decodedObj = {};
    for (const [key, value] of Object.entries(options)) {
        decodedObj[key] = decodeURIComponent(value);
    }
    return decodedObj;
}


/**
 * 节流
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */
const throttle = (func, delay = 200) => {
    // console.log('throttle')
    let timerId;

    return function () {
        if (!timerId) {
            timerId = setTimeout(() => {
                func.apply(this, arguments);
                timerId = null;
            }, delay);
        }
    };
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */

const debounce = (func, delay = 500, immediate = true) => {
    let timerId;

    return function () {
        const context = this;
        const args = arguments;

        const later = function () {
            timerId = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timerId;

        clearTimeout(timerId);
        timerId = setTimeout(later, delay);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

// 获取缓存数据
const getCacheUserInfo = () => {

    return new Promise(resolve => {
        const userInfo = uni.getStorageSync('MY_USER_INFO') || {}
        resolve(userInfo)
    })

}


// 封装图片上传函数
function uploadImages(filePaths, config = {}) {
    if (!Array.isArray(filePaths)) {
        console.warn('filePaths 必须是数组')
        return
    }
    return new Promise((resolve, reject) => {

        const defaultConfig = {
            url: baseURL + '/api/common/upload',
        };
        config = {...defaultConfig, ...config};

        const uploadPromises = filePaths.map(filePath => {
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    filePath: filePath,
                    name: 'file',
                    ...config,
                    success: res => {
                        resolve(JSON.parse(res.data));
                    },
                    fail: err => {
                        reject(filePath);
                    }
                });
            });
        });

        Promise.all(uploadPromises)
            .then(results => {

                resolve(results);
            })
            .catch(failedFilePaths => {

                const successFiles = filePaths.filter(filePath => !failedFilePaths.includes(filePath));
                reject({
                    code: -1,
                    msg: '部分图片上传失败',
                    data: {
                        success: successFiles,
                        fail: failedFilePaths
                    }
                });
            });
    });
}


const test = () => {

    console.log('test')

}

export {
    throttle,
    debounce,
    getIOSBottomHeight,
    filterPath,
    $msg,
    getLoginCode,
    navigateTo,
    redirectTo,
    objectString,
    stringObject,
    payMoney,
    getMyLocation,
    getChooseLocation,
    checkAndGuideRecordAuth,
    checkAndGuideLocationAuth,
    queryString,
    getPages,
    getCacheUserInfo,
    handleEvent,
    uploadImages,
    test
}

