<template>
    <div class="ball-zone-container" ref="ballZoneElem">
        <ark-ball :size="20"></ark-ball>
    </div>
</template>

<script>
export default {
    name: "BallZone",

    mounted() {
        this.updateZonePosition();
    },

    methods: {
        updateZonePosition() {
            const position = this.$refs.ballZoneElem.getBoundingClientRect();

            this.$store.dispatch('gameStore/setBallZonePosition', {
                x: position.x,
                y: position.y,
                width: position.width,
                height: position.height
            });
        }
    }
}
</script>

<style lang="css" scoped>
.ball-zone-container {
    height: 100%;
    overflow: hidden;
}
</style>