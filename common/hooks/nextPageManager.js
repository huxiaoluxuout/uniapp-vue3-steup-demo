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

    updateDataList(newResData, oldValue) {
        if (!Array.isArray(newResData)) {
            console.error('传入数据只能是数组');
            return;
        }
        console.log('新数据', newResData);
        console.log('旧数据', oldValue);

        const isFullPage = newResData.length % this.pageSize === 0;


        if (isFullPage) {

            if (!this.isNotFullPage) {
                // 新数据填充一页
                this.page++;
                this.dataList = oldValue.concat(newResData)

            } else {
                this.upDateList(newResData, oldValue)
                this.isNotFullPage = false;
                this.page++;

            }

        } else {
            if (!this.isNotFullPage) {
                // 非完整页的第一次填充
                this.dataList = oldValue.concat(newResData)
                this.isNotFullPage = true;
            } else {
                // 非完整页的后续填充
                this.upDateList(newResData, oldValue)
            }
        }


    },
    upDateList(newResData, oldValue) {
        const middleIndex = (this.page - 1) * this.pageSize;
        console.log('middleIndex', middleIndex);

        const firstHalf = oldValue.slice(0, middleIndex);
        console.log('firstHalf', firstHalf);

        this.dataList.length = 0;
        this.dataList.push(...firstHalf, ...newResData);
    },

    // 设置列表数据
    setDataList(newResData) {
        this.updateDataList(newResData, this.dataList);
    },


    nexPageSetFunctions: setFunctions,
    nexPageAddFunctions: addFunctions,
    nexPageReload: dataReady,


}

