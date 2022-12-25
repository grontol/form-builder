const state = {
    showHierarchy: true,
    showProperties: true,
    fullScreen: false,
}

// getters
const getters = {
    showHierarchy: (state, getters, rootState) => {
        return state.showHierarchy
    },

    showProperties: (state, getters, rootState) => {
        return state.showProperties
    },

    fullScreen: (state, getters, rootState) => {
        return state.fullScreen
    },
}

// actions
const actions = {
    showHierarchy({state, commit}, value) {
        commit('showHierarchy', value)
    },

    toggleHierarchy({state, commit}) {
        commit('toggleHierarchy')
    },

    showProperties({state, commit}, value) {
        commit('showProperties', value)
    },

    toggleProperties({state, commit}) {
        commit('toggleProperties')
    },

    hideMenu({state, commit}) {
        commit('hideMenu')
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
    },

    toggleProperties (state, value) {
        state.showProperties = !state.showProperties
    },

    setFullScreen (state, value) {
        state.fullScreen = value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}