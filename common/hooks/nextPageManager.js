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
    isNotFullPage: false,

    notFullLen: 0,


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

    updateDataList(newResDataList, oldDataList) {

        if (!Array.isArray(newResDataList)) {
            throw new Error('传入数据只能是数组');
        }

        const isFullPage = newResDataList.length % this.pageSize === 0;

        if (isFullPage) {

            this.page++;
            this.notFullLen = 0;
            this.dataList = [...oldDataList, ...newResDataList];
        } else {
            if (!this.notFullLen) {
                // 如果不是满页数据且上一页数据已显示完整，则更新数据列表并更新未显示数据的长度
                this.dataList = [...oldDataList, ...newResDataList];
                this.notFullLen = newResDataList.length;
            } else {
                // console.error('已经到底了,尝试刷新吧')
                throw new Error('传入数据只能是数组');
            }
        }
    },
    // 设置列表数据
    setDataList(newResData) {
        this.updateDataList(newResData, this.dataList);
    },


    nexPageSetFunctions: setFunctions,
    nexPageAddFunctions: addFunctions,
    nexPageReload: dataReady,


}

