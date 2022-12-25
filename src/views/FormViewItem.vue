<template>
    <component :is="item.comp" v-bind="item.props"
       class="root"
       :class="{ 'hovered': hovered || isHovered, 'selected': isSelected }"
       :style="{ 'z-index': (50 + item.level) }"
       ref="root"
       @mouseenter.native.stop="onMouseEnter"
       @mouseleave.native.stop="onMouseLeave"
       @click.native.stop="select"
    >
        <FormViewItem v-if="item.children" v-for="c in item.children" :item="c" v-bind="c.props"></FormViewItem>
    </component>
</template>

<script>
export default {
    name: "FormViewItem",

    props: {
        item: Object,
    },

    data() {
        return {
            hovered: false,
        }
    },

    mounted() {
        this.item.viewComp = () => {
            return this
        }
    },

    beforeDestroy() {
        this.item.viewComp = undefined
    },

    methods: {
        onMouseEnter() {
            this.hovered = true
        },

        onMouseLeave() {
            this.hovered = false
        },

        select() {
            this.$store.dispatch('item/setActiveItem', this.item)
        },
    },

    computed: {
        activeItem() {
            return this.$store.getters['item/activeItem']
        },

        isSelected() {
            return this.$store.getters['item/selectedItems'].includes(this.item)
        },

        isHovered() {
            return this.$store.getters['item/hoveredItem'] === this.item
        },
    },

    watch: {
        isSelected(v) {

        }
    }
}
</script>

<style scoped lang="scss">

.root {
    position: relative;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute !important;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: transparent;
        z-index: 100;
        pointer-events: none;
    }

    &:hover:not(:has(.hovered)), &.hovered:not(:has(.hovered)), &:hover:not(:has(.hovered)):before, &.hovered:not(:has(.hovered)):before {
        background: rgba(255, 0, 0, 0.1);
    }

    &.selected, &.selected:before {
        background: rgba(0, 42, 255, 0.1);
        outline: 3px solid rgba(0, 42, 255, 0.6);
    }
}

</style>