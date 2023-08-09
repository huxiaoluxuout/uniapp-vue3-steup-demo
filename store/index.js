import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            count: 0,// 站内消息
            num : 0,// 好友消息
            userInfo : {
                nickname:'未注册',
            },// 用户信息
        };
    },
    mutations: {
        increment(state,data) {

            state.count=data;
        },
        incrementFriend(state,data) {

            state.num=data;
        },

        updateUserInfo(state,data) {

            state.userInfo=data;
        },

    },
    actions: {
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        },
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
    },
});

export default store;
