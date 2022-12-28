import {Module} from "vuex";
import {RootState} from "@/store/RootState";
import {ComponentState} from "@/store/modules/component/types";
import ComponentTree from "@/data/ComponentTree";
import ComponentApi from "@/api/ComponentApi";

const state: ComponentState = {
    tree: new ComponentTree(0, "Root", "Root")
}

const component: Module<ComponentState, RootState> = {
    namespaced: true,
    state,

    getters: {
        tree(state): ComponentTree {
            return state.tree
        },
    },

    actions: {
        fetch({state, commit}) {
            ComponentApi.getAllComponents()
                .then(r => {
                    commit('setTree', r)
                })
        },
    },

    mutations: {
        setTree (state, value) {
            state.tree = ComponentTree.fromData(value)
        },
    },
}

export default component