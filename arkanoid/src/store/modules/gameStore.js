const gameStore = {
    namespaced: true,

    state: {
        batLeftPosition: 0,
        batWidth: 0
    },

    mutations: {
        setBatLeftPosition(state, value) {
            state.batLeftPosition = value;
        },

        setBatWidth(state, value) {
            state.batWidth = value;
        }
    },

    actions: {
        setBatLeftPosition({ commit }, value) {
            commit('setBatLeftPosition', value);
        },

        setBatWidth({ commit }, value) {
            commit('setBatWidth', value);
        },
    }
};

export default gameStore;