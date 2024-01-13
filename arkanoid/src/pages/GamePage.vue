<template>
    <div class="container" @click="onClick">
        <game-field></game-field>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState({
            isGameRunning: state => state.gameStore.isGameRunning,
            isBallFree: state => state.gameStore.isBallFree
        }),
    },

    mounted() {
        this.$store.dispatch('gameStore/setGameRunning', true);
        this.$store.dispatch('gameStore/setIsBallFree', false);
    },

    methods: {
        onClick() {
            if (!this.isGameRunning || this.isBallFree) {
                return;
            }

            this.$store.dispatch('gameStore/setIsBallFree', true);
        }
    }
}
</script>

<style lang="css" scoped>
.container {
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 30px;
}
</style>