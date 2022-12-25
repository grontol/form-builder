<template>
    <div class="root" @click="hide">
        <ContextMenuContainer
            :options="options"
            :style="{ 'top': top + 'px', 'left': left + 'px' }"
        ></ContextMenuContainer>
    </div>
</template>

<script>
import ContextMenuItem from "./ContextMenuItem";
import ContextMenuContainer from "./ContextMenuContainer";
export default {
    name: "ContextMenu",
    components: {ContextMenuContainer, ContextMenuItem},
    data() {
        return {
            top: 0,
            left: 0,
        }
    },

    mounted() {
        this.left = this.target.x
        this.top = this.target.y
    },

    methods: {
        hide() {
            this.hideContextMenu()
        },
    },

    computed: {
        target() {
            return this.$store.getters['menu/target']
        },

        options() {
            return this.$store.getters['menu/options']
        },
    }
}
</script>

<style scoped lang="scss">

.root {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 200;
}

</style>