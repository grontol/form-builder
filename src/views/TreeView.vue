<template>
    <div class="root vertical-flex">
        <div class="fb-panel-header horizontal-flex flex-center">
            <img src="images/tree.png" class="fb-icon mr-3"/>
            <div class="fb-panel-title flex-fill">Hierarchy</div>

            <div class="fb-minimize vertical-flex flex-justify-center" @click="hideHierarchy">
                <img src="images/minimize.png" class="fb-icon-small"/>
            </div>
        </div>

        <div class="content vertical-flex flex-fill">
            <TreeItem :item="item" v-for="item in items"></TreeItem>
        </div>
    </div>
</template>

<script>

import TreeItem from "./TreeItem";

export default {
    name: "TreeView",
    components: {TreeItem},

    data() {
        return {

        }
    },

    methods: {
        hideHierarchy() {
            this.$store.dispatch('ui/showHierarchy', false)
        },
    },

    computed: {
        items() {
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