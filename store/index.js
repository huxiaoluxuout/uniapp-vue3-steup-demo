import {createStore} from 'vuex';


const store = createStore({
    state() {
        return {
            inviteId: '',
        };
    },
    mutations: {
        setInviteId(state, payload) {
            state.inviteId = payload
        },
    },
    actions: {
        updateActionInviteId({commit}, payload) {
            commit('setInviteId', payload)
        }
    },
    getters: {},
});

export default store;
