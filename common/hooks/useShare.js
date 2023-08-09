import {ref} from 'vue';
import {onShareAppMessage} from "@dcloudio/uni-app";
import {getCurrentPgePath, queryString} from "@/utils/tools";
import {getMyUserInfo} from "@/utils/customMethods";


/*onReady((options) => {
    console.log('onReady:==========================useShare')
    uni.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage']
        // menus: ['shareAppMessage', 'shareTimeline']//开启转发好友和转发朋友圈按钮
    })
})*/
const useShare = () => {
    const title = ref('聚心共享');

    const imageUrl = ref('');

    const setShareConfig = ({title: newTitle, imageUrl: newImageUrl}) => {
        title.value = newTitle;
        imageUrl.value = newImageUrl;
    };

    const onShareAppMessageHandler = () => {

        onShareAppMessage((res) => {
            console.log(res.from)
            if (res.from === "menu") {

            } else if (res.from === "button") {

            }


            const {pagePath, page} = getCurrentPgePath()
            console.log('queryString', queryString(page.options))
            const userInfo = getMyUserInfo()
            return {
                title: title.value,
                path: '/' + pagePath + '?inviteId=' + userInfo.id + queryString(page.options),
                imageUrl: imageUrl.value,
            }

        })
    }

    return {
        setShareConfig,
        onShareAppMessageHandler,
    };
}
export {useShare}
