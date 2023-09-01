import {onReachBottom} from "@dcloudio/uni-app";

import {throttle} from "@/utils/tools";

import useDoQueue from "@/common/hooks/useuseDoQueue"
import useDataReady from "@/common/hooks/useDataReady"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

const {onEmitCallback, emitCallback} = useDataReady();

export const nextPageManager = {
    // 当前页码
    page: 1,
    // 每页数量
    pageSize: 10,
    // 列表数据
    dataList: [],


    notFullLen: 0,


    // 初始化监听触底加载下一页
    onReachBottom() {
        onReachBottom(throttle(() => {
            // 加载下一页数据
            console.log('加载下一页数据')
            this.nexPageDoFunQueue()
        }))
        return this
    },

    // 重新加载
    reload() {
        this.page = 1
        this.pageSize = 10
        // this.dataList = [];
        // console.log('重新加载===', this)
        emitCallback();
        return this

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
            this.dataList = oldDataList.concat(newResDataList);

        } else {
            if (!this.notFullLen) {

                this.dataList = oldDataList.concat(newResDataList);

                this.notFullLen = newResDataList.length;
            } else {

                throw new Error('数据加载完成，尝试刷新页面');
            }
        }

    },
    // 设置列表数据
    setDataList(newResData) {
        this.updateDataList(newResData, this.dataList);
        return this
    },


    nexPageSetFunName(func, args) {
        setFunctions(func, args)
        return this
    },
    nexPageSetFunNames(func, args) {
        addFunctions(func, args)
        return this
    },

    // 执行函数的调用
    nexPageDoFunQueue() {
        DoFunQueue()
    },

    // 响应重新加载
    onNexPageReload: onEmitCallback


}

