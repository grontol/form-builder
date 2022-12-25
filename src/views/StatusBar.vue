<template>
    <div class="root horizontal-flex flex-justify-end">
        <div class="mr-5">Hovered Item : {{ hoveredItem ? hoveredItem.name : '-' }}</div>
        <div>Active Item : {{ activeItem ? activeItem.name + ' (' + activeItem.compName + ')' : '-' }}</div>
    </div>
</template>

<script>
export default {
    name: "StatusBar",

    computed: {
        activeItem() {
            return this.$store.getters["item/activeItem"]
        },

        hoveredItem() {
            return this.$store.getters['item/hoveredItem']
        }
    }
}
</script>

<style scoped lang="scss">

.root {
    background: var(--dark-background);
    padding: 4px 10px;
    border: 1px solid var(--border);
    z-index: 40;
    font-size: 12px;
    color: var(--text-medium);
}

</style>