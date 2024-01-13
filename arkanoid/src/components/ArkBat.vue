<template>
    <div>
        <div class="bat-container" ref="batContainerElem">
            <div class="bat" ref="batElem"></div>
        </div>
        <div class="info-block">
            <div>mouseX = {{ mouseX }}</div>
            <div>batContainerLeft = {{ batContainerLeft }}</div>
            <div>batContainerRight = {{ batContainerRight }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ArkBat",

    data() {
        return {
            mouseX: 0,
            batContainerLeft: 0,
            batContainerRight: 0,
        }
    },

    props: {
        widthMode: String
    },

    computed: {
        ...mapState({
            // batLeftPosition: state => state.gameStore.batLeftPosition,
            batWidth: state => state.gameStore.batWidth
        }),
    },

    watch: {
        widthMode() {
            this.updateBatWidth();
        }
    },

    mounted() {
        this.updateBatWidth();

        document.addEventListener('mousemove', this.mouseMove);
    },

    methods: {
        mouseMove(event) {
            this.mouseX = event.pageX;

            let leftPosition = event.pageX - this.batWidth / 2;

            const containerPos = this.$refs.batContainerElem.getBoundingClientRect();

            if (leftPosition < containerPos.x) {
                leftPosition = containerPos.x;
            } else if (leftPosition + this.batWidth > containerPos.x + containerPos.width) {
                leftPosition = containerPos.x + containerPos.width - this.batWidth;
            }

            this.$store.dispatch('gameStore/setBatLeftPosition', leftPosition);

            this.$refs.batElem.style.left = `${leftPosition}px`;
        },

        updateBatWidth() {
            let width;

            switch (this.widthMode) {
                case 'normal':
                    width = 200;
                    break;
                case 'larger':
                    width = 300;
                    break;
                case 'high':
                    width = 400;
                    break;
            }

            this.$store.dispatch('gameStore/setBatWidth', width);

            this.$refs.batElem.style.width = `${width}px`;
        }
    }
}
</script>

<style lang="css" scoped>

.bat-container {
    width: 100%;
    height: 30px;
}

.bat {
    position: absolute;
    height: 24px;
    border: 1px solid black;
    border-radius: 12px;
    background-color: antiquewhite;
}

.info-block {
    position: fixed;
    bottom: 0;
    right: 0;
}

.info-block > div {
    text-align: left;
    width: 200px;
}

</style>