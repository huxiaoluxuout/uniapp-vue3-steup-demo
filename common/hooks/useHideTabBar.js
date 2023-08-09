import {ref} from "vue";



// 页面滚动
const pageScroll = (onPageScroll) => {
    let opacity = ref(0)
    let bgColor = ref('transparent')
    onPageScroll((e) => {
        opacity.value = `${Math.ceil(e.scrollTop / 120)}`
        bgColor.value = `rgba(255,255,255,${Math.ceil(e.scrollTop / 120)})`
        // console.log('onPageScroll',e)
    })
    return {opacity, bgColor}
}
export { pageScroll}



