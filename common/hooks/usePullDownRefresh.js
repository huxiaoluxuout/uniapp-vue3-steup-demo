import {onPullDownRefresh} from "@dcloudio/uni-app";
import useDoQueue from "@/common/hooks/useuseDoQueue"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

import useDataReady from "@/common/hooks/useDataReady"

const {dataReady, callData} = useDataReady();


const funQueue = () => {

    DoFunQueue()

    uni.stopPullDownRefresh();

    callData()

}


// 下拉刷新
export default function () {
    onPullDownRefresh(funQueue);
    return {
        pullDownRefreshSetFunctions: setFunctions,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        pullDownRefreshReload: dataReady,
    }

}
