import {Module} from "vuex";
import {MenuState} from "@/store/modules/menu/types";
import {RootState} from "@/store/RootState";

const state: MenuState = {
    show: false,
    target: null,
    options: [],
    onClick: null,
}

const menu: Module<MenuState, RootState> = {
    namespaced: true,
    state,

    getters: {
        show(state): boolean {
            return state.show
        },

        target(state): any {
            return state.target
        },

        options(state): any[] {
            return state.options
        },

        onClick(state): ((sel: any) => void) | null {
            return state.onClick
        },
    },

    actions: {
        showMenu({state, commit}, value: { target: any, options: MenuOption[], onClick: (sel: MenuOption) => void }) {
            commit('showMenu', value)
        },

        hideMenu({state, commit}) {
            commit('hideMenu')
        },
    },

    mutations: {
        showMenu (state, value: { target: any, options: MenuOption[], onClick: (sel: MenuOption) => void }) {
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
    },
}

export default menu