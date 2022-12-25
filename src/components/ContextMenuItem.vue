<template>
    <div class="divider" v-if="option.value === '__divider__'"></div>
    <div class="menu-item horizontal-flex flex-center" v-else
         ref="item"
         @click="itemClick"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave"
         :class="{ 'disabled': option.disabled }"
    >
        <div class="flex-fill" style="font-size: 13px">{{ option.text }}</div>
        <div v-if="option.shortcut" style="font-size: 11px">{{ option.shortcut }}</div>

        <template v-if="option.children">
            <img src="images/right-arrow.png"/>
            <ContextMenuContainer
                v-if="isActive"
                :options="option.children"
                :parent-value="recursiveValue"
                :style="{ 'top': childTop + 'px', 'left': childLeft + 'px' }"
            ></ContextMenuContainer>
        </template>
    </div>
</template>

<script>
import ContextMenuContainer from "./ContextMenuContainer";

const valueDivider = '::'

export default {
    name: "ContextMenuItem",
    components: {ContextMenuContainer},
    props: {
        option: Object,
        parentValue: String,
    },

    data() {
        return {
            isActive: false,

            childLeft: 0,
            childTop: 0,
        }
    },

    methods: {
        mouseEnter(e) {
            this.isActive = true
            const r = this.$refs.item.getBoundingClientRect()

            this.childLeft = r.right - 2
            this.childTop = r.top - 4
        },

        mouseLeave(e) {
            this.isActive = false
        },

        itemClick(e) {
            if (this.option.disabled) {
                e.preventDefault()
                return
            }

            if (!this.hasChildren) {
                this.onContextMenuClick(this.recursiveValue.split(valueDivider).filter(x => !!x))
            }
        },
    },

    computed: {
        hasChildren() {
            return this.option.children && this.option.children.length > 0
        },

        recursiveValue() {
            return this.parentValue + valueDivider + this.option.value
        },
    }
}
</script>

<style scoped lang="scss">

.menu-item {
    padding: 3px 8px;
    cursor: pointer;
    transition: background-color 0.1s;
    font-size: 13px;

    &:not(.disabled):hover {
        background: var(--blue);
    }

    &.disabled {
        color: #7c848a;
    }

    img {
        width: 10px;
        height: 12px;
        filter: brightness(70%);
    }
}

.divider {
    height: 1px;
    background: var(--menu-border);
    margin: 5px;
}

</style>