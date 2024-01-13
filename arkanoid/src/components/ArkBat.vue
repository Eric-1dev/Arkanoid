<template>
    <div>
        <div class="bat-container" ref="batContainerElem">
            <div class="bat" ref="batElem"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ArkBat",

    props: {
        widthMode: String
    },

    computed: {
        ...mapState({
            batWidth: state => state.gameStore.batPosition.width
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
            let batX = event.pageX - this.batWidth / 2;

            const containerPos = this.$refs.batContainerElem.getBoundingClientRect();

            if (batX < containerPos.x) {
                batX = containerPos.x;
            } else if (batX + this.batWidth > containerPos.x + containerPos.width) {
                batX = containerPos.x + containerPos.width - this.batWidth;
            }

            this.$store.dispatch('gameStore/setBatXPosition', batX);

            this.$refs.batElem.style.left = `${batX}px`;
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

.info-block > div {
    text-align: left;
    width: 200px;
}

</style>