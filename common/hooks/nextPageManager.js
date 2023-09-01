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
        // 检查传入的数据是否为数组
        if (!Array.isArray(newResDataList)) {
            console.error('传入数据只能是数组');
            return;
        }

        // 检查数据是否发生改变
        if (this.notFullLen !== newResDataList.length) {
            console.log('数据改变了');
        }

        // 检查是否是满页数据
        const isFullPage = newResDataList.length % this.pageSize === 0;

        if (isFullPage && this.pageSize !== 0) {
            // 如果是满页数据且每页大小不为0，则增加页数
            this.page++;
            this.notFullLen = 0;
            this.dataList = [...oldDataList, ...newResDataList];
        } else {
            if (!this.notFullLen) {
                // 如果不是满页数据且上一页数据已显示完整，则更新数据列表并更新未显示数据的长度
                this.dataList = [...oldDataList, ...newResDataList];
                this.notFullLen = newResDataList.length;
            }
        }
    },
    /*updateDataList(newResDataList, oldDataList) {
        if (!Array.isArray(newResDataList)) {
            console.error('传入数据只能是数组');
            return;
        }
        console.log('新数据', newResDataList);
        console.log('旧数据', oldDataList);

        const isFullPage = newResDataList.length % this.pageSize === 0;


        if (isFullPage) {

            if (!this.isNotFullPage) {
                // 新数据填充一页
                this.page++;
                this.dataList = oldDataList.concat(newResDataList)

            } else {
                this.upDateList(newResDataList, oldDataList)
                this.isNotFullPage = false;
                this.page++;

            }

        } else {
            if (!this.isNotFullPage) {
                // 非完整页的第一次填充
                this.dataList = oldDataList.concat(newResDataList)
                this.isNotFullPage = true;
            } else {
                // 非完整页的后续填充
                this.upDateList(newResDataList, oldDataList)
            }
        }


    },*/

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

