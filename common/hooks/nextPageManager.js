import {onReachBottom} from "@dcloudio/uni-app";

import {throttle} from "@/utils/tools";

import useDoQueue from "@/common/hooks/useuseDoQueue"
import useDataReady from "@/common/hooks/useDataReady"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

const {dataReady, callData} = useDataReady();

export const nextPageManager = {
    // 当前页码
    page: 1,
    // 每页数量
    pageSize: 10,
    // 列表数据
    dataList: [],

    // 触底加载下一页
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
        console.log('重新加载===', this)
        callData();

        // uni.$emit('reloadHandler')

    },

    watchDataList(newValue, oldValue) {
        if (Array.isArray((newValue))) {
            console.log(oldValue.length, '--->', newValue.length)
            if (oldValue.length < newValue.length) {
                /*
                    TODO
                *       如果此时一共有13条数据，当前page是2，再次触底应该是page=2获取数据（pageSize=10）
                * */
                this.page++
            }
            this.dataList = newValue;

        } else {
            console.error('传入数据只能是数组', newValue)
        }

    },

    // 设置列表数据
    setDataList(newData) {
        this.watchDataList(newData, this.dataList);
    },


    nexPageSetFunctions: setFunctions,
    nexPageAddFunctions: addFunctions,
    nexPageReload: dataReady,


}

