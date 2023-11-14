import {onPullDownRefresh} from "@dcloudio/uni-app";
import useDoQueue from "@/common/hooks/useDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";


const {setFunction, addFunctions, DoFunQueue} = useDoQueue()

const { readyCallback, registerCallbacks ,unReadyCallback} = useCallbackOnDataReady();

// 下拉刷新完成
const funQueue = () => {

    DoFunQueue()

    uni.stopPullDownRefresh();

    registerCallbacks()
    console.log('下拉刷新完成')
}


// 下拉刷新
export default function () {
    onPullDownRefresh(funQueue);
    return {
        pullDownRefreshSetFunctions: setFunction,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        onReload: readyCallback,
    }

}
