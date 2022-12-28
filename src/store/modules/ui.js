import PrefManager from "@/data/prefManager";

const state = PrefManager.getUiState({
    showHierarchy: true,
    showProperties: false,
    showCompPropsEditor: true,

    showForm: true,
    showCode: false,
    showStyle: false,

    fullScreen: false,
})

// getters
const getters = {
    showHierarchy: (state, getters, rootState) => {
        return state.showHierarchy
    },

    showProperties: (state, getters, rootState) => {
        return state.showProperties
    },

    showCompPropsEditor: (state, getters, rootState) => {
        return state.showCompPropsEditor
    },

    showForm: (state, getters, rootState) => {
        return state.showForm
    },

    showCode: (state, getters, rootState) => {
        return state.showCode
    },

    showStyle: (state, getters, rootState) => {
        return state.showStyle
    },

    fullScreen: (state, getters, rootState) => {
        return state.fullScreen
    },
}

// actions
const actions = {
    showHierarchy({state, commit}, value) {
        commit('showHierarchy', value)
        commit('saveUiState')
    },

    toggleHierarchy({state, commit}) {
        commit('toggleHierarchy')
        commit('saveUiState')
    },

    showProperties({state, commit}, value) {
        commit('showProperties', value)
        commit('saveUiState')
    },

    toggleProperties({state, commit}) {
        commit('toggleProperties')
        commit('saveUiState')
    },

    showCompPropsEditor({state, commit}, value) {
        commit('showCompPropsEditor', value)
        commit('saveUiState')
    },

    toggleCompPropsEditor({state, commit}) {
        commit('toggleCompPropsEditor')
        commit('saveUiState')
    },

    showForm({state, commit}, value) {
        commit('showForm', value)
        commit('saveUiState')
    },

    toggleForm({state, commit}) {
        commit('toggleForm')
        commit('saveUiState')
    },

    showCode({state, commit}, value) {
        commit('showCode', value)
        commit('saveUiState')
    },

    toggleCode({state, commit}) {
        commit('toggleCode')
        commit('saveUiState')
    },

    showStyle({state, commit}, value) {
        commit('showStyle', value)
        commit('saveUiState')
    },

    toggleStyle({state, commit}) {
        commit('toggleStyle')
        commit('saveUiState')
    },

    hideMenu({state, commit}) {
        commit('hideMenu')
        commit('saveUiState')
    },

    setFullScreen({state, commit}, value) {
        commit('setFullScreen', value)
    },
}

// mutations
const mutations = {
    showHierarchy (state, value) {
        state.showHierarchy = value
    },

    toggleHierarchy (state, value) {
        state.showHierarchy = !state.showHierarchy
    },

    showProperties (state, value) {
        state.showProperties = value

        if (state.showProperties)
            state.showCompPropsEditor = false
    },

    toggleProperties (state, value) {
        state.showProperties = !state.showProperties

        if (state.showProperties)
            state.showCompPropsEditor = false
    },

    showCompPropsEditor (state, value) {
        state.showCompPropsEditor = value

        if (state.showCompPropsEditor)
            state.showProperties = false
    },

    toggleCompPropsEditor (state, value) {
        state.showCompPropsEditor = !state.showCompPropsEditor

        if (state.showCompPropsEditor)
            state.showProperties = false
    },

    showForm (state, value) {
        state.showForm = value
    },

    toggleForm (state, value) {
        state.showForm = !state.showForm
    },

    showCode (state, value) {
        state.showCode = value
    },

    toggleCode (state, value) {
        state.showCode = !state.showCode
    },

    showStyle (state, value) {
        state.showStyle = value
    },

    toggleStyle (state, value) {
        state.showStyle = !state.showStyle
    },

    setFullScreen (state, value) {
        state.fullScreen = value
    },

    saveUiState (state) {
        PrefManager.setUiState(state)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}