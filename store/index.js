import {createStore} from 'vuex';


const store = createStore({
    state() {
        return {
            inviteId: '',
            PageInfo: {},
        };
    },
    mutations: {
        setInviteId(state, payload) {
            state.inviteId = payload
        },
        setPageInfo(state, value) {
            state.PageInfo = value;
        },
    },
    actions: {
        updateActionInviteId({commit}, payload) {
            commit('setInviteId', payload)
        },
        updatePageInfo({commit}, payload) {
            commit('setPageInfo', payload)
        }
    },
    getters: {
        getPageInfo: state => {
            return state.PageInfo
        },
    },
});

export default store;
