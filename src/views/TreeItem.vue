<template>
    <div class="root-item vertical-flex" @contextmenu.prevent.stop="showMenu" :key="item.id">
        <div class="horizontal-flex">
            <div v-if="hasChildren" class="arrow" @click.stop="toggleExpand">{{ item.expanded ? '▼' : '►' }}</div>
            <div v-else class="arrow"></div>

            <div class="horizontal-flex droppable"
                :class="[dropInto, { 'selected': isSelected && !canEditName }]"
                ref="droppable"
                draggable="true"
                @dragstart="onDragStart"
                @dragend.prevent="onDragEnd"
                @dragenter.prevent="onDragEnter"
                @dragleave="onDragLeave"
                @dragover.prevent="onDragOver"
                @drop.prevent="onDrop"
            >
                <img class="item-icon" src="images/component.png" v-if="isComp" alt="">
                <img class="item-icon" src="images/container.png" v-else-if="hasChildren" alt="">
                <img class="item-icon" src="images/item.png" v-else alt="">

                <div class="name" @click.stop="onClick"
                     :contenteditable="canEditName" spellcheck="false"
                     ref="name"
                     @input="nameChange"
                     @keydown="nameKeyDown"
                     v-click-outside="onClickOutside"
                     @mouseenter="$store.dispatch('item/setHoveredItem', item)"
                     @mouseleave="$store.dispatch('item/setHoveredItem', null)"
                >{{ item.name }}</div>
            </div>
        </div>
        <div style="margin-left: 15px;" v-show="item.expanded">
            <TreeItem :item="item" v-for="item in children"></TreeItem>
        </div>
    </div>
</template>

<script>
import {builtInComponents} from "../utils/componentDefs";

const menuOptions = [
    {
        text: 'Rename',
        value: 'rename',
        shortcut: 'F2',
    },
    {
        text: 'Copy',
        value: 'copy',
        shortcut: 'Ctrl+C',
    },
    {
        text: 'Paste',
        value: 'paste',
        shortcut: 'Ctrl+V',
    },
    {
        text: 'Duplicate',
        value: 'duplicate',
        shortcut: 'Ctrl+D',
    },
    {
        text: 'Delete',
        value: 'delete',
        shortcut: 'Del',
    },
    {
        value: '__divider__',
    },
    {
        text: 'Add Item',
        value: 'add_item',
        children: [
            ...builtInComponents.map(x => ({
                text: x.label,
                value: x.comp,
            })),
            {
                text: 'Components',
                value: 'components',
                children: [
                    {
                        text: 'My Form',
                        value: 'my_form',
                    }
                ]
            },
        ]
    },
]

