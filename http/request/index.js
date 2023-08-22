export const baseURL = 'https://xcx.jxgxsmt.com';

const getToken = () => {
    return uni.getStorageSync("token") || '';
};

const buildFullURL = (partialURL) => {
    return baseURL + partialURL;
};

export const request =  (data) => {

    console.log(request.name)

};

export const getAllAreaList =  (data) => {

    request('/api/common/getAllAreaList');
};

getAllAreaList()