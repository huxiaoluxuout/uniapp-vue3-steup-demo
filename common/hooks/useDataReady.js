export default function useDataReady() {
    const dataReadyCallbacks = [];
    let dataIsReady = false;

    const emitCallback = () => {
        dataIsReady = true; // 标记数据已准备好
        for (const callback of dataReadyCallbacks) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    const onEmitCallback = (callback) => {
        if (typeof callback === 'function') {
            if (dataIsReady) {
                // 数据已准备好，立即执行回调
                callback();
            } else {
                // 数据未准备好，将回调添加到数组
                dataReadyCallbacks.push(callback);
            }
        }
    };

    return {
        onEmitCallback,
        emitCallback
    };
}