export default {
    name: "TreeItem",
    props: {
        item: Object
    },

    data() {
        return {
            canEditName: false,
            doubleClickTimeoutId: null,

            tempName: '',
            disableClickOutsideTemp: false,

            dropInto: 'none',
            dropCount: 0,
        }
    },

    mounted() {
        this.$store.dispatch('item/setTreeComp', {
            item: this.item,
            comp: {
                prepareRename: () => {
                    this.prepareRename()
                }
            }
        })
    },

    beforeDestroy() {

    },

    methods: {
        toggleExpand() {
            this.$store.dispatch('item/setItemExpanded', {
                item: this.item,
                value: !this.item.expanded
            })
        },

        onClick(e) {
            this.select()

            if(!this.doubleClickTimeoutId) {
                this.doubleClickTimeoutId = setTimeout(() => {
                    clearTimeout(this.doubleClickTimeoutId)
                    this.doubleClickTimeoutId = null
                }, 200)
            }
            else {
                clearTimeout(this.doubleClickTimeoutId)
                this.doubleClickTimeoutId = null

                this.select()
                this.prepareRename()
            }
        },

        onClickOutside() {
            if (!this.canEditName || this.disableClickOutsideTemp) {
                this.disableClickOutsideTemp = false
                return
            }

            this.doRename()
        },

        onDragStart(e) {
            e.dataTransfer.dropEffect = "move"
            e.dataTransfer.effectAllowed = "move"

            this.$store.dispatch('item/setDraggedItem', this.item)
        },

        onDragEnd(e) {
            this.$store.dispatch('item/setDraggedItem', null)
        },

        onDragEnter(e) {
            this.dropCount++

            if (this.draggedItem.id === this.item.id)
                e.dataTransfer.effectAllowed = 'none'
            else
                e.dataTransfer.effectAllowed = 'move'
        },

        onDragLeave(e) {
            this.dropCount--

            if (this.dropCount === 0)
                this.dropInto = 'none'
        },

        onDragOver(e) {
            if (this.draggedItem.id === this.item.id)
                return

            const y = e.offsetY
            const r = this.$refs.droppable.getBoundingClientRect()
            const h = r.height

            if (y < 5)
                this.dropInto = 'top'
            else if (y > h - 5)
                this.dropInto = 'bottom'
            else if (this.draggedItem.parent().id === this.item.id)
                this.dropInto = 'none'
            else
                this.dropInto = 'into'
        },

        onDrop(e) {
            if (this.draggedItem.id === this.item.id ||
                (this.draggedItem.parent().id === this.item.id && this.dropInto === 'into'))
                return

            this.$store.dispatch('item/dropItem', {
                toItem: this.item,
                dropInto: this.dropInto,
            })

            this.dropCount = 0
            this.dropInto = 'none'
        },

        select() {
            this.$store.dispatch('item/setActiveItem', this.item)
        },

        prepareRename() {
            const e = this.$refs.name
            this.canEditName = true

            this.$nextTick(() => {
                // Select all texts
                const range = document.createRange()
                range.setStart(e.firstChild, 0)
                range.setEnd(e.firstChild, e.firstChild.length)
                const sel = window.getSelection()
                sel.removeAllRanges()
                sel.addRange(range)

                e.focus()
            })
        },

        doRename() {
            this.canEditName = false

            if (!this.tempName) {
                this.$refs.name.innerHTML = this.item.name
            }
            else {
                this.$store.dispatch('item/rename', this.tempName)
            }
        },

        showMenu(e) {
            if (this.selectedItems.length > 1)
                this.$store.dispatch('item/setActiveItemLeaveOther', this.item)
            else
                this.select()

            const pasteMenu = menuOptions.findRecursive(x => x.value === 'paste')
            pasteMenu.disabled = this.$store.getters['item/clipboardItems'].length === 0

            this.$menu.show(e, menuOptions, (sel) => {
                this.disableClickOutsideTemp = true

                if (sel[0] === 'rename') {
                    this.prepareRename()
                }
                else if (sel[0] === 'copy') {
                    this.$store.dispatch('item/addClipboardItems')
                }
                else if (sel[0] === 'paste') {
                    this.$store.dispatch('item/duplicateItemsFromClipboard')
                }
                else if (sel[0] === 'delete') {
                    this.deleteSelectedItems()
                }
                else if (sel[0] === 'add_item') {
                    if (sel.length === 2) {
                        this.addItem(sel[1])
                    }
                }
            })
        },

        nameKeyDown(e) {
            if (e.key === 'Enter') {
                this.doRename()
            }
        },

        nameChange(e) {
            this.tempName = e.target.innerHTML
        }
    },

    computed: {
        children() {
            return this.item.children ?? []
        },

        hasChildren() {
            return this.children.length > 0
        },

        isComp() {
            return this.item.isComp
        },

        selectedItems() {
            return this.$store.getters['item/selectedItems']
        },

        isSelected() {
            return !!this.selectedItems.find(x => x.id === this.item.id)
        },

        isHovered() {
            return this.$store.getters['item/hoveredItem'] === this.item
        },
    },

    watch: {
        isSelected(val) {

        }
    },
}
</script>

<style scoped lang="scss">

.root-item {
    z-index: 30;
    outline: none;
    border: none;
}

.droppable {
    position: relative;
    align-self: start;
    min-width: 100px;
    padding-right: 10px;

    &.selected {
        background: var(--blue-light);
    }

    &.into:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: var(--blue);
    }

    &.top:before {
        content: '';
        position: absolute;
        top: -1px;
        right: 0;
        height: 2px;
        left: 0;
        z-index: -1;
        background: var(--blue);
    }

    &.bottom:before {
        content: '';
        position: absolute;
        bottom: -1px;
        right: 0;
        height: 2px;
        left: 0;
        z-index: -1;
        background: var(--blue);
    }
}

.arrow {
    width: 16px;
    font-size: 11px;
    transition: color 0.05s;
    cursor: pointer;

    &:hover {
        color: #a7d1f3;
    }
}

.item-icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    transform: translateY(1px);
}

.name {
    transition: color 0.05s;
    cursor: pointer;
    white-space: nowrap;
    outline: none;

    &:hover {
        color: #a7d1f3;
    }

    &[contenteditable="true"] {
        border: 1px solid var(--blue-very-light);
        color: var(--blue-very-light);
        padding: 0 2px;
    }
}

</style>