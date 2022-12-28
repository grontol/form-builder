<template>
    <div class="menu-container">
        <ContextMenuItem v-for="(opt, i) in options" :key="i" :option="opt" :parent-value="parentValue"></ContextMenuItem>
    </div>
</template>

<script>

export default {
    name: "ContextMenuContainer",
    components: {
        ContextMenuItem: () => import('./ContextMenuItem.vue')
    },
    props: {
        options: Array,
        parentValue: {
            type: String,
            default: '',
        }
    },
}
</script>

<style scoped lang="scss">

.menu-container {
    background: var(--menu-background);
    border: 1px solid var(--menu-border);
    color: white;
    padding: 4px 0;
    position: fixed;
    min-width: 180px;
}

</style>