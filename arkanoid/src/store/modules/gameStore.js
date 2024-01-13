const gameStore = {
    namespaced: true,

    state: {
        batPosition: {
            x: Number,
            width: Number
        },

        ballZonePosition: {
            x: Number,
            y: Number,
            width: Number,
            height: Number
        },

        isGameRunning: Boolean,
        isBallFree: Boolean
    },

    mutations: {
        setBatXPosition(state, value) {
            state.batPosition.x = value;
        },

        setBatWidth(state, value) {
            state.batPosition.width = value;
        },

        setBallZonePosition(state, value) {
            state.ballZonePosition = value;
        },

        setGameRunning(state, value) {
            state.isGameRunning = value;
        },

        setIsBallFree(state, value) {
            state.isBallFree = value;
        }
    },

    actions: {
        setBatXPosition({ commit }, value) {
            commit('setBatXPosition', value);
        },

        setBatWidth({ commit }, value) {
            commit('setBatWidth', value);
        },

        setBallZonePosition({ commit }, value) {
            commit('setBallZonePosition', value);
        },

        setGameRunning({ commit }, value) {
            commit('setGameRunning', value);
        },

        setIsBallFree({ commit }, value) {
            commit('setIsBallFree', value);
        }
    }
};

export default gameStore;