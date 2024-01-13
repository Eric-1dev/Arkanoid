<template>
    <div class="ball" ref="ballElem">
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ArkBall",

    data() {
        return {
            timer: Object,
            angle: Number,
            directionX: Number,
            directionY: Number,
            deltaX: Number,
            deltaY: Number,
            speed: Number,
            ballPos: {
                x: Number,
                y: Number,
                width: Number,
                height: Number
            }
        }
    },

    props: {
        size: Number
    },

    computed: {
        ...mapState({
            ballZonePosition: state => state.gameStore.ballZonePosition,
            batPosition: state => state.gameStore.batPosition,
            isBallFree: state => state.gameStore.isBallFree
        }),
    },

    watch: {
        size() {
            this.updateSize();
        },

        'batPosition.x'() {
            this.updatePositionByBat();
        },

        'batPosition.width'() {
            this.updatePositionByBat();
        },

        isBallFree(newValue) {
            if (!newValue) {
                return;
            }

            this.timer = setInterval(this.tick, 5);
        }
    },

    mounted() {
        this.updateSize();

        this.updatePositionByBat();

        this.angle = 0.85;
        this.directionX = -1;
        this.directionY = -1;
        this.deltaX = 0;
        this.deltaY = 0;

        this.speed = 4.0;

        this.ballPos.x = 0;
        this.ballPos.y = 0;
        this.ballPos.width = 0;
        this.ballPos.height = 0;

        this.calculateDeltas();
    },

    methods: {
        updateSize() {
            this.$refs.ballElem.style.width = `${this.size}px`;
            this.$refs.ballElem.style.height = `${this.size}px`;
        },

        updatePositionByBat() {
            if (this.isBallFree) {
                return;
            }

            const ballX = this.batPosition.x + this.batPosition.width / 2 - 20;
            const ballY = this.ballZonePosition.y + this.ballZonePosition.height - this.size;

            this.$refs.ballElem.style.left = `${ballX}px`;
            this.$refs.ballElem.style.top = `${ballY}px`;
        },

        calculateDeltas() {
            this.deltaY = this.speed * this.angle;
            this.deltaX = this.speed * (1 - this.angle);
            // this.deltaX = this.speed - this.deltaY * this.angle;
        },

        tick() {
            const pos = this.$refs.ballElem.getBoundingClientRect();
            
            this.ballPos.x = pos.x;
            this.ballPos.y = pos.y;
            this.ballPos.width = pos.width;
            this.ballPos.height = pos.height;

            const ballX = this.ballPos.x + (this.deltaX * this.directionX);
            const ballY = this.ballPos.y + (this.deltaY * this.directionY);

            this.$refs.ballElem.style.left = `${ballX}px`;
            this.$refs.ballElem.style.top = `${ballY}px`;

            this.checkWallCollision();
        },

        checkWallCollision() {
            if (this.ballPos.x <= this.ballZonePosition.x) {
                this.directionX = 1;
            } else if (this.ballPos.x + this.ballPos.width >= this.ballZonePosition.x + this.ballZonePosition.width) {
                this.directionX = -1;
            }

            if (this.ballPos.y <= this.ballZonePosition.y) {
                this.directionY = 1;
            } else if (this.ballPos.y + this.ballPos.height - 1 >= this.ballZonePosition.y + this.ballZonePosition.height) {
                if (this.checkBatCollision()) {
                    this.directionY = -1;
                } else {
                    this.gameOver();
                }
            } 
        },

        checkBatCollision() {
            return true;
        },

        gameOver() {
            clearInterval(this.timer);
        }
    }
}
</script>

<style lang="css" scoped>
.ball {
    position: absolute;
    border-radius: 50%;
    background-color: cadetblue;
}
</style>