import {onPullDownRefresh} from "@dcloudio/uni-app";
import useDoQueue from "@/common/hooks/useuseDoQueue"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

import useDataReady from "@/common/hooks/useDataReady"

const {onEmitCallback, emitCallback} = useDataReady();

// 下拉刷新完成
const funQueue = () => {

    DoFunQueue()

    uni.stopPullDownRefresh();

    emitCallback()
    console.log('下拉刷新完成')
}


// 下拉刷新
export default function () {
    onPullDownRefresh(funQueue);
    return {
        pullDownRefreshSetFunctions: setFunctions,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        pullDownRefreshReload: onEmitCallback,
    }

}
