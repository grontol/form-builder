import {Module} from "vuex";
import {RootState} from "@/store/RootState";
import {ItemState} from "@/store/modules/item/types";
import ItemData from "@/data/itemData";
import PrefManager from "@/data/prefManager";
import Vue from "vue";
import {createComponentByName} from "@/utils/componentUtil";
import FileData from "@/data/FileData";

const uFile = new FileData("My Component 2", [])
uFile.unsaved = true

const defFiles = [
    new FileData("My Component", PrefManager.getAppState([])),
    uFile
]

const state: ItemState = {
    stateIndex: 0,

    files: defFiles,
    activeFile: defFiles[0],

    treeComps: [],
    viewComps: [],

    isCtrl: false,
    isShift: false,
}

const menu: Module<ItemState, RootState> = {
    namespaced: true,
    state,

    getters: {
        stateIndex: (state, getters, rootState) => {
            return state.stateIndex
        },

        files: (state, getters, rootState): FileData[] => {
            return state.files
        },

        activeFile: (state, getters, rootState): FileData | null => {
            return state.activeFile
        },

        tree: (state, getters, rootState) => {
            return state.activeFile?.history.current
        },

        activeItem: (state, getters, rootState) => {
            return state.activeFile?.activeItem
        },

        selectedItems: (state, getters, rootState) => {
            return state.activeFile?.selectedItems
        },

        clipboardItems: (state, getters, rootState) => {
            return state.activeFile?.clipboardItems
        },

        hoveredItem: (state, getters, rootState) => {
            return state.activeFile?.hoveredItem
        },

        draggedItem: (state, getters, rootState) => {
            return state.activeFile?.draggedItem
        },

        treeComp: (state, getters, rootState) => (item: ItemData) => {
            return state.treeComps.find(x => x.id === item.id).comp
        },

        activeTreeComp: (state, getters, rootState) => {
            throw "Tree comp not implemented"
            // return state.activeItem ? state.treeComps.find(x => x.id === state.activeItem?.id)?.comp : null
        },

        isCtrl: (state, getters, rootState) => {
            return state.isCtrl
        },

        isShift: (state, getters, rootState) => {
            return state.isShift
        },

        canUndo: (state, getters, rootState) => {
            return state.activeFile?.history.canUndo ?? false
        },

        canRedo: (state, getters, rootState) => {
            return state.activeFile?.history.canRedo ?? false
        },
    },

    actions: {
        setActiveFile ({ state, commit }, value) {
            commit('setActiveFile', value)
        },

        closeFile ({ state, commit }, value) {
            commit('closeFile', value)
        },

        addFile ({ state, commit }, value) {
            commit('addFile', value)
        },

        addItem({state, commit}, value) {
            commit('addHistory', value)
            commit('addItem', value)
            commit('saveState', value)
        },

        deleteSelectedItems({state, commit}, value) {
            commit('addHistory', value)
            commit('deleteSelectedItems', value)
            commit('recreateTree', value)
            commit('saveState', value)
        },

        setActiveItem ({ state, commit }, value) {
            commit('setActiveItem', value)
        },

        setActiveItemLeaveOther ({ state, commit }, value) {
            commit('setActiveItemLeaveOther', value)
        },

        setHoveredItem ({ state, commit }, value) {
            commit('setHoveredItem', value)
        },

        setDraggedItem ({ state, commit }, value) {
            commit('setDraggedItem', value)
        },

        dropItem ({ state, commit }, value) {
            commit('addHistory', value)
            commit('dropItem', value)
            commit('recreateTree', value)
            commit('saveState', value)
        },

        duplicateItems ({ state, commit }, value) {
            commit('addHistory', value)
            commit('duplicateItems', value)
            commit('recreateTree', value)
            commit('saveState', value)
        },

        duplicateItemsFromClipboard ({ state, commit }, value) {
            commit('addHistory', value)
            commit('duplicateItemsFromClipboard', value)
            commit('recreateTree', value)
            commit('saveState', value)
        },

        addSelectedItem ({ state, commit }, value) {
            commit('addSelectedItem', value)
        },

        addClipboardItems ({ state, commit }, value) {
            commit('addClipboardItems', value)
        },

        rename ({ state, commit }, value) {
            commit('addHistory', value)
            commit('rename', value)
            commit('saveState', value)
        },

        setItemName ({ state, commit }, value) {
            commit('setItemName', value)
        },

        setPropValue ({ state, commit }, value) {
            commit('addHistory', value)
            commit('setPropValue', value)
            commit('saveState', value)
        },

        setItemExpanded ({ state, commit }, value) {
            commit('setItemExpanded', value)
            commit('saveState', value)
        },

        setTreeComp ({ state, commit }, value) {
            commit('setTreeComp', value)
        },

        setViewComp ({ state, commit }, value) {
            commit('setViewComp', value)
        },

        isCtrl ({ state, commit }, value) {
            commit('isCtrl', value)
        },

        isShift ({ state, commit }, value) {
            commit('isShift', value)
        },

        undo ({ state, commit }, value) {
            commit('undo', value)
        },

        redo ({ state, commit }, value) {
            commit('redo', value)
        },

        save ({ state, commit }) {
            commit('save')
        },
    },

    mutations: {
        setActiveFile (state, value) {
            state.activeFile = value
        },

        closeFile (state, value) {
            const index = state.files.findIndex(x => x === value)

            if (index >= 0)
                state.files.splice(index, 1)

            if (state.activeFile === value) {
                if (index < state.files.length)
                    state.activeFile = state.files[index]
                else if (state.files.length)
                    state.activeFile = state.files[state.files.length - 1]
                else
                    state.activeFile = null
            }
        },

        addFile (state, value) {
            const file = new FileData("My Component")
            file.unsaved = true

            state.files.push(file)
            state.activeFile = file
        },

        addItem (state, value) {
            if (!state.activeFile?.activeItem)
                return

            const comp = new ItemData(createComponentByName(value), state.activeFile.activeItem)
            state.activeFile.activeItem.addChildrenItem(comp)

            state.stateIndex++
        },

        deleteSelectedItems (state, value) {
            if (!state.activeFile)
                return

            state.activeFile.hoveredItem = null
            state.activeFile.activeItem = null

            for (const item of state.activeFile.selectedItems) {
                state.treeComps.splice(state.treeComps.findIndex(x => x.id === item.id), 1)
                state.viewComps.splice(state.viewComps.findIndex(x => x.id === item.id), 1)

                item.removeSelf()
            }

            state.activeFile.clearSelectedItems()

            state.stateIndex++
        },

        setActiveItem (state, item: ItemData) {
            if (!state.activeFile)
                return

            if (item) {
                if (state.isCtrl) {
                    if (!state.activeFile.selectedItems.includes(item))
                        state.activeFile.selectedItems.push(item)
                }
                else if (state.isShift) {
                    let startIndex = state.activeFile.activeItem?.index ?? 0
                    let endIndex = item.index

                    if (startIndex > endIndex) {
                        const temp = startIndex
                        startIndex = endIndex
                        endIndex = temp
                    }

                    const newSels = []

                    for (let a = startIndex; a <= endIndex; a++) {
                        // const id = createId(a)
                        //
                        // if (b) {
                        //     newSels.push(b.item)
                        // }
                    }

                    console.error("Cannot select shift")

                    // state.selectedItems = newSels
                }
                else {
                    state.activeFile.clearSelectedItems()
                    state.activeFile.selectedItems.push(item)
                }
            }
            else {
                state.activeFile.clearSelectedItems()
            }

            let i: ItemData | null = item

            while (i) {
                i.expanded = true
                i = i.parent
            }

            state.activeFile.activeItem = item
        },

        setActiveItemLeaveOther (state, item) {
            if (!state.activeFile)
                return

            state.activeFile.activeItem = item

            if (item) {
                if (!state.activeFile.selectedItems.includes(item))
                    state.activeFile.selectedItems.push(item)
            }
        },

        setHoveredItem (state, item) {
            if (!state.activeFile)
                return

            state.activeFile.hoveredItem = item
        },

        setDraggedItem (state, item) {
            if (!state.activeFile)
                return

            state.activeFile.draggedItem = item
        },

        dropItem (state, { toItem, dropInto }: { toItem: ItemData, dropInto: string }) {
            if (!state.activeFile)
                return

            const dropItem = state.activeFile.draggedItem

            if (!dropItem)
                return

            // Remove hover
            state.activeFile.hoveredItem = null

            let dropParent: ItemData | null | undefined = dropItem.parent
            let toParent = toItem.parent

            if (!dropParent)
                dropParent = state.activeFile.tree

            if (!toParent)
                toParent = state.activeFile.tree

            dropParent.children.removeByItem(x => x.id === dropItem.id)

            if (dropInto === 'into')
                toItem.children.push(dropItem)
            else if (dropInto === 'top')
                toParent.children.splice(toParent.children.findIndex(x => x.id === toItem.id), 0, dropItem)
            else if (dropInto === 'bottom')
                toParent.children.splice(toParent.children.findIndex(x => x.id === toItem.id) + 1, 0, dropItem)

            state.stateIndex++
        },

        duplicateItems (state) {
            if (!state.activeFile)
                return

            const items = state.activeFile.selectedItems

            if (!items.length)
                return

            for (const item of items) {
                let parent: ItemData | null = item.parent

                if (!parent)
                    parent = state.activeFile.tree

                parent.children.push(item)
            }

            state.stateIndex++
        },

        duplicateItemsFromClipboard (state) {
            if (!state.activeFile)
                return

            const items = state.activeFile.clipboardItems

            if (!items.length)
                return

            for (const item of items) {
                let parent = item.parent

                if (!parent)
                    parent = state.activeFile.tree

                parent.children.push(item)
            }

            state.stateIndex++
        },

        addSelectedItem (state, value) {
            if (!state.activeFile)
                return

            state.activeFile.selectedItems.push(value)
        },

        addClipboardItems (state, value) {
            if (!state.activeFile)
                return

            state.activeFile.clipboardItems = [...state.activeFile.selectedItems]
        },

        setItemName (state, value) {
            if (!state.activeFile)
                return

            if (state.activeFile.activeItem)
                state.activeFile.activeItem.name = value
        },

        saveState (state, value) {
            if (!state.activeFile)
                return

            PrefManager.setAppState(state.activeFile.tree)
        },

        addHistory (state, value) {
            if (!state.activeFile)
                return

            state.activeFile.history.add(state.activeFile.tree.clone())
        },

        rename (state, value) {
            if (!state.activeFile)
                return

            if (!state.activeFile.activeItem)
                return

            state.activeFile.activeItem.name = value
        },

        setPropValue (state, { propName, value }) {
            if (!state.activeFile)
                return

            if (!state.activeFile.activeItem)
                return

            if (!state.activeFile.activeItem.props) {
                Vue.set(state.activeFile.activeItem, 'props', {})
            }

            state.activeFile.activeItem.props[propName] = value
        },

        setItemExpanded (state, { item, value }) {
            item.expanded = value
        },

        setTreeComp (state, { item, comp }) {
            state.treeComps.push({
                id: item.id,
                comp: comp
            })
        },

        setViewComp (state, { item, comp }) {
            state.viewComps.push({
                id: item.id,
                comp: comp
            })
        },

        recreateTree (state) {
            console.warn("Recreate tree not implemented")
        },

        isCtrl (state, value) {
            state.isCtrl = value
        },

        isShift (state, value) {
            state.isShift = value
        },

        undo (state, value) {
            state.activeFile?.undo()
        },

        redo (state, value) {
            state.activeFile?.redo()
        },

        save (state) {
            state.activeFile?.save()
        },
    },
}

export default menu