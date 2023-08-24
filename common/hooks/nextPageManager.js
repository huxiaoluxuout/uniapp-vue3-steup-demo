import {onReachBottom} from "@dcloudio/uni-app";

import {throttle} from "@/utils/tools";

import useDoQueue from "@/common/hooks/useuseDoQueue"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

import useDataReady from "@/common/hooks/useDataReady"

const {dataReady, callData} = useDataReady();

export const nextPageManager = {
    // 当前页码
    page: 1,
    // 每页数量
    pageSize: 10,
    // 数据
    dataList: [],

    // 触底加载下一页数据
    reachBottomHandler() {
        onReachBottom(throttle(() => {
            // 加载下一页数据
            console.log('加载下一页数据')
            DoFunQueue()
        }))
    },
    // 重新加载
    reload() {
        this.page = 1
        this.pageSize = 10
        // this.dataList = [];
        console.log('重新加载===',this)
        callData();

        // uni.$emit('reloadHandler')

    },

    nexPageSetFunctions: setFunctions,
    nexPageAddFunctions: addFunctions,
    nexPageAddDataReady: dataReady,

}
