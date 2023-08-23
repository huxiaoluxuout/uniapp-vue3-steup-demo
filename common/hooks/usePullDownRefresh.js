import {onPullDownRefresh} from "@dcloudio/uni-app";
import useDoQueue from "@/common/hooks/useuseDoQueue"

const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()


const funQueue = () => {
    console.log('000')
    DoFunQueue()
    console.log('111')
    uni.stopPullDownRefresh();

}


// 下拉刷新
export default function () {
    onPullDownRefresh(funQueue);
    return {
        setFunctions,
        addFunctions
    }

}
