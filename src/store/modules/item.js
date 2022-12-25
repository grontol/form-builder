import PrefManager from "../../data/prefManager";
import {createComponentByName} from "../../utils/componentUtil";
import Vue from "vue";
import ItemData from "../../data/itemData";
import TreeData from "../../data/treeData";

const maxHistory = 10
const items = [
    {
        name: 'Form',
        compName: 'Form',
        comp: 'fb-form',
        children: [
            {
                name: 'Input',
                compName: 'Input',
                comp: 'fb-input',
                props: {
                    id: 'id_visit',
                    value: '100'
                }
            },
            {
                name: 'Panel',
                compName: 'Panel',
                comp: 'fb-panel',
                children: [
                    {
                        name: 'Panel Title',
                        compName: 'Panel Title',
                        comp: 'fb-panel-title',
                        props: {
                            title: 'DATA DURANTE'
                        }
                    },
                    {
                        name: 'Panel Body',
                        compName: 'Panel Body',
                        comp: 'fb-panel-body',
                        children: [
                            {
                                name: 'Row',
                                compName: 'Row',
                                comp: 'fb-row',
                                children: [
                                    {
                                        name: 'Col',
                                        compName: 'Col',
                                        comp: 'fb-col',
                                        props: {
                                            col: 'md-12'
                                        },
                                        children: [
                                            {
                                                name: 'Col',
                                                compName: 'Col',
                                                comp: 'fb-col',
                                                props: {
                                                    col: 'md-6'
                                                },
                                                children: [
                                                    {
                                                        name: 'Form Group',
                                                        compName: 'Form Group',
                                                        comp: 'fb-form-group',
                                                        children: [

                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Custom Comp',
                        compName: 'Custom Comp',
                        comp: 'fb-panel-body',
                        isComp: true,
                    }
                ]
            }
        ]
    }
]

let curItemIndex = 1

const makeReactive = (item) => {
    const rItem = {}

    for (const prop in item) {
        Vue.set(rItem, prop, item[prop])
    }

    return rItem
}

const assignIds = (items, parent) => {
    for (const item of items) {
        assignId(item, parent)
    }

    return items
}

const assignId = (item, parent) => {
    // if (!item.index) {
        item.id = createId(curItemIndex)
        item.index = curItemIndex++
    // }

    item.level = parent ? parent.level + 1 : 1

    if (item.expanded === null || item.expanded === undefined)
        item.expanded = false

    item.parent = () => parent
    item.remove = () => {
        parent.children.splice(parent.children.findIndex(x => x.id === item.id), 1)
    }

    if (item.children)
        assignIds(item.children, item)
    else
        item.children = []

    return makeReactive(item)
}

const createId = (index) => {
    return "comp-" + index
}

const state = {
    stateIndex: 0,

    history: [],
    historyIndex: maxHistory,

    tree: PrefManager.getAppState(items).map(x => new ItemData(x)),

    activeItem: null,
    hoveredItem: null,
    draggedItem: null,

    selectedItems: [],
    clipboardItems: [],

    treeComps: [],
    viewComps: [],

    isCtrl: false,
    isShift: false,
}

// getters
const getters = {
    stateIndex: (state, getters, rootState) => {
        return state.stateIndex
    },

    tree: (state, getters, rootState) => {
        return state.tree
    },

    activeItem: (state, getters, rootState) => {
        return state.activeItem
    },

    selectedItems: (state, getters, rootState) => {
        return state.selectedItems
    },

    clipboardItems: (state, getters, rootState) => {
        return state.clipboardItems
    },

    hoveredItem: (state, getters, rootState) => {
        return state.hoveredItem
    },

    draggedItem: (state, getters, rootState) => {
        return state.draggedItem
    },

    treeComp: (state, getters, rootState) => (item) => {
        return state.treeComps.find(x => x.id === item.id).comp
    },

    activeTreeComp: (state, getters, rootState) => {
        return state.activeItem ? state.treeComps.find(x => x.id === state.activeItem.id).comp : null
    },

    isCtrl: (state, getters, rootState) => {
        return state.isCtrl
    },

    isShift: (state, getters, rootState) => {
        return state.isShift
    },

    canUndo: (state, getters, rootState) => {
        return state.history.length > 0 && state.historyIndex >= state.history.length
    },

    canRedo: (state, getters, rootState) => {
        return state.historyIndex < state.history.length - 1
    },
}

// actions
const actions = {
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
}

// mutations
const mutations = {
    addItem (state, value) {
        if (!state.activeItem)
            return

        if (!state.activeItem.children)
            state.activeItem.children = []

        const comp = assignId(createComponentByName(value), state.activeItem)

        Vue.set(state.activeItem.children, state.activeItem.children.length, comp)

        state.stateIndex++
    },

    deleteSelectedItems (state, value) {
        state.hoveredItem = null
        state.activeItem = null

        for (const item of state.selectedItems) {
            state.treeComps.splice(state.treeComps.findIndex(x => x.id === item.id), 1)
            state.viewComps.splice(state.viewComps.findIndex(x => x.id === item.id), 1)

            item.remove()
        }

        state.selectedItems = []

        state.stateIndex++
    },

    setActiveItem (state, item) {
        if (item) {
            if (state.isCtrl) {
                if (!state.selectedItems.includes(item))
                    state.selectedItems.push(item)
            }
            else if (state.isShift) {
                let startIndex = state.activeItem.index
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
            else
                state.selectedItems = [item]
        }
        else {
            state.selectedItems = []
        }

        state.activeItem = item
    },

    setActiveItemLeaveOther (state, item) {
        state.activeItem = item

        if (item) {
            if (!state.selectedItems.includes(item))
                state.selectedItems.push(item)
        }
    },

    setHoveredItem (state, item) {
        state.hoveredItem = item
    },

    setDraggedItem (state, item) {
        state.draggedItem = item
    },

    dropItem (state, { toItem, dropInto }) {
        const dropItem = state.draggedItem

        // Remove hover
        state.hoveredItem = null

        let dropParent = dropItem.parent
        let toParent = toItem.parent

        if (!dropParent)
            dropParent = state.tree

        if (!toParent)
            toParent = state.tree

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
        const items = state.selectedItems

        if (!items.length)
            return

        for (const item of items) {
            let parent = item.parent

            if (!parent)
                parent = state.tree

            parent.children.push(item)
        }

        state.stateIndex++
    },

    duplicateItemsFromClipboard (state) {
        const items = state.clipboardItems

        if (!items.length)
            return

        for (const item of items) {
            let parent = item.parent

            if (!parent)
                parent = state.tree

            parent.children.push(item)
        }

        state.stateIndex++
    },

    addSelectedItem (state, value) {
        state.selectedItems.push(value)
    },

    addClipboardItems (state, value) {
        state.clipboardItems = [...state.selectedItems]
    },

    setItemName (state, value) {
        state.activeItem.name = value
    },

    saveState (state, value) {
        PrefManager.setAppState(state.tree)
    },

    addHistory (state, value) {
        state.history.push(JSON.parse(JSON.stringify(state.tree)))

        if (state.history.length > maxHistory)
            state.history.shift()

        state.historyIndex = state.history.length
    },

    rename (state, value) {
        state.activeItem.name = value
    },

    setPropValue (state, { propName, value }) {
        if (!state.activeItem.props) {
            Vue.set(state.activeItem, 'props', {})
        }

        state.activeItem.props[propName] = value
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
        state.tree = assignIds(JSON.parse(JSON.stringify(state.tree)), null)
    },

    isCtrl (state, value) {
        state.isCtrl = value
    },

    isShift (state, value) {
        state.isShift = value
    },

    undo (state, value) {
        if (state.historyIndex === state.history.length) {
            state.history.push(JSON.parse(JSON.stringify(state.tree)))

            if (state.history.length > maxHistory)
                state.history.shift()
        }

        if (state.historyIndex > 0)
            state.tree = assignIds(state.history[--state.historyIndex], null)

        if (state.activeItem)
            state.activeItem = state.tree.findRecursive(x => x.id === state.activeItem.id)
    },

    redo (state, value) {
        if (state.historyIndex < state.history.length - 1)
            state.tree = assignIds(state.history[++state.historyIndex], null)

        if (state.activeItem)
            state.activeItem = state.tree.findRecursive(x => x.id === state.activeItem.id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}