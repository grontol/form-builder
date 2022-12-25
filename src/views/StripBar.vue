<template>
    <div class="root">
        <div class="strip-item" :class="{ 'active': showHierarchy }" @click="hierarchyClick">Hierarchy</div>
    </div>
</template>

<script>
export default {
    name: "StripBar",

    methods: {
        hierarchyClick() {
            this.$store.dispatch('ui/toggleHierarchy')
        }
    },
}
</script>

<style scoped lang="scss">

.root {
    background: var(--not-very-dark-background);
    border: 1px solid var(--border);
    z-index: 30;
}

.strip-item {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    padding: 18px 4px;
    font-size: 13px;
    cursor: pointer;
    position: relative;

    &.active {
        background: var(--header-background);
    }

    &:hover::after {
        content: "";
        background: rgba(255, 255, 255, 0.04);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}

</style>