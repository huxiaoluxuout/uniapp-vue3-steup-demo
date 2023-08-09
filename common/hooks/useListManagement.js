import {ref, watch, reactive, computed} from 'vue';
import {navigateTo} from "@/utils/tools";

export default function useListManagement() {
    // 定义响应式变量
    const dataList = reactive([]);
    const isEdit = ref(false);
    const allChecked = ref(false);
    const showFooterBtn = computed(()=>{
        return !!dataList.length
    })
    // 定义 toggleAllChecked() 函数，用于切换全选/全不选状态
    function toggleAllChecked() {
        allChecked.value = !allChecked.value;
        dataList.forEach(item => item.checked = allChecked.value);
    }

    // 定义 getCheckedList() 函数，用于获取当前选中项列表
    function getCheckedList() {
        return dataList.filter(item => item.checked);
    }

    // 定义 deleteCheckedList() 函数，用于删除选中项
    function deleteCheckedList() {
        getCheckedList().forEach(item => {
            const index = dataList.indexOf(item);
            dataList.splice(index, 1);
            isEdit.value = !!dataList.length

        });
    }
    // 用于对传入的列表数据进行响应式处理
    // 显示是否选中
    function useListData(dataList) {
        dataList.forEach(item => item.checked = false);
        watch(dataList, (newDataList, oldVal) => {
            allChecked.value = newDataList.every(item => item.checked)
        });
    }
    function btnClickHandler(e,callback) {
        if (e.type === 'edit') {
            isEdit.value = !!dataList.length
        } else if (e.type === 'del') {
            if (!getCheckedList().length) return
            uni.showModal({
                title: '删除提示',
                content: '是否删除选中记录？',
                success: function (res) {
                    if (res.confirm) {
                        // const ids = getCheckedList().map(item => item.id).join(',')
                        const ids = getCheckedList().map(item => item.id)
                        console.log('ids', ids)
                        callback&&callback(ids)
                        // deleteCheckedList()
                    } else if (res.cancel) {
                        console.log('用户点击了取消按钮');
                    }
                }
            });

        } else if (e.type === 'complete') {
            isEdit.value = false
        } else if (e.type === 'navigateTo') {
            callback&&callback('navigateTo')
        }
    }

    // 返回封装后的函数和响应式变量
    return {
        dataList,
        isEdit,
        allChecked,
        toggleAllChecked,
        getCheckedList,
        deleteCheckedList,
        useListData,
        showFooterBtn,
        btnClickHandler
    };
}
