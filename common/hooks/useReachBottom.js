import {reactive, ref, watch} from "vue";
import {onLoad, onReachBottom, onPullDownRefresh} from "@dcloudio/uni-app";
import updateReload from "@/common/hooks/useUpdateReload";
import {throttle} from "@/utils/tools";

export default function useReachBottomHandler(dataList) {
    let funcList = []
    const setFunctions = (func, ...args) => {
        funcList = [{func, args}]
    }
    // 当前页码
    const page = ref(1)
    // 每页数量
    const pageSize = ref(10)

    // 是否正在加载中
    const isLoading = ref(false)


    function funcListHandler() {
        // console.log('funcListHandler', funcList)

        funcList.reduce((result, {func, args}) => {
            return func(...args, result);
        }, true);
    }


    const innitData = () => {
        dataList.length=0;

        page.value = 1
        pageSize.value = 10
        return dataList.length === 0

    }

    // 重新加载
    const reload = () => {
        isLoading.value = true
        // 调用初始化数据函数并检查返回值
        const isDataListEmpty = innitData();
        if (isDataListEmpty) {
            console.log('dataList 已被清空');
            setTimeout(()=>{
                funcListHandler()
            },100)
        } else {
            console.log('dataList 未被清空');
            innitData()
        }

    }

    const responseDataList = (code, resDataListLength) => {
        console.log(resDataListLength)
        if (code === 0) {
            isLoading.value = false; // 加载完成，标记为不在加载中
            resDataListLength && page.value++; // 页码加1

        } else {
            isLoading.value = false; // 加载失败，标记为不在加载中
        }

    }

    // 触底加载下一页数据
    const reachBottomHandler = () => {

        onReachBottom(throttle(() => {
            // 加载下一页数据
            if (!isLoading.value) {
                //isLoading.value = true; // 标记为正在加载中
                console.log('加载下一页数据')
                funcListHandler()
            }
        }))
    }

    // 返回封装后的函数和响应式变量
    return {
        page,
        pageSize,
        reachBottomHandler,

        responseDataList,
        reload,

        isLoading,
        setFunctions,
    };
}
