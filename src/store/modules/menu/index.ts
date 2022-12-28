import {Module} from "vuex";
import {MenuState} from "@/store/modules/menu/types";
import {RootState} from "@/store/RootState";

const state: MenuState = {
    showContextMenu: false,
    contextMenuTarget: null,
    contextMenuOptions: [],
    contextMenuOnClick: null,

    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
    alertOnOk: null,
}

const menu: Module<MenuState, RootState> = {
    namespaced: true,
    state,

    getters: {
        showContextMenu(state): boolean {
            return state.showContextMenu
        },

        contextMenuTarget(state): any {
            return state.contextMenuTarget
        },

        contextMenuOptions(state): any[] {
            return state.contextMenuOptions
        },

        contextMenuOnClick(state): ((sel: any) => void) | null {
            return state.contextMenuOnClick
        },

        showAlert(state): boolean {
            return state.showAlert
        },

        alertTitle(state): string {
            return state.alertTitle
        },

        alertMessage(state): string {
            return state.alertMessage
        },

        alertType(state): string {
            return state.alertType
        },

        alertOnOk(state): (() => void) | null {
            return state.alertOnOk
        },
    },

    actions: {
        showMenu({state, commit}, value: { contextMenuTarget: any, contextMenuOptions: MenuOption[], contextMenuOnClick: (sel: MenuOption) => void }) {
            commit('showMenu', value)
        },

        hideMenu({state, commit}) {
            commit('hideMenu')
        },

        showAlert({state, commit}, value: { title: string, message: string, type: string, onOk: () => void }) {
            commit('showAlert', value)
        },

        hideAlert({state, commit}) {
            commit('hideAlert')
        },
    },

    mutations: {
        showMenu (state, value: { contextMenuTarget: any, contextMenuOptions: MenuOption[], contextMenuOnClick: (sel: MenuOption) => void }) {
            state.showContextMenu = true
            state.contextMenuTarget = value.contextMenuTarget
            state.contextMenuOptions = value.contextMenuOptions
            state.contextMenuOnClick = value.contextMenuOnClick
        },

        hideMenu (state) {
            state.showContextMenu = false
            state.contextMenuOptions = []
            state.contextMenuOnClick = null
        },

        showAlert (state, value: { title: string, message: string, type: string, onOk: () => void }) {
            state.showAlert = true
            state.alertTitle = value.title
            state.alertMessage = value.message
            state.alertType = value.type
            state.alertOnOk = value.onOk
        },

        hideAlert (state) {
            state.showAlert = false
            state.alertTitle = ""
            state.alertMessage = ""
            state.alertType = ""
            state.alertOnOk = null
        }
    },
}

export default menu