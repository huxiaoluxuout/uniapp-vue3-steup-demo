
import {onPullDownRefresh} from "@dcloudio/uni-app";
import {getNewPower} from "@/common/hooks/useCheckToken";

const updateUserInfo = async () => {
    await getNewPower(() => {
        uni.stopPullDownRefresh();
    })
}

export default function (){
    onPullDownRefresh(updateUserInfo)

}
