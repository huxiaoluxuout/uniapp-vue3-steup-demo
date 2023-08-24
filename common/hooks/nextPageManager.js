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
    flag: false,
    diffLastNum: 0,

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
            let targetLength = this.page * this.pageSize
            // console.log('targetLength', targetLength)
            // console.log('实际长度', newValue.length)


            if (targetLength === newValue.length) {
                this.page++
                this.dataList = newValue;
                this.flag = false

            } else {

                if (this.flag) {
                    const middleIndex = [(this.page - 1) * this.pageSize]
                    console.log('middleIndex', middleIndex)
                    const diffNum = (newValue.length % this.pageSize) / 2

                    console.log('diffNum', this.diffLastNum, diffNum)

                    const firstHalf = newValue.slice(0, middleIndex);   // 获取数组的前半部分
                    const secondHalf = newValue.slice(middleIndex);     // 获取数组的后半部分

                    console.log('firstHalf', firstHalf);
                    let i = diffNum
                    while (i > 0) {
                        secondHalf.shift()
                        i--
                    }
                    console.log('secondHalf', secondHalf);


                    // let cc= newValue.splice(middleIndex, diffNum,...newValue.slice(-diffNum));
                    //  console.log(newValue)
                    //  console.log(cc)

                    if (this.diffLastNum === diffNum) { // 没有新增数据
                        console.log('没有新增数据')


                    } else {
                        console.log('有新增数据')
                        // newValue.splice(index, sum, newValue.slice(-sum));
                        // TODO 问题不能判断真实新增的数据

                    }
                    this.dataList = [...firstHalf, ...secondHalf];


                } else {
                    this.dataList = newValue;
                    this.flag = true
                    this.diffLastNum = newValue.length % this.pageSize
                }

            }

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

