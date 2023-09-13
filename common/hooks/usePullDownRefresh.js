import {onPullDownRefresh} from "@dcloudio/uni-app";
import useDoQueue from "@/common/hooks/useuseDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";


const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

const { registerCallback, triggerCallbacks ,unregisterCallback} = useCallbackOnDataReady();

// 下拉刷新完成
const funQueue = () => {

    DoFunQueue()

    uni.stopPullDownRefresh();

    triggerCallbacks()
    console.log('下拉刷新完成')
}


// 下拉刷新
export default function () {
    onPullDownRefresh(funQueue);
    return {
        pullDownRefreshSetFunctions: setFunctions,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        pullDownRefreshReload: registerCallback,
    }

}
