<template>
    <component :is="item.comp" v-bind="bindProps(item.props)"
       class="root"
       :class="{ 'hovered': hovered || isHovered, 'selected': isSelected }"
       :style="{ 'z-index': (50 + item.level) }"
       ref="root"
       @mouseenter.native.stop="onMouseEnter"
       @mouseleave.native.stop="onMouseLeave"
       @click.native.stop="select"
    >
        <template v-if="item.children" scope="params">
            <FormViewItem v-for="(c, i) in item.children" :item="c" :key="i" :params="params"></FormViewItem>
        </template>
    </component>
</template>

<script>
import {findVariable} from "../../utils/utils";

export default {
    name: "FormViewItem",

    props: {
        item: Object,
        params: {
            type: Object,
            default() {
                return {}
            }
        }
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

        bindProps(props) {
            if (!props)
                return props

            const handler = {
                get: (target, prop, receiver) => {
                    const val = target[prop]
                    const vars = findVariable(val)
                    let newVal = val

                    // TODO Only works for string
                    for (let a = vars.length - 1; a >= 0; a--) {
                        const v = vars[a]

                        if (this.params[v.name] === undefined || this.params[v.name] === null) {
                            this.reportError("Cannot find param with name : " + v.name, this.item)

                            newVal = newVal.substring(0, v.startIndex) + '--> [ No Param : ' + v.name + ' ] <--' + newVal.substring(v.endIndex)
                        }
                        else
                            newVal = newVal.substring(0, v.startIndex) + this.params[v.name] + newVal.substring(v.endIndex)
                    }

                    return newVal
                }
            }

            return new Proxy(props, handler)
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