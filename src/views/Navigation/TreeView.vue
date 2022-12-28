<template>
    <Panel title="Hierarchy" icon="images/tree.png" @hide="hideHierarchy" @click="onClick">
        <TreeItem :item="item"></TreeItem>
    </Panel>
</template>

<script>

import TreeItem from "./TreeItem";
import Panel from "../../components/Panel";

export default {
    name: "TreeView",
    components: {Panel, TreeItem},

    data() {
        return {

        }
    },

    methods: {
        hideHierarchy() {
            this.$store.dispatch('ui/showHierarchy', false)
        },

        onClick() {
            this.$store.dispatch('item/setActiveItem', null)
        }
    },

    computed: {
        item() {
            return this.$store.getters['item/tree']
        }
    }
}
</script>

<style scoped lang="scss">

.root {
    background: var(--dark-background);
    overflow: hidden;
    border: 1px solid var(--border);
    border-left: none;
    border-bottom: none;
    z-index: 10;
}

.content {
    padding: 15px;
    overflow: auto;
}

</style>