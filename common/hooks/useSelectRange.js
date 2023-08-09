import {onMounted, ref, watch} from "vue";
import {getBrandList, getCategoryList, getTypeList} from "@/http/apis/common";
import {setEmptyData} from "@/utils/tools";

/**
 * 分类-品牌-型号
 * @param formData
 * @returns {{typeRange: *[], cateRange: *[], brandRange: *[]}}
 */

export default function useSelectRange(formData) {
    const dataReadyCallback = ref(null); // 使用 ref 创建一个可响应的数据准备就绪回调函数

    const cateRange = [];

    onMounted(() => {
        // getData();
        getCategoryListHandle();
    })
    const getCategoryListHandle = () => {
        getCategoryList().then(res => {
            const range = res.data.map(item => {
                return {
                    value: item.id,
                    text: item.cate_name,
                    ...item
                }
            })
            cateRange.push(...range)
            console.log('获取到数据。。。。',cateRange);

            dataReadyCallback.value && dataReadyCallback.value(); // 调用数据准备就绪回调函数


        })
    }


    const dataReady = (callback) => {
        if (typeof callback === 'function') {
            dataReadyCallback.value = callback; // 将回调函数赋值给可响应的数据准备就绪回调函数
        }
    };
    const brandRange = [];
    watch(() => formData.cateId, (newVal,oldVal) => {
        console.log('=======cateId', {newVal,oldVal})
        if (newVal === '') {
            formData.cateId = ''
            formData.brandId = ''
            setEmptyData(brandRange)
            return
        }
        if(oldVal){

            formData.brandId = ''
            setEmptyData(brandRange)
        }
        getBrandList({cate_id: newVal}).then(res => {
            console.log('getBrandList',res)
            const range = res.data.map(item => {
                return {
                    value: item.id,
                    text: item.brand_name,
                    ...item
                }
            })
            brandRange.push(...range)

        })
    });

    const typeRange = [];
    watch(() => formData.brandId, (newVal,oldVal) => {
        console.log('brandId', {newVal})
        if (newVal === '') {
            formData.typeId = ''
            setEmptyData(typeRange)

            return
        }

        getTypeList({brand_id: newVal}).then(res => {
            const range = res.data.map(item => {
                return {
                    value: item.id,
                    text: item.type_name,
                    ...item
                }
            })
            typeRange.push(...range)
        })
    });

    return {
        cateRange,
        brandRange,
        typeRange,
        dataReady
    }
}
