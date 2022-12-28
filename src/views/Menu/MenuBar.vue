<template>
    <div class="root vertical-flex">
        <div class="horizontal-flex flex-center">
            <MenuItemIcon v-tooltip="'New File'" src="images/add-file.png" @click="$store.dispatch('item/addFile')"/>
            <MenuItemIcon v-tooltip="'Open File'" src="images/open.png"/>
            <MenuItemIcon v-tooltip="'Save File'" src="images/save.png" @click="save"/>
            <div class="vertical-divider"></div>
            <MenuItemIcon v-tooltip="'Undo'" src="images/undo.png" :disabled="!canUndo" @click="undo"/>
            <MenuItemIcon v-tooltip="'Redo'" src="images/undo.png" :flipped="true" :disabled="!canRedo" @click="redo"/>
            <div class="vertical-divider"></div>
            <MenuItemIcon v-tooltip="'Copy'" src="images/copy.png" :disabled="!canCopy"/>
            <MenuItemIcon v-tooltip="'Paste'" src="images/paste.png" :disabled="!canPaste"/>

            <div class="flex-fill"></div>

            <MenuItemIcon v-tooltip="fullScreen ? 'Exit Fullscreen' : 'Fullscreen'" :src="fullScreen ? 'images/minimize-2.png' : 'images/maximize.png'" :large="true" @click="toggleFullScreen"/>
        </div>

        <div class="divider"></div>

        <div class="horizontal-flex">
            <div class="breadcrumb-item horizontal-flex flex-center" v-for="(b, i) in breadcrumbs" :key="i">
                <template v-if="i > 0">
                    <img src="images/right-arrow.png"/>
                    <div class="breadcrumb-comp" @click="$store.dispatch('item/setActiveItem', b)">{{ b.name }}</div>
                </template>
                <div v-else class="breadcrumb-comp">{{ b.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuItemIcon from "../../components/MenuItemIcon";
export default {
    name: "MenuBar",
    components: {MenuItemIcon},

    methods: {
        undo() {
            this.$store.dispatch('item/undo')
        },

        redo() {
            this.$store.dispatch('item/redo')
        },

        save() {
            this.$store.dispatch('item/save')
        },
    },

    computed: {
        breadcrumbs() {
            if (!this.activeItem)
                return [ { name: "My Component" } ]

            const ar = []
            let p = this.activeItem

            while (p) {
                ar.push(p)
                p = p.parent
            }

            ar.push({ name: "My Component" })

            return ar.reverse()
        },

        canSave() {
            return true
        },

        canUndo() {
            return this.$store.getters['item/canUndo']
        },

        canRedo() {
            return this.$store.getters['item/canRedo']
        },

        canCopy() {
            return !!this.$store.getters['item/activeItem']
        },

        canPaste() {
            return this.$store.getters['item/clipboardItems'].length > 0
        },
    }
}
</script>

<style scoped lang="scss">

.root {
    background: var(--dark-background);
    padding: 5px 10px;
    border: 1px solid var(--border);
    z-index: 40;
    font-size: 13px;
}

.divider {
    height: 1px;
    background: var(--border);
    margin: 2px -10px;
}

.vertical-divider {
    width: 1px;
    background: var(--border);
    margin: -3px 5px;
}

.breadcrumb-item {
    color: var(--text-medium);
    font-size: 12px;

    .breadcrumb-comp {
        cursor: pointer;
        transition: background-color 0.1s;
        padding: 3px;

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        &:active {
            background: rgba(255, 255, 255, 0.15);
        }
    }

    img {
        width: 10px;
        height: 12px;
        margin: 0 5px;
        filter: brightness(50%);
    }
}

</style>