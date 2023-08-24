import { ref } from 'vue';

export default function useDataReady() {
    const dataReadyCallbacks = ref([]);
    const dataIsReady = ref(false); // 新增一个标志，表示数据是否已准备好

    const callData = () => {
        console.log('callData...');
        dataIsReady.value = true; // 标记数据已准备好
        dataReadyCallbacks.value.forEach(callback => {
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    const dataReady = (callback) => {
        if (dataIsReady.value) {
            // 数据已准备好，立即执行回调
            callback();
        } else if (typeof callback === 'function') {
            // 数据未准备好，将回调添加到数组
            dataReadyCallbacks.value.push(callback);
        }
    };

    return {
        dataReady,
        callData
    };
}

