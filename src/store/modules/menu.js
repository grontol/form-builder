const state = {
    show: false,
    target: null,
    options: [],
    onClick: null,
}

// getters
const getters = {
    show: (state, getters, rootState) => {
        return state.show
    },

    target: (state, getters, rootState) => {
        return state.target
    },

    options: (state, getters, rootState) => {
        return state.options
    },

    onClick: (state, getters, rootState) => {
        return state.onClick
    },
}

// actions
const actions = {
    showMenu({state, commit}, value) {
        commit('showMenu', value)
    },

    hideMenu({state, commit}) {
        commit('hideMenu')
    },
}

// mutations
const mutations = {
    showMenu (state, value) {
        state.show = true
        state.target = value.target
        state.options = value.options
        state.onClick = value.onClick
    },

    hideMenu (state) {
        state.show = false
        state.options = []
        state.onClick = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}