import { createStore } from "vuex";
import gameStore from "./modules/gameStore";

const store = createStore({
    modules: {
        gameStore: gameStore
    }
});

export default store;