import {needLogin} from "@/common/hooks/useCheckToken";

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
// 获取当前页面路由
const getCurrentPgePath = () => {
    const pages = getCurrentPages();
    console.log('pages', pages)
    return {
        page: pages[pages.length - 1],
        pagePath: pages[pages.length - 1]['route']
    }
}
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
const clickHandler = (slots, emits, pagePath, isNeedLogin) => {

    if (!!Object.keys(slots).length) {
        emits('click')
        return
    }
    isNeedLogin ? needLogin(navigateTo, pagePath) : navigateTo(pagePath)

}


import pagesConfig from "@/pages.json";


const {tabBar: {list: tabBarPages}} = pagesConfig
// 页面路由跳转 --start
// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};
const toPage = (pagePath, callback) => {
    console.log('pagePath', pagePath)
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
    toPage(pagePath, () => {
        uni.navigateTo({
            url: filterPath(pagePath),
            fail: function (fail) {
                $msg(fail.errMsg)
                console.error(fail.errMsg);
            }
        })
    })
}


const redirectTo = (pagePath) => {
    toPage(pagePath, () => {
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


/**
 * 节流
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */
const throttle = (func, delay = 200) => {
    console.log('throttle')
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


// 倒计时
const countDown = (start_time, last_time) => {

    if (last_time < start_time) {
        console.warn('参数不对！！')

        return
    }

// 将时间戳转换为日期对象
    let startDate = new Date(start_time * 1000);
    let endDate = new Date(last_time * 1000);

// 计算时间差（单位为毫秒）
    let diff = endDate - startDate;

// 将时间差转换为天数、小时数、分钟数和秒数
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
// 在个位数前补零
    let formattedDays = days.toString().padStart(2, '0');
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    return {
        days: formattedDays,
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds
    }
}

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

// 置空数
const innitData = (dataList) => {
    // dataList = [];
    dataList.length = 0;
    return dataList.length === 0
}
const setEmptyData = (dataList, callback) => {
    const isDataListEmpty = innitData(dataList);
    if (isDataListEmpty) {
        console.log('dataList 已被清空');
        setTimeout(() => {
            callback && callback()
        }, 100)
    } else {
        console.log('dataList 未被清空');
        innitData(dataList)
    }
}
export {
    throttle,
    debounce,
    getIOSBottomHeight,
    filterPath,
    $msg,
    getCurrentPgePath,
    getLoginCode,
    clickHandler,
    navigateTo,
    redirectTo,
    objectString,
    stringObject,
    payMoney,
    getMyLocation,
    getChooseLocation,
    countDown,
    checkAndGuideRecordAuth,
    checkAndGuideLocationAuth,
    setEmptyData,
    queryString
}

