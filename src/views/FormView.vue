<template>
    <div class="root" id="form-view" v-if="show" ref="root">
        <FormViewItem v-for="item in items" :item="item" :key="item.id"></FormViewItem>
    </div>
</template>

<script>
import FormViewItem from "./FormViewItem";
export default {
    name: "FormView",

    components: {FormViewItem},

    props: {
    },

    data() {
        return {
            show: true,
        }
    },

    methods: {
        select(item) {
            this.$store.dispatch('item/setActiveItem', item)
        },
    },

    computed: {
        items() {
            return this.$store.getters['item/tree']
        },

        activeItem() {
            return this.$store.getters['item/activeItem']
        },

        stateIndex() {
            return this.$store.getters['item/stateIndex']
        },
    },

    watch: {
        stateIndex(v) {
            this.show = false
            setTimeout(() => {
                this.show = true
            }, 100)
        }
    }
}
</script>

<style scoped lang="scss">

.root {
    overflow: auto;
    background: white;
}

.selection {
    position: fixed;
    background: rgba(255, 0, 0, 0.05);
    border: 1px solid rgba(255, 0, 0, 0.3);
    box-sizing: border-box;
    z-index: 40;
}

.hover {
    position: fixed;
    cursor: pointer;
    transition: background-color 0.1s;
    box-sizing: border-box;
    background: transparent;

    &:hover, &.hovered {
        background: rgba(0, 42, 255, 0.1);

        .tooltip {
            visibility: visible;
            opacity: 1;
        }
    }

    .tooltip {
        position: absolute;
        visibility: hidden;
        width: 120px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        text-align: center;
        border-radius: 6px !important;
        padding: 5px 0;
        z-index: 1;
        left: 50%;
        margin-left: -60px;
        margin-top: auto;
        margin-bottom: auto;
        height: 26px;
        top: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.5s;
    }
}

</style>