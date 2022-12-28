<template>
    <div class="root horizontal-flex">
        <EditorTabItem
            v-for="(f, i) in files"
            :name="f.name"
            :active="f === activeFile"
            :unsaved="f.unsaved"
            @click="activeFile = f"
            @close="closeFile(f)"
            :key="i"
        />
    </div>
</template>

<script>
import EditorTabItem from "./EditorTabItem";
export default {
    name: "EditorTab",
    components: {EditorTabItem},

    data() {
        return {
            active: 1,
        }
    },

    methods: {
        closeFile(f) {
            this.$store.dispatch('item/closeFile', f)
        }
    },

    computed: {
        files() {
            return this.$store.getters['item/files']
        },

        activeFile: {
            get() {
                return this.$store.getters['item/activeFile']
            },

            set(v) {
                this.$store.dispatch('item/setActiveFile', v)
            },
        },
    },
}
</script>

<style scoped lang="scss">

.root {
    background: var(--dark-background);
}

</style>