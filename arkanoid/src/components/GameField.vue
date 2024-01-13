<template>
    <div>
        <div class="container">
            <ball-zone></ball-zone>
            <ark-bat :widthMode="batSize"></ark-bat>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameField",

    data() {
        return {
            batSize: "normal"
        }
    }
}
</script>

<style lang="css" scoped>
.container {
    width: 800px;
    height: 900px;
    border: 1px solid gray;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    cursor: none;
}
</style>